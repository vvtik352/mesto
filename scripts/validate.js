const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {

    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};


function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

function disableButton(buttonElement, inactiveButtonClass) {
    buttonElement.classList.add(inactiveButtonClass)
    buttonElement.disabled = true
}

function enableButton(buttonElement, inactiveButtonClass) {
    buttonElement.classList.remove(inactiveButtonClass)
    buttonElement.disabled = false
}


function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, inactiveButtonClass)

    } else {
        enableButton(buttonElement, inactiveButtonClass)
    }
}



const setEventListeners = (inputList, formElement, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass) => {
    const buttonElement = formElement.querySelector(submitButtonSelector);

    formElement.addEventListener("submit", (event) => {
        event.preventDefault();
        disableButton(buttonElement, inactiveButtonClass)

    });

    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            // чтобы проверять его при изменении любого из полей

            toggleButtonState(inputList, buttonElement, inactiveButtonClass);

        });
    });
};



function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(obj.inputSelector));
        setEventListeners(fieldsetList, formElement, obj.inputErrorClass, obj.errorClass, obj.submitButtonSelector, obj.inactiveButtonClass);

    });
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'error_visible'
});
