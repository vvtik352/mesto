import './../pages/index.css'
import { BASE_URL, MY_COHORT, TOKEN } from '../utils/constants'
import { FormValidator } from "../scripts/FormValidator.js"
import { validatorConfig } from "../scripts/constants.js"
import { Card } from "../scripts/Card.js"
import PopupWithImage from '../scripts/PopupWithImage'
import PopupWithForm from '../scripts/PopupWithForm'

import UserInfo from '../scripts/UserInfo'
import Api from '../scripts/Api'
import PopupSubmit from '../scripts/PopupSubmit'
import Section from '../scripts/Section'


// получаем доступ к основым элементам управления на странице 
const profileEditButton = document.querySelector('.profile__edit-button')
const cardAddButton = document.querySelector('.profile__add-button')
const profileEditAvatarButton = document.querySelector('.profile__avatar-edit')

const popupProfileForm = document.querySelector('#popup_profile-info')
const descriptionInput = document.querySelector('#input-description')
const nameInput = document.querySelector('#input-name')

const cardContainer = document.querySelector('.elements')

const popupCardForm = document.querySelector('#popup_card-info')
const linkInput = document.querySelector('#input-link')
const cardNameInput = document.querySelector('#input-card__name')


const popupAvatar = document.querySelector('#popup_avatar-edit');
const avatarLinkInput = document.querySelector('#input-link-avatar')

// выделяем переменные под объекты новых классов
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar')

const popupProfile = new PopupWithForm('#popup__profile', handleSubmitButtonEditProfile)
const popupCard = new PopupWithForm('#popup__card', handleSubmitButtonCardForm)
const popupAvatarEdit = new PopupWithForm('#popup__avatar', handleSubmitButtonAvatarEdit)

const popupImage = new PopupWithImage('#popup__image')

const popupSumbitDeleting = new PopupSubmit('#popup__delete', handleDeleteCard)


// устанавливаем на формы обработчики событий
popupProfile.setEventListeners()
popupCard.setEventListeners()
popupImage.setEventListeners()
popupSumbitDeleting.setEventListeners()
popupAvatarEdit.setEventListeners()

let currentUserID = '' // ID текущего пользователя объявляем в глобальном скрипте чтоб в дальнейшем использовать его в карточках

const apiConfig = {
    url: BASE_URL,
    token: TOKEN,
    cohort: MY_COHORT
}
const mestoApi = new Api(apiConfig)


let cardSection = null // т.к массив карточек приходит только после запроса то инициализируем переменню уже внутри запроса
mestoApi.getUserInfo()
    .then(data => {
        currentUserID = data._id
        userInfo.setUserInfo({ name: data.name, descr: data.about })
        userInfo.setUserAvatar(data.avatar)
    }).then(() => {
        mestoApi.getCards().then(data => {
            cardSection = new Section({ data: data, renderer: createCard }, '.elements')
            cardSection.renderItems()
        })
    }).catch(error => console.error(error))

// функции описывающие взаимодействие между новыми компонентами 

function createCard(cardInfo, userID = currentUserID) {
    const cardElement = new Card(
        cardInfo,
        '#element-template',
        handleCardClick,
        SubmitDeleting,
        handleLikeCard).generateCard(userID)

    return cardElement
}

function handleCardClick(event) {
    popupImage.open(event.target.src, event.target.alt)
}

function handleDeleteCard(element, id) {

    return mestoApi.deleteCard(id).then(() => {
        element.remove()
    })
}

// открывает форму подтверждения удаления карточки
function SubmitDeleting(element, id) {
    popupSumbitDeleting.open(element, id)
}

function handleLikeCard(liked, id) {
    if (!liked)
        return mestoApi.likeCard(id)
    return mestoApi.dislikeCard(id)
}

function openProfilePopup() {
    const { name, descr } = userInfo.getUserInfo()
    nameInput.value = name
    descriptionInput.value = descr
    validatorProfile.resetValidation()
    popupProfile.open()
}

function openCardPopup() {
    validatorCard.resetValidation()
    popupCard.open()
}

function openAvatarEditPopup() {
    validatorAvatar.resetValidation()
    popupAvatarEdit.open()
}

function handleSubmitButtonEditProfile(event) {
    event.preventDefault()

    return mestoApi.updateUserInfo({
        name: nameInput.value,
        about: descriptionInput.value
    }).then((data) => {
        userInfo.setUserInfo({ name: data.name, descr: data.about })
    })

}

function handleSubmitButtonCardForm(event) {
    event.preventDefault()

    return mestoApi.addCard({ name: cardNameInput.value, link: linkInput.value }).then((card) => {
        if (cardSection)
            cardSection.setItem(card)
    })
}

function handleSubmitButtonAvatarEdit(event) {
    event.preventDefault()

    return mestoApi.updateUserAvatar({ avatar: avatarLinkInput.value }).then(response => {
        userInfo.setUserAvatar(response.avatar);
    })
}

const validatorProfile = new FormValidator(validatorConfig, popupProfileForm)
validatorProfile.enableValidation()

const validatorCard = new FormValidator(validatorConfig, popupCardForm)
validatorCard.enableValidation()

const validatorAvatar = new FormValidator(validatorConfig, popupAvatar)
validatorAvatar.enableValidation()

// устанавливаем обработчики событий на кнопки
profileEditButton.addEventListener('click', openProfilePopup)
cardAddButton.addEventListener('click', openCardPopup)
profileEditAvatarButton.addEventListener('click', openAvatarEditPopup)