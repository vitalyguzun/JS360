import { getXFn, httpGet, intersects, isEmpty } from './utils';
import { Controls } from './js360Controls';
import { LOAD, PLAY, STOP } from './constants';
import './js360.scss';

const LOAD_EVENTS = ['mousemove'];
const ROTATE_EVENTS = ['mousedown'];
const CONTROL_TYPES = {
    load: LOAD,
    play: PLAY
}

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
    const clickEvents = ['mousedown', 'touchstart'];

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
    if (!preloader) return;

    container.classList.remove('is-pending');
    container.querySelector('.loader').remove();
}

const initControls = (context) => {
    const { props: { autoPlay, controls }, toggle } = context;
    if (isEmpty(controls)) return;

    for (let control in controls) {
        const button = (control === 'play' && autoPlay) ? STOP: CONTROL_TYPES[control];

        if (button) {
            context[_controls][control] = document.createElement('div');
            context[_controls][control].classList.add(`js360-${control}`, 'js360-control');
            context[_controls][control].innerHTML = new Controls(button).render();

            if (control === 'play') {
                context[_controls][control].addEventListener('click', toggle);
            }
        }
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
    const state = context[_meta].stopped ? PLAY : STOP;
    context[_controls].play.innerHTML = new Controls(state).render();
}

const updateClientX = (context) => ({ type, changedTouches, clientX }) => {
    const getX = getXFn(context.props.container);
    context[_clientX] = (type === 'touchmove') ? getX(changedTouches[0].clientX) : getX(clientX);
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
    constructor({ elem, speed, retinaUrl, ...propsRest }) {
        const { loadEvents = '[]', rotateEvents = '[]', ...datasetRest } = elem.dataset;

        this.props = {
            canvas: document.createElement('canvas'),
            container: elem,
            height: elem.clientHeight || 180,
            loadEvents: JSON.parse(loadEvents).length ? JSON.parse(loadEvents) : LOAD_EVENTS,
            retinaUrl: window.devicePixelRatio === 2 ? (retinaUrl || datasetRest.retinaUrl || '') : '',
            rotateEvents: JSON.parse(rotateEvents).length ? JSON.parse(rotateEvents) : ROTATE_EVENTS,
            speed: (Math.floor((speed || datasetRest.speed || 1) * 100) / 100),
            width: elem.clientWidth || 320,
            ...datasetRest,
            ...propsRest
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
        const { container, canvas, controls } = this.props;
        container.append(canvas);

        if (isEmpty(controls)) return;

        const controlsContainer = document.createElement('div');
        for (let control in this[_controls]) {
            controlsContainer.append(this[_controls][control]);
        }

        controlsContainer.classList.add('js360-controls');
        container.append(controlsContainer);
    }

    toggle = () => {
        this[_meta].stopped = !this[_meta].stopped;
        if (!this[_interval]) this.play();
        if (!this[_meta].stopped && typeof this.props.onPlayStart === 'function') this.props.onPlayStart();
        if (this[_meta].stopped && typeof this.props.onPlayEnd === 'function') this.props.onPlayEnd();
        updatePlayButton(this);
    }

    stop = () => {
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

                if (preloader) addLoader(this.props);

                httpGet(path).then((images) => {
                    const { container, rotateEvents } = this.props;

                    this[_meta].loaded = true;
                    this[_meta].pending = false;

                    this[_step] = Math.floor((width / images.length) * 1000) / 1000;
                    this[_images] = images;
                    showControls(this.props, ['play']);
                    removeLoader(this.props);

                    // rotate возвращает функцию, которая меняет состояние входящего параметра meta. Надо вынести изменение состояния в класс
                    rotateEvents.forEach((event) => container.addEventListener(event, rotate(this)));
                    if (typeof onLoad === 'function') onLoad();
                    if (autoPlay) this.play();
                    resolve();
                });
            } else resolve();
        });
    }

    play = (forced = false) => {
        this[_meta].stopped = forced;
        if (this[_controls].play) updatePlayButton(this);

        clearInterval(this[_interval]);
        if (typeof this.props.onPlayStart === 'function') this.props.onPlayStart();

        this[_interval] = setInterval(() => {
            if (this[_meta].moving || this[_meta].stopped) return;

            if (typeof this.props.onPlay === 'function') this.props.onPlay();
            this[_delta]--;
            this[_updateImage]();
        }, Math.floor(50 / this.props.speed));
    }
}
