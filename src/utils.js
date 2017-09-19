export const getXFn = (container) => {
    const { left } = container.getBoundingClientRect();

    return (x) => x - left;
}

export const httpGet = (url) => {
    return new Promise(function(resolve) {
        const xhr = new XMLHttpRequest();

        xhr.onload = () => {
            const reader = new FileReader();
            reader.readAsText(xhr.response);
            reader.onloadend = () => resolve(JSON.parse(reader.result));
        };

        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    });
};

export const getTarget = (target) => {
    if (typeof target === 'string') {
        return document.querySelectorAll(target);
    } else if (typeof target === 'object' && target.length) {
        return target;
    } else if (typeof target === 'object' && !target.length) {
        return [target];
    }

    return [];
}

export const intersects = (first = [], second = []) => {
    return first.some((el) => second.includes(el));
}

export const isEmpty = (obj) => {
    let result = true;
    for (let val in obj) { result = !!obj[val] ? false : result; }

    return result;
}

export const range = (length) => {
    const result = [];

    for (let i = 0; i < length; i++) {
        result.push(i);
    }

    return result;
}

const LOAD_EVENTS = ['mousemove'];
const ROTATE_EVENTS = ['mousedown'];

export const getLoadEvents = (dataEvents = '[]', propsEvents = []) => {
    if (JSON.parse(dataEvents).length) return JSON.parse(dataEvents);
    if (propsEvents.length) return propsEvents;
    return LOAD_EVENTS;
};

export const getRotateEvents = (dataEvents = '[]', propsEvents = []) => {
    if (JSON.parse(dataEvents).length) return JSON.parse(dataEvents);
    if (propsEvents.length) return propsEvents;
    return ROTATE_EVENTS;
};
