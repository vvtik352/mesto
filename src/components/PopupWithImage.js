import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
        this._img = this._popupContainer.querySelector('.popup__image-src')
        this._title = this._popupContainer.querySelector('.popup__image-name')
    }

    open(link, name) {
        super.open()
        this._img.src = link
        this._img.alt = name
        this._title.textContent = name
    }
}