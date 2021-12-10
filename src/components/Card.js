export class Card {
    constructor(data, cardSelector, handleCardClick, handleCardDelete, handleLike) {
        this._name = data.name;
        this._image = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._ownerId = data.owner._id;

        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleLike = handleLike;

        this._deleteClickHandle = this._deleteClickHandle.bind(this);
        this._likeClickHandle = this._likeClickHandle.bind(this);
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
        this._handleLike(event.target.classList.contains('element__like_active'), this._id)
            .then(response => {
                event.target.classList.toggle('element__like_active')
                this._likesCount.textContent = response.likes.length
            }).catch(error => error)
    }

    _deleteClickHandle(event) {
        this._handleCardDelete(this._element, this._id)
    }


    _setEventListeners() {
        this._likeButton.addEventListener('click', this._likeClickHandle)
        this._deleteButton.addEventListener('click', this._deleteClickHandle)
        this._element.querySelector('.element__image').addEventListener('click', this._handleCardClick)
    }

    /**
     * @param {*} userID - ID текущего пользователя
     * 
     * @returns возвращает DOM-элемент готовый объект карточки
     */
    generateCard(userID) {
        this._element = this._getTemplate();

        this._likesCount = this._element.querySelector('.element__like-count')
        this._likesCount.textContent = this._likes.length

        this._likeButton = this._element.querySelector('.element__like')
        this._deleteButton = this._element.querySelector('.element__delete')

        // если в списке лайков есть лайк с айдишником текущего пользователя то закрашивем кнопку лайка
        if (this._likes && this._likes.some(like => like._id == userID))
            this._likeButton.classList.add('element__like_active');

        // если ID текущего пользователя совпадает с ID владельца карточки то скрываем возможность удаления карточки 
        if (this._ownerId !== userID)
            this._deleteButton.classList.classList.add('element__delete_hidden');

        const image = this._element.querySelector('.element__image')
        image.src = this._image;
        image.alt = this._name;
        this._element.querySelector('.element__name').textContent = this._name;
        this._setEventListeners()

        return this._element;
    }

}