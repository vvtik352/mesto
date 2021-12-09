import Popup from './Popup.js'

export default class PopupSubmit extends Popup {
    constructor(selector, callbackSubmit) {
        super(selector);
        this._handleFormSubmit = callbackSubmit;
        this._formElement = this._popupContainer.querySelector('.popup__form');
        this._cardID = '';
        this._elementForDelete = null;
    }

    // при открытии формы закидываем в нее DOM и ID карточки которую собираемся удалить
    open(element, cardID) {
        super.open()
        this._elementForDelete = element
        this._cardID = cardID
    }

    setEventListeners() {
        super.setEventListeners()
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault()
            return this._handleFormSubmit(this._elementForDelete, this._cardID).then(() => {
                this.close();
            }).catch(error => error)
        })
    }
}