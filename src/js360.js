import { Canvas } from './Canvas';

// option = {
//     target, // 'selector', document.querySelectorAll('selector'), document.querySelector('selector')
//     baseUrl // http://your_api....
// }

export class Js360 {
    constructor(options) {
        this.props = { ...options };
        this.canvases = [];

        if (!this.props.baseUrl) {
            console.warn('Not provided "baseUrl" property in constructor. It needed to get images from server. Please, provide it something like this: new js360({ baseUrl: "...you_api..." })');
        }
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
            const { baseUrl } = this.props;

            elem.classList.add('js-360-container');
            this.canvases[url] = new Canvas({ elem, baseUrl, retinaPrefix });
        });
    }
}
