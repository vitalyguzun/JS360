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
        this.intervalIndex = 0;

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
        container.addEventListener('mouseup', this.stop);
        container.addEventListener('touchend', this.stop);
    }

    onMove = (event) => {
        if (this.isRotatable) {
            this.meta.moving = true;
            this.updateClientX(event);
            this.changeImage(this.index);
        };
    }

    stop = (event) => {
        this.onMove(event);
        this.meta.moving = false;
        this.calcDelta(event);
        this.intervalIndex = this.index;
    }

    rotate = (event) => {
        if (!this.images.length) return;
        this.calcDelta(event);
        this.meta.moving = true;
    };

    load = (event) => {
        const { baseUrl, url, width, retinaPrefix, autoPlay } = this.props;

        if (url && !this.meta.success && !this.meta.pending) {
            this.meta.pending = true;
            const path = [baseUrl, retinaPrefix, url].filter(path => path).join('/');

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
            if (!this.meta.moving) {
                this.intervalIndex++;
                this.changeImage(this.intervalIndex);

                if (this.intervalIndex >= this.images.length) {
                    this.intervalIndex = 0;
                }
            }
        }, Math.floor(50 / this.props.speed));
    }

    calcDelta = ({ clientX, changedTouches, type }) => {
        if (type === 'mousedown' || type === 'touchstart') {
            const index = this.interval ? this.intervalIndex : this.index;
            const x = clientX || changedTouches[0].clientX;
            const { speed } = this.props;

            this.delta = this.getX(x) - ((index * this.step) / speed);
        }
    }

    addLoader = () => {
        const { container } = this.props;
        container.classList.add('is-pending');

        const loader = document.createElement('div');
        loader.classList.add('loader');
        container.append(loader);
    }

    removeLoader = () => {
        const { container } = this.props;
        container.classList.remove('is-pending');
        document.querySelector('.loader').remove();
    }

    initControls = () => {
        const { controls } = this.props;

        if (controls.load) {
            controls.load.classList.add('js360-load');
            controls.load.innerHTML = new Controls(LOAD).render();
        }
    }

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

        if (Number.isNaN(index)) {
            index = 0;
        }

        return index;
    }

    get isRotatable() {
        const { rotateEvents } = this.props;
        return !((rotateEvents.includes('mousedown') || rotateEvents.includes('touchstart')) && !this.meta.moving);
    }

    getChangeImageFn = ({ container, canvas, rotateEvents, speed }) => {
        const width = container.clientWidth || 320;
        const height = container.clientHeight || 180;
        const context = canvas.getContext('2d');

        return (index) => {
            const img = document.createElement('img');
            img.src = this.images[index > 0 ? index : (this.images.length + index)];
            img.onload = () => context.drawImage(img, 0, 0, width, height);
        };
    };
}
