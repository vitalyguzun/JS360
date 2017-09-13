import { JS360Canvas } from './js360Canvas';
import { getTarget, range } from './utils';

export class JS360 {
    constructor(options) {
        this.props = { ...options };
        this.canvases = [];
    }

    render() {
        const targets = getTarget(this.props.target);

        targets.forEach((elem) => {
            elem.classList.add('js360-container');
            this.canvases.push(new JS360Canvas({ elem, ...this.props }));
        });
    }

    load = (indexes = range(this.canvases.length)) => Promise.all(indexes.map((index) => this.canvases[index].load()));
    play = (indexes = range(this.canvases.length)) => indexes.forEach((index) => this.canvases[index].play());
    stop = (indexes = range(this.canvases.length)) => indexes.forEach((index) => this.canvases[index].stop());
    toggle = (indexes = range(this.canvases.length)) => indexes.forEach((index) => this.canvases[index].toggle());
}
