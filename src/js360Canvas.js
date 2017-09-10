import { getXFn, httpGet, intersects } from './utils';
import { Controls } from './js360Controls';
import { LOAD } from './constants';
import './js360.scss';

const LOAD_EVENTS = ['mousemove'];
const ROTATE_EVENTS = ['mousedown'];

export class JS360Canvas {
    constructor({ elem, speed, controls, retinaUrl, ...propsRest }) {
        const { loadEvents = '[]', rotateEvents = '[]', ...datasetRest } = elem.dataset;

        this.props = {
            canvas: document.createElement('canvas'),
            container: elem,
            controls: {
                load: controls && controls.load ? document.createElement('div') : null
            },
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
            moving: false
        }

        this.interval = null;
        this.clientX = 0;
        this.delta = null;
        this.step = null;
        this.controls = {};
        this.images = [];

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
        container.append(controls.load || '');
    }

    getPreviewImg = () => {
        const { canvas, width, height, preview } = this.props;
        const context = canvas.getContext('2d');
        const img = document.createElement('img');

        img.src = preview;
        img.onload = () => context.drawImage(img, 0, 0, width, height);
    }

    addListeners = () => {
        const { container, controls, loadEvents, rotateEvents } = this.props;
        const loadTarget = controls.load || container;

        rotateEvents.forEach((event) => container.addEventListener(event, this.rotate));
        loadEvents.forEach((event) => loadTarget.addEventListener(event, this.load));
        container.addEventListener('mousemove', this.move);
        container.addEventListener('touchmove', this.move);
        container.addEventListener('mouseup', this.stop);
        container.addEventListener('touchend', this.stop);
    }

    move = (event) => {
        if (this.isRotateOnMousemove) return;

        this.meta.moving = true;
        this.updateClientX(event);
        this.updateImage();
    }

    stop = (event) => {
        this.move(event);
        this.meta.moving = false;
        this.updateDelta(event);
    }

    rotate = (event) => {
        if (!this.images.length) return;

        this.updateDelta(event);
        this.meta.moving = true;
    };

    load = (event) => {
        const { baseUrl, url, width, retinaUrl, autoPlay } = this.props;

        if (url && !this.meta.success && !this.meta.pending) {
            const path = [baseUrl, retinaUrl, url].filter(path => path).join('/');
            this.meta.pending = true;

            this.addLoader();
            httpGet(path).then((images) => {
                this.step = Math.floor((width / images.length) * 1000) / 1000;
                this.images = images;
                this.meta.success = true;
                this.meta.pending = false;
                this.removeLoader();

                if (autoPlay) this.play();
            });
        }
    }

    play = () => {
        this.interval = setInterval(() => {
            if (this.meta.moving) return;

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
        const { container } = this.props;
        container.classList.remove('is-pending');
        container.querySelector('.loader').remove();
    }

    initControls = () => {
        const { controls } = this.props;

        if (!controls.load) return;

        controls.load.classList.add('js360-load');
        controls.load.innerHTML = new Controls(LOAD).render();
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
