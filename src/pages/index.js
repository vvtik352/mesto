import './../pages/index.css'
import { initialCards } from '../utils/constants'
import { FormValidator } from "../scripts/FormValidator.js"
import { validatorConfig } from "../scripts/constants.js"
import { Card } from "../scripts/Card.js"
import PopupWithImage from '../scripts/PopupWithImage'
import PopupWithForm from '../scripts/PopupWithForm'
import UserInfo from '../scripts/UserInfo'


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



// функции описывающие взаимодействие между новыми компонентами 

function createCard(name, link) {

    const cardElement = new Card({ name, link }, '#element-template', handleCardClick).generateCard()

    return cardElement
}

//загрузка карточек из массива
initialCards.forEach((card) => {
    const newCard = createCard(card.name, card.link)

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
  
    const newCard = createCard(cardNameInput.value, linkInput.value)
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