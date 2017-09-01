export function getXFn(container) {
    const rect = container.getBoundingClientRect();
    const { left } = rect;

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
