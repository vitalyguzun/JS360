import { getXFn, httpGet, intersects, isEmpty, getLoadEvents, getRotateEvents } from './utils';
import { Controls } from './js360Controls';
import { LOAD, PLAY, STOP } from './constants';
import Symbol from 'es6-symbol';
import './js360.scss';

const _updateImage = Symbol();
const _controls    = Symbol();
const _interval    = Symbol();
const _clientX     = Symbol();
const _images      = Symbol();
const _delta       = Symbol();
const _index       = Symbol();
const _step        = Symbol();
const _meta        = Symbol();


const getPreviewImg = ({ canvas, width, height, preview }) => {
    const context2D = canvas.getContext('2d');
    const img = document.createElement('img');

    img.src = preview;
    img.onload = () => context2D.drawImage(img, 0, 0, width, height);
}

const isRotateOnMousemoveFn = (context) => () => {
    const { rotateEvents } = context.props;
    const clickEvents = [ 'mousedown', 'touchstart' ];

    return !context[_meta].moving && intersects(rotateEvents, clickEvents);
}

const move = (context) => {
    const { props } = context;
    const isRotateOnMousemove = isRotateOnMousemoveFn(context);

    return (event) => {
        if (isRotateOnMousemove()) return;

        if (typeof props.onRotate === 'function') props.onRotate();
        context[_meta].moving = true;
        updateClientX(context)(event);
        context[_updateImage]();
    }
}

const moveEnd = (context) => {
    const { props } = context;
    const moveInstance = move(context);

    return (event) => {
        moveInstance(event);
        context[_meta].moving = false;
        updateDelta(context)(event);
        if (typeof props.onRotateEnd === 'function') props.onRotateEnd();
    }
}

const rotate = (context) => {
    const { props } = context;

    return (event) => {
        if (!context[_images].length) return;

        if (typeof props.onRotateStart === 'function') props.onRotateStart();
        updateDelta(context)(event);
        context[_meta].moving = true;
    }
};

const addListeners = (context) => {
    const { props: { container, loadEvents }, load } = context;
    const loadTarget = context[_controls].load || container;

    loadEvents.forEach((event) => loadTarget.addEventListener(event, load));
    container.addEventListener('mousemove', move(context));
    container.addEventListener('touchmove', move(context));
    container.addEventListener('mouseup', moveEnd(context));
    container.addEventListener('touchend', moveEnd(context));
}

const addLoader = ({ container }) => {
    const loader = document.createElement('div');

    loader.classList.add('loader');
    container.classList.add('is-pending');
    container.append(loader);
}

const removeLoader = ({ container, preloader }) => {
    if (preloader !== 'true' && preloader !== true) return;

    container.classList.remove('is-pending');
    container.querySelector('.loader').remove();
}

const CONTROL_TYPES = { LOAD, PLAY };
const initControls = (context) => {
    const { props: { controlLoad, controlPlay }, stop } = context;

    if (controlLoad) {
        context[_controls].load = document.createElement('div');
        context[_controls].load.classList.add('js360-load', 'js360-control');
        context[_controls].load.innerHTML = new Controls(CONTROL_TYPES[LOAD]).render();
    }

    if (controlPlay) {
        context[_controls].play = document.createElement('div');
        context[_controls].play.classList.add('js360-play', 'js360-control');
        context[_controls].play.innerHTML = new Controls(CONTROL_TYPES[PLAY]).render();
        context[_controls].play.addEventListener('click', stop);
    }
}

const showControls = (props, types) => {
    types.forEach((type) => {
        const control = props.container.querySelector(`.js360-${type}`);
        if (!control) return;

        control.classList.add('visible');
    });
}

const updatePlayButton = (context) => {
    if (!context[_controls].play) return;

    const state = context[_meta].stopped ? PLAY : STOP;
    context[_controls].play.innerHTML = new Controls(state).render();
}

const updateClientX = (context) => ({ type, changedTouches, clientX }) => {
    const getX = getXFn(context.props.container);
    context[_clientX] = ['touchmove', 'touchend'].includes(type) ? getX(changedTouches[0].clientX) : getX(clientX);
}

const updateDelta = (context) => ({ type, changedTouches, clientX }) => {
    if (!['mousedown', 'touchstart'].includes(type)) return;

    const getX = getXFn(context.props.container);
    context[_delta] = getX(clientX || changedTouches[0].clientX) - ((context[_index]() * context[_step]) / context.props.speed);
}

const getUpdateImageFn = (context) => {
    const { container, canvas } = context.props;
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 180;
    const context2D = canvas.getContext('2d');

    return () => {
        const base64 = context[_images][context[_index]() > 0 ? context[_index]() : (context[_images].length + context[_index]())];
        if (!base64) return;

        const img = document.createElement('img');
        img.onload = () => context2D.drawImage(img, 0, 0, width, height);
        img.src = base64;
    };
};

export class JS360Canvas {
    constructor({ elem, elem: { dataset }, ...props }) {
        this.props = {
            canvas:       document.createElement('canvas'),
            container:    elem,

            height:       dataset.height || props.height || elem.clientHeight || 180,
            width:        dataset.width || props.width || elem.clientWidth || 320,

            retinaUrl:    window.devicePixelRatio === 2 ? (dataset.retinaUrl || props.retinaUrl || '') : '',
            speed:        Math.floor((dataset.speed || props.speed || 1) * 100) / 100,
            loadEvents:   getLoadEvents(dataset.loadEvents, props.loadEvents),
            rotateEvents: getRotateEvents(dataset.rotateEvents, props.rotateEvents),

            autoPlay:     dataset.autoPlay || props.autoPlay,
            preloader:    dataset.preloader || props.preloader,
            baseUrl:      dataset.baseUrl || props.baseUrl,
            preview:      dataset.preview || props.preview,
            url:          dataset.url || props.url,
            controlLoad:  props.controlLoad || false,
            controlPlay:  props.controlPlay || false
        };

        this[_updateImage] = getUpdateImageFn(this);
        this[_interval] = null;
        this[_clientX] = 0;
        this[_delta] = null;
        this[_step] = null;
        this[_images] = [];
        this[_controls] = {};
        this[_meta] = {
            loaded: false,
            pending: false,
            moving: false,
            stopped: true
        };
        this[_index] = () => {
            let index = Math.round((this[_clientX] - this[_delta]) / (this[_step] / this.props.speed));

            if (index >= this[_images].length) {
                index = 0;
                this[_delta] = this[_clientX];
            }

            if (index <= -this[_images].length) {
                index += (this[_images].length);
                this[_delta] = this[_clientX];
            }

            return Number.isNaN(index) ? 0 : index;
        }

        this.init();
        this.render();
    }

    get isLoaded() { return this[_meta].loaded; };
    get isPending() { return this[_meta].pending; };
    get isMoving() { return this[_meta].moving; };
    get isStopped() { return this[_meta].stopped; };
    get isPlaying() { return !this[_meta].stopped; };

    init() {
        const { container, width, height, canvas } = this.props;

        canvas.setAttribute('width', `${width}px`);
        canvas.setAttribute('height', `${height}px`);
        container.style.position = 'relative';

        getPreviewImg(this.props);
        initControls(this);
        addListeners(this);
    }

    render() {
        const { container, canvas } = this.props;
        container.innerHTML = '';
        container.append(canvas);

        if (isEmpty(this[_controls])) return;

        const controlsContainer = document.createElement('div');
        for (let control in this[_controls]) {
            controlsContainer.append(this[_controls][control]);
        }

        controlsContainer.classList.add('js360-controls');
        container.append(controlsContainer);
    }

    stop = () => {
        if (this[_meta].stopped) return this.play();

        this[_meta].stopped = true;
        clearInterval(this[_interval]);
        this[_interval] = null;

        if (typeof this.props.onPlayEnd === 'function') this.props.onPlayEnd();
        updatePlayButton(this);
    }

    load = () => {
        const { autoPlay, baseUrl, preloader, retinaUrl, url, width, onLoad } = this.props;

        return new Promise((resolve) => {
            if (url && !this[_meta].loaded && !this[_meta].pending) {
                const path = [baseUrl, retinaUrl, url].filter(path => path).join('/');
                this[_meta].pending = true;

                if (preloader === 'true' || preloader === true) addLoader(this.props);

                httpGet(path).then((images) => {
                    removeLoader(this.props);
                    if (!images.length) return;

                    const { container, rotateEvents } = this.props;

                    this[_meta].loaded = true;
                    this[_meta].pending = false;

                    this[_step] = Math.floor((width / images.length) * 1000) / 1000;
                    this[_images] = images;
                    showControls(this.props, ['play']);

                    rotateEvents.forEach((event) => container.addEventListener(event, rotate(this)));
                    if (typeof onLoad === 'function') onLoad();
                    if (autoPlay === 'true' || autoPlay === true) this.play();
                    resolve();
                });
            } else resolve();
        });
    }

    play = (forced = false) => {
        this[_meta].stopped = forced;
        if (this[_controls].play) updatePlayButton(this);

        if (!this[_meta].stopped && typeof this.props.onPlayStart === 'function') this.props.onPlayStart();
        if (typeof this.props.onPlayStart === 'function') this.props.onPlayStart();

        clearInterval(this[_interval]);
        this[_interval] = setInterval(() => {
            if (this[_meta].moving || this[_meta].stopped) return;

            if (typeof this.props.onPlay === 'function') this.props.onPlay();
            this[_delta]--;
            this[_updateImage]();
        }, Math.floor(50 / this.props.speed));
    }
}
