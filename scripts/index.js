
// получаем доступ к основым элементам управления на странице 
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close')
const descriptionInput = document.querySelector('#input-description')
const nameInput = document.querySelector('#input-name')
const submitButton = document.querySelector('.popup__submit')


// устанавливаем обработчики событий на кнопки
profileEditButton.addEventListener('click', onEdit)
popupCloseButton.addEventListener('click', onClose)
submitButton.addEventListener('click', onSubmit)



function onEdit() {
    popup.classList.add('popup__opened')
}

function onClose() {
    popup.classList.remove('popup__opened')
}


function onSubmit() {
    profileName.textContent = nameInput.value
    profileSubtitle.textContent = descriptionInput.value
    onClose()
}