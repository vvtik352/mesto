import './../pages/index.css'

import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js"
import { validatorConfig } from "./constants.js"
// получаем доступ к основым элементам управления на странице 
const profileEditButton = document.querySelector('.profile__edit-button')
const profileName = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')

const popupProfile = document.querySelector('#popup__profile')
const popupProfileForm = document.querySelector('#popup_profile-info')
const descriptionInput = document.querySelector('#input-description')
const nameInput = document.querySelector('#input-name')


const cardContainer = document.querySelector('.elements')

const cardAddButton = document.querySelector('.profile__add-button')


const popupCard = document.querySelector('#popup__card')
const popupCardForm = document.querySelector('#popup_card-info')
const linkInput = document.querySelector('#input-link')
const cardNameInput = document.querySelector('#input-card__name')


const popupImage = document.querySelector('#popup__image')
const popupImageSrc = document.querySelector('.popup__image-src')
const popupImageName = document.querySelector('.popup__image-name')
const popupImageCloseButton = document.querySelector('#popup-image_close')




const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Туканчик',
        link: 'https://images.unsplash.com/photo-1636334265407-97ea707f856c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1690&q=80'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Собака',
        link: 'https://images.unsplash.com/photo-1636402419603-33f3d55100bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80'
    }
]


function addCard(name, link) {

    const cardElement = new Card({ name, link }, '#element-template', handleCardClick).generateCard()

    return cardElement
}

//загрузка карточек из массива
initialCards.forEach((card) => {
    const newCard = addCard(card.name, card.link)

    cardContainer.prepend(newCard)
})


function handleCardClick(event) {
    popupImageSrc.src = event.target.src
    popupImageSrc.alt = event.target.alt
    popupImageName.textContent = event.target.alt

    openPopup(popupImage)
}



function openPopup(popup) {
    popup.classList.add('popup_opened');


    document.addEventListener('keydown', closeByEsc)

    document.addEventListener('click', closeByOverlayClick)
}

function openProfilePopup() {
    nameInput.value = profileName.textContent
    descriptionInput.value = profileSubtitle.textContent
    openPopup(popupProfile);
}

function openCardPopup() {
    openPopup(popupCard);
}


function closePopup(popup) {
    popup.classList.remove('popup_opened')

    document.removeEventListener('keydown', closeByEsc)
    document.removeEventListener('click', closeByOverlayClick)

}

function closeByEsc(event) {

    if (event.key == 'Escape') {
        closeOpenedPopup()
    }
}

function closeByOverlayClick(event) {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target)
    }
}




function closeOpenedPopup() {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
}


function handleSubmitButtonEditProfile(event) {
    event.preventDefault()
    profileName.textContent = nameInput.value
    profileSubtitle.textContent = descriptionInput.value
    closePopup(popupProfile)
}


function handleSubmitButtonCardForm(event) {
    event.preventDefault()
    initialCards.push({
        name: cardNameInput.value,
        link: linkInput.value
    })
    const newCard = addCard(cardNameInput.value, linkInput.value)
    cardContainer.prepend(newCard)
    cardNameInput.value = ''
    linkInput.value = ''
    closePopup(popupCard)
}



const validatorProfile = new FormValidator(validatorConfig, popupProfileForm)
validatorProfile.enableValidation()

const validatorCard = new FormValidator(validatorConfig, popupCardForm)
validatorCard.enableValidation()

const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
})

// устанавливаем обработчики событий на кнопки
popupProfileForm.addEventListener('submit', handleSubmitButtonEditProfile)
profileEditButton.addEventListener('click', openProfilePopup)

popupCardForm.addEventListener('submit', handleSubmitButtonCardForm)
cardAddButton.addEventListener('click', openCardPopup)