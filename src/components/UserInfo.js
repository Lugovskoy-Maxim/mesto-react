export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return userInfo;
  }

  setUserAvatar(data) {
    this._avatar.src = data;
  }

  setUserInfo(res) {
    this._name.textContent = res.name;
    this._about.textContent = res.about;
  }
}