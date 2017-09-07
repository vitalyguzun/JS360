import { getXFn, httpGet } from './utils';
import './js360.scss';

const LOAD_EVENTS = ['mousemove'];
const ROTATE_EVENTS = ['mousedown'];

export class Canvas {
    constructor({ elem , retinaPrefix, speed, ...rest }) {
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
            ...rest
        };

        this.index = 0;
        this.isMoved = false;
        this.delta = null;
        this.step = null;
        this.interval = null;

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
        this.addListeners();
    }

    render() {
        const { container, canvas } = this.props;
        container.append(canvas);
    }

    getPreviewImg() {
        const { canvas, width, height, preview } = this.props;

        const context = canvas.getContext('2d');
        const img = document.createElement('img');

        img.src = preview;
        img.onload = () => context.drawImage(img, 0, 0, width, height);
    }

    addListeners() {
        const { container, loadEvents, rotateEvents } = this.props;

        rotateEvents.forEach((eventName) => container.addEventListener(eventName, ({ clientX, changedTouches, type }) => {
            if (type === 'mousedown') {
                this.delta = this.getX(clientX) - (this.index * this.step);
            } else if (type === 'touchstart') {
                this.delta = this.getX(changedTouches[0].clientX) - (this.index * this.step);
            }

            this.isMoved = true;
        }));
        loadEvents.forEach((event) => container.addEventListener(event, this.getContent));

        container.addEventListener('mousemove', this.changeImage);
        container.addEventListener('touchmove', this.changeImage);
        container.addEventListener('mouseup', () => this.isMoved = null);
        container.addEventListener('touchend', () => this.isMoved = null);
    }

    getContent = (event) => {
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

    getChangeImageFn = ({ container, canvas, rotateEvents, speed }) => {
        const width = container.clientWidth || 320;
        const height = container.clientHeight || 180;
        const context = canvas.getContext('2d');

        return (event) => {
            if ((rotateEvents.includes('mousedown') || rotateEvents.includes('touchstart')) && !this.isMoved) {
                return;
            }

            let clientX = null;
            if (event.type === 'touchmove') {
                clientX = this.getX(event.changedTouches[0].clientX);
            } else {
                clientX = this.getX(event.clientX);
            }

            this.index = Math.round((clientX - this.delta) / (this.step / speed));

            if (this.index >= this.images.length) {
                this.index = 0;
                this.delta = clientX;
            }

            if (this.index <= -this.images.length) {
                this.index += this.images.length;
            }

            const img = document.createElement('img');
            img.src = this.images[this.index > 0 ? this.index : (this.images.length + this.index)];
            img.onload = () => context.drawImage(img, 0, 0, width, height);
        };
    };
}
