import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(selector, callbackSubmit) {
        super(selector)
        this._form = this._popupContainer.querySelector('.popup__form')
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'))
        this._handleSubmit = callbackSubmit

        this._submitButton = this._form.querySelector('.popup__submit')

        this.setIsProcessing = this.setIsProcessing.bind(this)
    }


    close() {
        super.close()

        this._form.reset()
    }

    setEventListeners() {
        super.setEventListeners()

        this._form.addEventListener('submit', (event) => this._handleSubmit(event, this._getInputValues()))
    }

    setIsProcessing(isProcessing) {
        if (isProcessing) {
            this._submitButton.textContent = 'Сохранение...';
        } else {
            this._submitButton.textContent = 'Сохранить';
        }
    };

    // Приватные методы

    _getInputValues() {
        const formValues = {} // объект { [input-id]: [input-value] }
        this._inputList.map((input) => {
            formValues[input.id] = input.value
        })
        return formValues
    }
}