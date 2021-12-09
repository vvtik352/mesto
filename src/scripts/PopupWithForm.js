import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(selector, callbackSubmit) {
        super(selector)
        this._form = this._popupContainer.querySelector('.popup__form')
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'))
        this._handleSubmit = callbackSubmit

        this._submitButton = this._form.querySelector('.popup__submit')
    }


    close() {
        super.close()

        this._form.reset()
    }

    setEventListeners() {
        super.setEventListeners()

        // перед выполнением sumbit функции 
        // ставим форму в режим "сохранения" данных
        const submit = event => {
            this.setIsProcessing(true)

            this._handleSubmit(event).then(() => { this.close() })
                .catch(error => error)
                .finally(() => {
                    this.setIsProcessing(false)
                });
        }
        this._form.addEventListener('submit', submit)
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
        return this._inputList.map(formInput => formInput.value)
    }
}