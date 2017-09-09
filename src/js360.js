import { JS360Canvas } from './js360Canvas';

export class JS360 {
    constructor(options) {
        this.props = { ...options };
        this.canvases = {};
    }

    render() {
        const { target } = this.props;
        let targets = [];

        if (typeof target === 'string') {
            targets = document.querySelectorAll(target);
        } else if (typeof target === 'object' && target.length) {
            targets = target;
        } else if (typeof target === 'object' && !target.length) {
            targets = [target];
        }

        targets.forEach((elem) => {
            const { url, retinaPrefix } = elem.dataset;
            const { target, ...rest } = this.props;

            elem.classList.add('js360-container');
            this.canvases[url] = new JS360Canvas({ elem, retinaPrefix, ...rest });
        });
    }
}
