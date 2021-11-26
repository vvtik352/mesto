export default class Popup {
    constructor(popupSelector) {
        this._popupContainer = document.querySelector(popupSelector)

        // привязываем функции к контексту класса чтобы 
        // при вызове их из обработчика иметь доступ к текущему this
        this.close = this.close.bind(this)
        this._closeByEcs = this._closeByEcs.bind(this)
        this._closeByOverlayClick = this._closeByOverlayClick.bind(this)
    }

    open() {
        this._popupContainer.classList.add('popup_opened')
        document.addEventListener('keydown', this._closeByEcs)
    }

    close() {
        this._popupContainer.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._closeByEcs)
    }


    setEventListeners() {
        this._popupContainer.querySelector('.popup__close').addEventListener('click', this.close)
        this._popupContainer.addEventListener('mousedown', this._closeByOverlayClick)
    }


    // Приватные методы

    _closeByEcs(evt) {
        if (evt.key === 'Escape')
            this.close()
    }
    _closeByOverlayClick(event) {
        if (event.target.classList.contains('popup')) {
            this.close()
        }
    }

}