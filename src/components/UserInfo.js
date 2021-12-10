export default class UserInfo {
    constructor(titleSelector, subTitleSelector, avatarSelector) {
        this._title = document.querySelector(titleSelector)
        this._subtitle = document.querySelector(subTitleSelector)
        this._avatar = document.querySelector(avatarSelector)
    }

    getUserInfo() {
        return { name: this._title.textContent, descr: this._subtitle.textContent }
    }

    setUserInfo({ name, descr }) {
        this._title.textContent = name
        this._subtitle.textContent = descr

    }

    setUserAvatar(avatarSource) {
        this._avatar.src = avatarSource
    }

}