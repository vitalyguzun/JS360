import { getXFn, httpGet } from './utils';
// import * as loaderStyles from './JS360.scss';

export class Canvas {
    constructor({ elem, baseUrl, retinaPrefix }) {
        this.props = {
            baseUrl,
            retinaPrefix: window.devicePixelRatio === 2 ? retinaPrefix : '',
            container: elem,
            canvas: document.createElement('canvas'),
            url: elem.dataset.url,
            width: elem.clientWidth || 320,
            height: elem.clientHeight || 180,
            preview: elem.dataset.preview
        };

        this.index = 0;
        this.isMoved = false;
        this.delta = null;
        this.step = null;
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
        const { container } = this.props;

        container.addEventListener('mousedown', ({ clientX }) => {
            this.isMoved = true;
            this.delta = this.getX(clientX) - (this.index * this.step);
        });
        container.addEventListener('touchstart', ({ changedTouches }) => {
            this.isMoved = true;
            this.delta = this.getX(changedTouches[0].clientX) - (this.index * this.step);
        });

        container.addEventListener('mouseup', () => this.isMoved = null);
        container.addEventListener('touchend', () => this.isMoved = null);
        container.addEventListener('mousemove', this.startCycle);
        container.addEventListener('touchmove', this.startCycle);
    }

    startCycle = (event) => {
        const { baseUrl, url, width, retinaPrefix } = this.props;
        const { length } = this.images;

        if (url && !length) {
            const path = [baseUrl, retinaPrefix, url].filter(path => path).join('/');

            this.addLoader();
            httpGet(path).then((images) => {
                this.step = Math.floor((width / images.length) * 1000) / 1000;
                this.images = images;
                this.removeLoader();
            });
        }

        if (this.isMoved && length) {
            this.changeImage(event);
        }
    }

    addLoader() {
        const { container } = this.props;
        container.classList.add('is-pending');
        // container.classList.add(loaderStyles['is-pending']);

        const loader = document.createElement('div');
        loader.classList.add('loader');
        // loader.classList.add(loaderStyles.loader);
        container.append(loader);
    }

    removeLoader() {
        const { container } = this.props;
        container.classList.remove('is-pending');
        // container.classList.remove(loaderStyles['is-pending']);
        document.querySelector('.loader').remove();
    }

    getChangeImageFn = ({ container, canvas }) => {
        const width = container.clientWidth || 320;
        const height = container.clientHeight || 180;
        const context = canvas.getContext('2d');

        return (event) => {
            let clientX = null;
            if (event.type === 'touchmove') {
                clientX = this.getX(event.changedTouches[0].clientX);
            } else {
                clientX = this.getX(event.clientX);
            }

            this.index = Math.round((clientX - this.delta) / this.step);

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
