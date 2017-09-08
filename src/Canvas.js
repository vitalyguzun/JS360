import { getXFn, httpGet } from './utils';
import { Controls } from './Controls';
import { LOAD } from './constants';
import './js360.scss';

const LOAD_EVENTS = ['mousemove'];
const ROTATE_EVENTS = ['mousedown'];

export class Canvas {
    constructor({ elem , retinaPrefix, speed, controls, ...rest }) {
        const { dataset: { loadEvents = '[]', rotateEvents = '[]' }} = elem;

        this.props = {
            retinaPrefix: window.devicePixelRatio === 2 ? retinaPrefix : '',
            container: elem,
            canvas: document.createElement('canvas'),
            width: elem.clientWidth || 320,
            height: elem.clientHeight || 180,
            preview: elem.dataset.preview,
            loadEvents: JSON.parse(loadEvents).length ? JSON.parse(loadEvents) : LOAD_EVENTS,
            rotateEvents: JSON.parse(rotateEvents).length ? JSON.parse(rotateEvents) : ROTATE_EVENTS,
            url: elem.dataset.url,
            baseUrl: elem.dataset.baseUrl,
            speed: (Math.floor((elem.dataset.speed || speed || 1) * 100) / 100),
            controls: {
                load: controls && controls.load ? document.createElement('div') : null
            },
            ...rest
        };

        this.interval = null;

        this.meta = {
            success: false,
            pending: false,
            moving: false,
            fixed: false
        }

        this.clientX = 0;
        this.delta = null;
        this.step = null;
        this.controls = {};

        this.images = [];

        this.changeImage = this.getChangeImageFn(this.props);
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
        const { container, canvas, controls: { load }} = this.props;
        container.append(canvas);

        if (load) {
            container.append(load);
        }
    }

    getPreviewImg() {
        const { canvas, width, height, preview } = this.props;

        const context = canvas.getContext('2d');
        const img = document.createElement('img');

        img.src = preview;
        img.onload = () => context.drawImage(img, 0, 0, width, height);
    }

    addListeners() {
        const { container, controls, loadEvents, rotateEvents } = this.props;
        const loadTarget = controls.load || container;

        rotateEvents.forEach((event) => container.addEventListener(event, this.rotate));
        loadEvents.forEach((event) => loadTarget.addEventListener(event, this.load));
        container.addEventListener('mousemove', this.onMove);
        container.addEventListener('touchmove', this.onMove);
        container.addEventListener('mouseup', () => this.meta.moving = null);
        container.addEventListener('touchend', () => this.meta.moving = null);
    }

    onMove = (event) => {
        if (this.isRotatable) {
            this.updateClientX(event);
            this.changeImage();
        };
    }

    rotate = (event) => {
        if (!this.images.length) return;
        this.calcDelta(event);
        this.meta.moving = true;
    };

    load = (event) => {
        const { baseUrl, url, width, retinaPrefix } = this.props;

        if (url && !this.interval) {
            this.interval = 1;
            const path = [baseUrl, retinaPrefix, url].filter(path => path).join('/');

            this.addLoader();
            httpGet(path).then((images) => {
                this.step = Math.floor((width / images.length) * 1000) / 1000;
                this.images = images;
                this.removeLoader();
            });
        }
    }

    calcDelta = ({ clientX, changedTouches, type }) => {
        if (type === 'mousedown' || type === 'touchstart') {
            this.delta = this.getX(clientX || changedTouches[0].clientX) - (this.index * this.step);
        }
    }

    addLoader() {
        const { container } = this.props;
        container.classList.add('is-pending');

        const loader = document.createElement('div');
        loader.classList.add('loader');
        container.append(loader);
    }

    removeLoader() {
        const { container } = this.props;
        container.classList.remove('is-pending');
        document.querySelector('.loader').remove();
    }

    initControls() {
        const { controls } = this.props;

        if (controls.load) {
            controls.load.classList.add('js360-load');
            controls.load.innerHTML = new Controls(LOAD).render();
        }
    }

    getChangeImageFn = ({ container, canvas, rotateEvents, speed }) => {
        const width = container.clientWidth || 320;
        const height = container.clientHeight || 180;
        const context = canvas.getContext('2d');

        return () => {
            const img = document.createElement('img');
            img.src = this.images[this.index > 0 ? this.index : (this.images.length + this.index)];
            img.onload = () => context.drawImage(img, 0, 0, width, height);
        };
    };

    updateClientX = ({ type, changedTouches, clientX }) => {
        this.clientX = type === 'touchmove' ? this.getX(changedTouches[0].clientX) : this.getX(clientX);
    }

    get index() {
        const { speed } = this.props;
        let index = 0;

        index = Math.round((this.clientX - this.delta) / (this.step / speed));

        if (index >= this.images.length) {
            index = 0;
            this.delta = this.clientX;
        }

        if (index <= -this.images.length) {
            index += (this.images.length);
            this.delta = this.clientX;
        }

        return index;
    }

    get isRotatable() {
        const { rotateEvents } = this.props;
        return !((rotateEvents.includes('mousedown') || rotateEvents.includes('touchstart')) && !this.meta.moving);
    }
}
