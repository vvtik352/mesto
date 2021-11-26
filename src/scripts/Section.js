export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._initialArray = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector)
    }

    setItem(item) {
        this._container.append(item)
    }

    renderItems() {
        this._initialArray.forEach(element => {
            this._renderer(element)
        });
    }
}