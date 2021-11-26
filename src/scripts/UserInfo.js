export default class UserInfo {
    constructor(titleSelector, subTitleSelector) {
        this._title = document.querySelector(titleSelector)
        this._subtitle = document.querySelector(subTitleSelector)
    }

    getUserInfo() {
        return { name: this._title.textContent, descr: this._subtitle.textContent }
    }

    setUserInfo({ name, descr }) {
        this._title.textContent = name
        this._subtitle.textContent = descr
    }

}