export default class Api {
    constructor(options) {
        this._url = options.url;
        this._token = options.token;
        this._cohort = options.cohort;

        this._request = this._request.bind(this)
    }

    //Приватные методы 

    // метод проверки статуса ответа от сервера
    _checkServerResponse(response) {
        if (!response.ok)
            return Promise.reject(`${response.status}`)
        return response.json()
    }

    /**
     * шаблонный метод для отправки запросов на сервер
     * @param {*} method - метод запроса GET, POST, PUT, PATCH, DELETE
     * @param {*} params - дополнительные параметры к url 
     * @param {*} body  - тело запроса(опционально)
     * @returns Promise
     */
    _request(method, params, body) {
        const requestInit = {
            method: method,
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        }
        if (body) // если запрос имеет тип PATCH или POST добавляем к нему тело
            requestInit['body'] = JSON.stringify(body)

        return fetch(`${this._url}/${this._cohort}/${params}`, requestInit).then((response) => {
            return this._checkServerResponse(response)
        })
    }

    // Публичные методы доступа к API проекта mesto 

    // Запросы по работе с информацией о пользователе 

    getUserInfo() {
        return this._request('GET', 'users/me')
    }

    // :) 
    getUsers() {
        return this._request('GET', 'users')
    }

    /**
     * 
     * @param {*} userInfo {name: '', about: ''}
     * @returns Promise
     */
    updateUserInfo(userInfo) {
        return this._request('PATCH', 'users/me', userInfo)
    }

    /**
     * 
     * @param {*} avatar - object { avatar: link }
     * @returns 
     */
    updateUserAvatar(avatar) {
        return this._request('PATCH', 'users/me/avatar', avatar)
    }

    // Запросы по работе с карточками 

    getCards() {
        return this._request('GET', 'cards')
    }

    /**
     * 
     * @param {*} card  {name, link}
     * @returns Promise
     */
    addCard(card) {
        return this._request('POST', 'cards', card)
    }


    deleteCard(cardID) {
        return this._request('DELETE', `cards/${cardID}`)
    }

    likeCard(cardID) {
        return this._request('PUT', `cards/${cardID}/likes`)
    }

    dislikeCard(cardID) {
        return this._request('DELETE', `cards/${cardID}/likes`)
    }
}