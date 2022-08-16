class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    })
    .then((res) => this._checkResponse(res));
  }

  async getUserData() {
    const res = await fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async setUserInfo(data) {
    const res = await fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._checkResponse(res);
  }

  async addCard(data) {
    const res = await fetch(this._baseUrl + "/cards/", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    });
    return this._checkResponse(res);
  }

  async deleteCard(id) {
    const res= await fetch(this._baseUrl + "/cards/" + id, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  changeStatusLikeCard(id, isLiked){
    const changeStatus = isLiked ? 'deleteLikeCard' : 'setLikeCard'
    return api[changeStatus](id)
  }

  async setLikeCard(id) {
    const res = await fetch(this._baseUrl + "/cards/likes/" + id, {
      method: "PUT",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async deleteLikeCard(id) {
    const res = await fetch(this._baseUrl + "/cards/likes/" + id, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async setUserAvatar(data) {
    const res = await fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar_url,
      }),
    })
    return this._checkResponse(res);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-43",
  headers: {
    authorization: "73b17bd9-3a97-41a4-b24d-ab14544edf37",
    "Content-Type": "application/json",
  },
})