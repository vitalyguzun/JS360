import { Canvas } from './Canvas';

export class Js360 {
    constructor(options) {
        this.props = { ...options };
        this.canvases = [];

        if (!this.props.baseUrl) {
            console.warn('Not provided "baseUrl" property in constructor. It needed to get images from server. Please, provide it something like this: new js360({ baseUrl: "...you_api..." })');
        }
    }

    render() {
        const js360 = document.querySelectorAll('.js360');

        js360.forEach((elem) => {
            const { url, retinaPrefix } = elem.dataset;
            const { baseUrl } = this.props;

            elem.classList.add('js-360-container');
            this.canvases[url] = new Canvas({ elem, baseUrl, retinaPrefix });
        });
    }
}
