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
