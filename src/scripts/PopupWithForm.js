import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(selector, callbackSubmit) {
        super(selector)
        this._form = this._popupContainer.querySelector('.popup__form')
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'))
        this._handleSubmit = callbackSubmit
    }


    close() {
        super.close()

        this._form.reset()
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', this._handleSubmit)
    }

    // Приватные методы

    _getInputValues() {
        return this._inputList.map(formInput => formInput.value)
    }
}