
// получаем доступ к основым элементам управления на странице 
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form')
const popupCloseButton = document.querySelector('.popup__close')
const descriptionInput = document.querySelector('#input-description')
const nameInput = document.querySelector('#input-name')
const submitButton = document.querySelector('.popup__submit')





function onEdit() {
    nameInput.value = profileName.textContent
    descriptionInput.value = profileSubtitle.textContent
    popup.classList.add('popup_opened')
}

function onClose() {
    popup.classList.remove('popup_opened')
}


function onSubmit(event) {
    event.preventDefault()
    profileName.textContent = nameInput.value
    profileSubtitle.textContent = descriptionInput.value
    onClose()
}


// устанавливаем обработчики событий на кнопки
profileEditButton.addEventListener('click', onEdit)
popupCloseButton.addEventListener('click', onClose)
popupForm.addEventListener('submit', onSubmit)
