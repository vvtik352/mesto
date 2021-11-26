export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick

        this._deleteClickHandle = this._deleteClickHandle.bind(this)
    }

    /**
     * 
     * @returns возвращает сгенерированный шаблон карточки
     */
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _likeClickHandle(event) {
        event.target.classList.toggle('element__like_active')

    }

    _deleteClickHandle(event) {
        this._element.remove()
        this._element = null
    }


    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', this._likeClickHandle)
        this._element.querySelector('.element__delete').addEventListener('click', this._deleteClickHandle)
        this._element.querySelector('.element__image').addEventListener('click', this._handleCardClick)
    }

    /**
     * 
     * @returns возвращает DOM-элемент готовый объект карточки
     */
    generateCard() {
        this._element = this._getTemplate();
        const image = this._element.querySelector('.element__image')
        image.src = this._image;
        image.alt = this._name;
        this._element.querySelector('.element__name').textContent = this._name;
        this._setEventListeners()

        return this._element;
    }

}