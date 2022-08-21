import React from "react";
import Card from "./Card";
import LoadingAvatar from "../Images/loading.gif";

function Main({
  userData,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  cards,
  onCardLike,
  handlePreviewPopupClick,
  onCardDelete,
}) {
  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-button"
          name="edit-avatar"
          id="edit-avatar"
          type="button"
          aria-label="Редактировать аватар"
          onClick={onEditAvatar}
        >
          <img
            src={userData.avatar || LoadingAvatar}
            alt="Аватар пользователя"
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <div className="profile__top-title">
            <h1 className="profile__name">{userData.name}</h1>
            <button
              type="button"
              className="profile__edit"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__caption">{userData.about}</p>
        </div>
        <button
          type="button"
          className="profile__add"
          aria-label="Добавить фотографию"
          onClick={onAddPlace}
        ></button>
      </section>
      <ul className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            userId={userData._id}
            onCardLike={onCardLike}
            handlePreviewPopupClick={handlePreviewPopupClick}
            key={card._id}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;
