export class FormValidator {
    constructor(config, formElement) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config._inputErrorClass;
        this._errorClass = config.errorClass;

        this._formElement = formElement;
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)
        this._inputList = Array.from(
            this._formElement.querySelectorAll(this._inputSelector)
        );
        this._setEventListeners = this._setEventListeners.bind(this)
        this._toggleButtonState = this._toggleButtonState.bind(this)
        this._hasInvalidInput = this._hasInvalidInput.bind(this)
        this._checkInputValidity = this._checkInputValidity.bind(this)
    }


    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }


    _disableButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass)
        this._buttonElement.disabled = true
    }
    
    _enableButton() {
        this._buttonElement.classList.remove(this._inactiveButtonClass)
        this._buttonElement.disabled = false
    }


    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._disableButton(this._buttonElement, this._inactiveButtonClass)

        } else {
            this._enableButton(this._buttonElement, this._inactiveButtonClass)
        }
    }


    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };



    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };


    _setEventListeners() {
        this._formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this._disableButton();

        });

        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList);

            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }

}
