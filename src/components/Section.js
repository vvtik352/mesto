export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._initialArray = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector)

        this.renderItems = this.renderItems.bind(this)
    }

    setItem(item) {
        this._container.append(this._renderer(item))
    }

    renderItems() {
        this._initialArray.forEach(element => {
            this.setItem(element)
        });
    }
}