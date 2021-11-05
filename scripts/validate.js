const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('error_visible');
};

const hideInputError = (formElement, inputElement) => {

    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_error');
    errorElement.classList.remove('error_visible');
    errorElement.textContent = '';
};


function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__submit_disabled');
    } else {
        buttonElement.classList.remove('popup__submit_disabled');
    }
}



const setEventListeners = (inputList, formElement) => {
    const buttonElement = formElement.querySelector('.popup__submit');
   
   
    formElement.addEventListener("submit", (event) => {
        event.preventDefault();
        event.target.querySelector('.popup__submit').classList.toggle('popup__submit_disabled')

    });

    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            // чтобы проверять его при изменении любого из полей
            toggleButtonState(inputList, buttonElement);

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
        setEventListeners(fieldsetList, formElement);

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
