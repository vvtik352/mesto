import './../pages/index.css'
import { FormValidator } from "./FormValidator.js"
import { validatorConfig } from "./constants.js"
import { Card } from "./Card.js"
import PopupWithImage from './PopupWithImage'
import PopupWithForm from './PopupWithForm'
import UserInfo from './UserInfo'


// получаем доступ к основым элементам управления на странице 
const profileEditButton = document.querySelector('.profile__edit-button')
const cardAddButton = document.querySelector('.profile__add-button')

const popupProfileForm = document.querySelector('#popup_profile-info')
const descriptionInput = document.querySelector('#input-description')
const nameInput = document.querySelector('#input-name')


const cardContainer = document.querySelector('.elements')


const popupCardForm = document.querySelector('#popup_card-info')
const linkInput = document.querySelector('#input-link')
const cardNameInput = document.querySelector('#input-card__name')


// выделяем переменные под объекты новых классов
const userInfo = new UserInfo('.profile__title', '.profile__subtitle')
const popupProfile = new PopupWithForm('#popup__profile', handleSubmitButtonEditProfile)
const popupCard = new PopupWithForm('#popup__card', handleSubmitButtonCardForm)
const popupImage = new PopupWithImage('#popup__image')

// устанавливаем на формы обработчики событий
popupProfile.setEventListeners()
popupCard.setEventListeners()
popupImage.setEventListeners()


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


// функции описывающие взаимодействие между новыми компонентами 

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

    popupImage.open(event.target.src, event.target.alt)
}


function openProfilePopup() {
    const { name, descr } = userInfo.getUserInfo()
    nameInput.value = name
    descriptionInput.value = descr
    popupProfile.open()
}

function openCardPopup() {
    popupCard.open()
}



function handleSubmitButtonEditProfile(event) {
    event.preventDefault()
    userInfo.setUserInfo({ name: nameInput.value, descr: descriptionInput.value })
    popupProfile.close()
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
    popupCard.close()
}



const validatorProfile = new FormValidator(validatorConfig, popupProfileForm)
validatorProfile.enableValidation()

const validatorCard = new FormValidator(validatorConfig, popupCardForm)
validatorCard.enableValidation()


// устанавливаем обработчики событий на кнопки
popupProfileForm.addEventListener('submit', handleSubmitButtonEditProfile)
profileEditButton.addEventListener('click', openProfilePopup)

popupCardForm.addEventListener('submit', handleSubmitButtonCardForm)
cardAddButton.addEventListener('click', openCardPopup)