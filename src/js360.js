import { JS360Canvas } from './js360Canvas';
import { getTarget } from './utils';

const symbols = [];

export class JS360 {
    constructor(options) {
        this.props = { ...options };
        this.canvases = {};
    }

    render() {
        const targets = getTarget(this.props.target);

        targets.forEach((elem) => {
            const symbol = Symbol();

            symbols.push(symbol);
            elem.classList.add('js360-container');
            this.canvases[symbol] = new JS360Canvas({ elem, ...this.props });
        });
    }
}
