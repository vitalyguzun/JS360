import { JS360Canvas } from './js360Canvas';
import { getTarget } from './utils';

export class JS360 {
    constructor(options) {
        this.props = { ...options };
        this.canvases = {};
    }

    render() {
        const targets = getTarget(this.props.target);

        targets.forEach((elem) => {
            const { url, retinaPrefix } = elem.dataset;
            const { target, ...rest } = this.props;

            elem.classList.add('js360-container');
            this.canvases[url] = new JS360Canvas({ elem, retinaPrefix, ...rest });
        });
    }
}
