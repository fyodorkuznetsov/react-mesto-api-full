class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._baseHeaders = options.headers;
  }

  getUserInfo() {
    return fetch(
      `${this._baseUrl}/users/me`,
      {
        method: 'GET',
        headers: this._baseHeaders
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка при получении информации о пользователе: ${res.status} ${res.statusText}`);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,
      {
        method: 'GET',
        headers: this._baseHeaders
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка при получении карточек: ${res.status} ${res.statusText}`);
      });
  }

  updateUserProfile({ name, about }) {
    return fetch(
      `${this._baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this._baseHeaders,
        body: JSON.stringify({
          name,
          about
        })
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка обновления профиля пользователя: ${res.status} ${res.statusText}`);
      }
      );
  }

  updateUserAvatar(avatar) {
    return fetch(
      `${this._baseUrl}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this._baseHeaders,
        body: JSON.stringify({
          avatar
        })
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка обновления аватара пользователя: ${res.status} ${res.statusText}`);
      }
      );
  }

  addNewCard({ name, link }) {
    return fetch(
      `${this._baseUrl}/cards`,
      {
        method: 'POST',
        headers: this._baseHeaders,
        body: JSON.stringify({
          name,
          link
        })
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка добавления новой карточки: ${res.status} ${res.statusText}`);
      }
      );
  }

  removeCard(cardId) {
    return fetch(
      `${this._baseUrl}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: this._baseHeaders
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка удаления карточки: ${res.status} ${res.statusText}`);
      }
      );
  }

  likeAction(cardId, isLiked) {
    const type = isLiked ? 'DELETE' : 'PUT';
    return fetch(
      `${this._baseUrl}/cards/likes/${cardId}`,
      {
        method: type,
        headers: this._baseHeaders
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка при постановке лайка: ${res.status} ${res.statusText}`);
      }
      );
  }
}

export default Api;
