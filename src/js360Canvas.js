import { getXFn, httpGet, intersects, isEmpty } from './utils';
import { Controls } from './js360Controls';
import { LOAD, PLAY, PAUSE } from './constants';
import './js360.scss';

const LOAD_EVENTS = ['mousemove'];
const ROTATE_EVENTS = ['mousedown'];
const CONTROL_TYPES = {
    load: LOAD,
    play: PLAY
}

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

        this.meta = {
            success: false,
            pending: false,
            moving: false,
            paused: true
        }

        this.interval = null;
        this.clientX = 0;
        this.delta = null;
        this.step = null;
        this.images = [];
        this.controls = {};

        this.updateImage = this.getUpdateImageFn(this.props);
        this.getX = getXFn(this.props.container);

        this.init();
        this.render();
    }

    init() {
        const { container, width, height, canvas } = this.props;

        canvas.setAttribute('width', `${width}px`);
        canvas.setAttribute('height', `${height}px`);
        container.style.position = 'relative';

        this.getPreviewImg();
        this.initControls();
        this.addListeners();
    }

    render() {
        const { container, canvas, controls } = this.props;
        container.append(canvas);

        if (isEmpty(controls)) return;

        const controlsContainer = document.createElement('div');
        for (let control in this.controls) {
            controlsContainer.append(this.controls[control]);
        }

        controlsContainer.classList.add('js360-controls');
        container.append(controlsContainer);
    }

    getPreviewImg = () => {
        const { canvas, width, height, preview } = this.props;
        const context = canvas.getContext('2d');
        const img = document.createElement('img');

        img.src = preview;
        img.onload = () => context.drawImage(img, 0, 0, width, height);
    }

    addListeners = () => {
        const { container, loadEvents, rotateEvents } = this.props;
        const loadTarget = this.controls.load || container;

        rotateEvents.forEach((event) => container.addEventListener(event, this.rotate));
        loadEvents.forEach((event) => loadTarget.addEventListener(event, this.load));
        container.addEventListener('mousemove', this.move);
        container.addEventListener('touchmove', this.move);
        container.addEventListener('mouseup', this.moveEnd);
        container.addEventListener('touchend', this.moveEnd);
    }

    move = (event) => {
        if (this.isRotateOnMousemove) return;

        this.meta.moving = true;
        this.updateClientX(event);
        this.updateImage();
    }

    moveEnd = (event) => {
        this.move(event);
        this.meta.moving = false;
        this.updateDelta(event);
    }

    rotate = (event) => {
        if (!this.images.length) return;

        this.updateDelta(event);
        this.meta.moving = true;
    };

    toggle = () => {
        this.meta.paused = !this.meta.paused;
        if (!this.interval) this.play();
        this.updatePlayButton();
    }

    stop = () => {
        this.meta.paused = true;
        clearInterval(this.interval);
        this.interval = null;

        this.updatePlayButton();
    }

    load = () => {
        const { autoPlay, baseUrl, preloader, retinaUrl, url, width } = this.props;

        return new Promise((resolve) => {
            if (url && !this.meta.success && !this.meta.pending) {
                const path = [baseUrl, retinaUrl, url].filter(path => path).join('/');
                this.meta.pending = true;

                if (preloader) this.addLoader();

                httpGet(path).then((images) => {
                    this.meta.success = true;
                    this.meta.pending = false;

                    this.step = Math.floor((width / images.length) * 1000) / 1000;
                    this.images = images;
                    this.showControls(['pause', 'play']);
                    this.removeLoader();

                    if (autoPlay) this.play();
                    resolve();
                });
            } else resolve();
        });
    }

    play = (forced = false) => {
        this.meta.paused = forced;
        this.updatePlayButton();

        clearInterval(this.interval);
        this.interval = setInterval(() => {
            if (this.meta.moving || this.meta.paused) return;

            this.delta--;
            this.updateImage();
        }, Math.floor(50 / this.props.speed));
    }

    addLoader = () => {
        const { container } = this.props;
        const loader = document.createElement('div');

        loader.classList.add('loader');
        container.classList.add('is-pending');
        container.append(loader);
    }

    removeLoader = () => {
        const { container, preloader } = this.props;
        if (!preloader) return;

        container.classList.remove('is-pending');
        container.querySelector('.loader').remove();
    }

    initControls = () => {
        const { autoPlay, controls } = this.props;
        if (isEmpty(controls)) return;

        for (let control in controls) {
            const button = (control === 'play' && autoPlay) ? PAUSE: CONTROL_TYPES[control];

            if (button) {
                this.controls[control] = document.createElement('div');
                this.controls[control].classList.add(`js360-${control}`, 'js360-control');
                this.controls[control].innerHTML = new Controls(button).render();

                if (control === 'play') {
                    this.controls[control].addEventListener('click', this.toggle);
                }
            }
        }
    }

    showControls = (types) => {
        types.forEach((type) => {
            const control = this.props.container.querySelector(`.js360-${type}`);
            if (!control) return;

            control.classList.add('visible');
        });
    }

    updatePlayButton = () => {
        const state = this.meta.paused ? PLAY : PAUSE;
        this.controls.play.innerHTML = new Controls(state).render();
    }

    updateClientX = ({ type, changedTouches, clientX }) => {
        this.clientX = (type === 'touchmove') ? this.getX(changedTouches[0].clientX) : this.getX(clientX);
    }

    updateDelta = ({ type, changedTouches, clientX }) => {
        if (!['mousedown', 'touchstart'].includes(type)) return;

        this.delta = this.getX(clientX || changedTouches[0].clientX) - ((this.index * this.step) / this.props.speed);
    }

    get index() {
        const { speed } = this.props;
        let index = Math.round((this.clientX - this.delta) / (this.step / speed));

        if (index >= this.images.length) {
            index = 0;
            this.delta = this.clientX;
        }

        if (index <= -this.images.length) {
            index += (this.images.length);
            this.delta = this.clientX;
        }

        return Number.isNaN(index) ? 0 : index;
    }

    get isRotateOnMousemove() {
        const { rotateEvents } = this.props;
        const clickEvents = ['mousedown', 'touchstart'];

        return !this.meta.moving && intersects(rotateEvents, clickEvents);
    }

    getUpdateImageFn = ({ container, canvas, rotateEvents, speed }) => {
        const width = container.clientWidth || 320;
        const height = container.clientHeight || 180;
        const context = canvas.getContext('2d');

        return () => {
            const base64 = this.images[this.index > 0 ? this.index : (this.images.length + this.index)];
            if (!base64) return;

            const img = document.createElement('img');
            img.onload = () => context.drawImage(img, 0, 0, width, height);
            img.src = base64;
        };
    };
}
