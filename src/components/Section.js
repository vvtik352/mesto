export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._initialArray = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector)

        this.renderItems = this.renderItems.bind(this)
    }

    /**
     * 
     * @param {*} item - элемент для добавление в список
     * @param {*} toStart - если true вставялет элемент в начало списка(по умолчанию false)
     */
    setItem(item, toStart = false) {
        if (toStart)
            this._container.prepend(this._renderer(item))
        else
            this._container.append(this._renderer(item))
    }

    renderItems() {
        this._initialArray.forEach(element => {
            this.setItem(element)
        });
    }
}