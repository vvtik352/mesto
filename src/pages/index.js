import './../pages/index.css'
import { BASE_URL, MY_COHORT, TOKEN, validatorConfig } from '../utils/constants'
import { FormValidator } from "../components/FormValidator.js"
import { Card } from "../components/Card.js"
import PopupWithImage from '../components/PopupWithImage'
import PopupWithForm from '../components/PopupWithForm'

import UserInfo from '../components/UserInfo'
import Api from '../components/Api'
import PopupSubmit from '../components/PopupSubmit'
import Section from '../components/Section'


// получаем доступ к основым элементам управления на странице 
const profileEditButton = document.querySelector('.profile__edit-button')
const cardAddButton = document.querySelector('.profile__add-button')
const profileEditAvatarButton = document.querySelector('.profile__avatar-edit')

const popupProfileForm = document.querySelector('#popup_profile-info')
const descriptionInput = document.querySelector('#input-description')
const nameInput = document.querySelector('#input-name')

const popupCardForm = document.querySelector('#popup_card-info')
const popupAvatar = document.querySelector('#popup_avatar-edit');

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

Promise.all([mestoApi.getUserInfo(), mestoApi.getCards()]).then(([user, cards]) => {
    currentUserID = user._id
    userInfo.setUserInfo({ name: user.name, descr: user.about })
    userInfo.setUserAvatar(user.avatar)

    cardSection = new Section({ data: cards, renderer: createCard }, '.elements')
    cardSection.renderItems()
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

    return mestoApi.deleteCard(id)
        .then(() => {
            element.remove()
        })
        .then(() => { popupSumbitDeleting.close() })
        .catch(error => console.error(`Ошибка: ${error}`))
}

// открывает форму подтверждения удаления карточки
function SubmitDeleting(element, id) {
    popupSumbitDeleting.open(element, id)
}

function handleLikeCard(liked, id) {
    if (!liked)
        return mestoApi.likeCard(id)
    return mestoApi.dislikeCard(id).catch(error => console.error(error))
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

function handleSubmitButtonEditProfile(event, values) {
    event.preventDefault()
    popupProfile.setIsProcessing(true)

    return mestoApi.updateUserInfo({
        name: values['input-name'],
        about: values['input-description']
    })
        .then((data) => {
            userInfo.setUserInfo({ name: data.name, descr: data.about })
        })
        .then(() => { popupProfile.close() })
        .catch(error => console.error(`Ошибка: ${error}`))
        .finally(() => { popupProfile.setIsProcessing(false) })

}

function handleSubmitButtonCardForm(event, values) {
    event.preventDefault()
    popupCard.setIsProcessing(true)

    return mestoApi.addCard({ name: values['input-card__name'], link: values['input-link'] })
        .then((card) => {
            if (cardSection)
                cardSection.setItem(card)
        })
        .then(() => { popupCard.close() })
        .catch(error => console.error(`Ошибка: ${error}`))
        .finally(() => { popupCard.setIsProcessing(false) })
}

function handleSubmitButtonAvatarEdit(event, values) {
    event.preventDefault()
    popupAvatarEdit.setIsProcessing(true)

    return mestoApi.updateUserAvatar({ avatar: values['input-link-avatar'] })
        .then(response => {
            userInfo.setUserAvatar(response.avatar);
        })
        .then(() => { popupAvatarEdit.close() })
        .catch(error => console.error(`Ошибка: ${error}`))
        .finally(() => { popupAvatarEdit.setIsProcessing(false) })
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