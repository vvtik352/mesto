
// получаем доступ к основым элементам управления на странице 
const profileEditButton = document.querySelector('.profile__edit-button')
const profileName = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')

const popupProfile = document.querySelector('#popup__profile')
const popupProfileForm = document.querySelector('#popup_profile-info')
const popupProfileCloseButton = document.querySelector('#popup-profile_close')
const descriptionInput = document.querySelector('#input-description')
const nameInput = document.querySelector('#input-name')


const cardContainer = document.querySelector('.elements')

const cardAddButton = document.querySelector('.profile__add-button')


const popupCard = document.querySelector('#popup__card')
const popupCardForm = document.querySelector('#popup_card-info')
const popupCardCloseButton = document.querySelector('#popup-card_close')
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
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]


function addCard(name, link) {
    const cardTemplate = document.querySelector('#element-template').content

    const cardElement = cardTemplate.querySelector('.element').cloneNode(true)
    const cardImage = cardElement.querySelector('.element__image')
    cardImage.src = link
    cardImage.alt = name

    cardElement.querySelector('.element__like').addEventListener('click', event => {
        event.target.classList.toggle('element__like_active')
    })
    cardElement.querySelector('.element__delete').addEventListener('click', event => {
        event.target.closest('.element').remove()
    })
    cardElement.querySelector('.element__image').addEventListener('click', event => {
        popupImageSrc.src = link
        popupImageSrc.alt = name
        popupImageName.textContent = name

        openPopup(popupImage)
    })
    cardElement.querySelector('.element__name').textContent = name

    return cardElement
}

//загрузка карточек из массива
initialCards.forEach((card) => {
    const newCard = addCard(card.name, card.link)
    cardContainer.prepend(newCard)
})




function openPopup(popup) {
    popup.classList.add('popup_opened');
}


function openProfilePopup() {
    nameInput.value = profileName.textContent
    descriptionInput.value = profileSubtitle.textContent
    openPopup(popupProfile);
}

function openCardPopup() {
    openPopup(popupCard);
}


function handleCloseButton(popup) {
    popup.classList.remove('popup_opened')
}


function handleSubmitButtonEditProfile(event) {
    event.preventDefault()
    profileName.textContent = nameInput.value
    profileSubtitle.textContent = descriptionInput.value
    handleCloseButton(popupProfile)
}


function handleSubmitButtonCardForm(event) {
    event.preventDefault()
    initialCards.push({
        name: cardNameInput.value,
        link: linkInput.value
    })
    const newCard = addCard(cardNameInput.value, linkInput.value)
    cardContainer.prepend(newCard)

    handleCloseButton(popupCard)
}


// устанавливаем обработчики событий на кнопки
popupProfileForm.addEventListener('submit', handleSubmitButtonEditProfile)
profileEditButton.addEventListener('click', openProfilePopup)
popupProfileCloseButton.addEventListener('click', () => handleCloseButton(popupProfile))


popupCardForm.addEventListener('submit', handleSubmitButtonCardForm)
cardAddButton.addEventListener('click', openCardPopup)
popupCardCloseButton.addEventListener('click', () => handleCloseButton(popupCard))


popupImageCloseButton.addEventListener('click', () => handleCloseButton(popupImage))