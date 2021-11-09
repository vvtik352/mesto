export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
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
        event.target.closest('.element').remove()
    }


    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', this._likeClickHandle)
        this._element.querySelector('.element__delete').addEventListener('click', this._deleteClickHandle)

    }

    /**
     * 
     * @returns возвращает DOM-элемент готовый объект карточки
     */
    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__name').textContent = this._name;
        this._setEventListeners()

        return this._element;
    }

}