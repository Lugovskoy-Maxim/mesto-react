import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithFotm";
import ImagePopup from "./ImagePopup";
import { api } from "../Utils/api";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPopupOpen, setAddPopupOpen] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({
    link: "",
    title: "",
  });
  const [isPreviewPopupOpen, setPreviewPopupOpen] = React.useState(false);
  const [userId, setUserId] = React.useState("");

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setAddPopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPopupOpen(false);
    setPreviewPopupOpen(false);
    setSelectedCard({ link: "", title: "" });
  };

  const addNewPlaceChildren = () => {
    return (
      <>
        <label className="popup__field">
          <input
            type="text"
            className="popup__input"
            placeholder="Название"
            name="title"
            id="title"
            minLength="2"
            maxLength="30"
            autoComplete="off"
            required
          />
          <span className="popup__field-error" id="title-error">
            {" "}
          </span>
        </label>
        <label className="popup__field">
          <input
            type="url"
            id="link"
            name="link"
            className="popup__input"
            placeholder="Ссылка"
            autoComplete="off"
            required
          />
          <span className="popup__field-error" id="link-error">
            {" "}
          </span>
        </label>
        <button type="submit" className="popup__save popup__save-card">
          Создать
        </button>
      </>
    );
  };

  const EditProfilePopupChildren = (name, about) => {
    return (
      <>
        <label className="popup__field">
          <input
            type="text"
            className="popup__input"
            placeholder={name}
            name="name"
            id="name"
            minLength="2"
            maxLength="30"
            autoComplete="off"
            required
          />
          <span className="popup__field-error" id="title-error">
            {" "}
          </span>
        </label>
        <label className="popup__field">
          <input
            type="text"
            id="about"
            name="about"
            className="popup__input"
            placeholder={about}
            autoComplete="off"
            required
          />
          <span className="popup__field-error" id="link-error">
            {" "}
          </span>
        </label>
        <button type="submit" className="popup__save popup__save-card">
          Сохранить
        </button>
      </>
    );
  };

  const EditAvatarPopupChildren = () => {
    return (
      <>
        <label className="popup__field">
          <input
            type="url"
            id="avatar"
            name="avatar"
            className="popup__input"
            placeholder="Ссылка на аватар"
            autoComplete="off"
            required
          />
          <span className="popup__field-error" id="link-error">
            {" "}
          </span>
        </label>
        <button type="submit" className="popup__save popup__save-avatar">
          Обновить
        </button>
      </>
    );
  };

  const getAppData = () => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then((data) => {
        setUserData(data[0]); //name, about, avatar, _id
        setCards(data[1]);
        setUserId(data[0]._id);
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };

  React.useEffect(() => {
    getAppData();
  }, [setCards]);

  const handlePreviewPopupClick = (src, alt) => {
    setSelectedCard({
      ...selectedCard,
      link: src,
      title: alt,
    });
    setPreviewPopupOpen(true);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id == userId);
    return api
      .changeStatusLikeCard(card._id, isLiked)
      .then((currentCard) => {
        setCards(
          cards.map((item) => (item._id === card._id ? currentCard : item))
        );
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };

  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main
          userData={userData}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
          onCardLike={handleCardLike}
          handlePreviewPopupClick={handlePreviewPopupClick}
        />
        <Footer />

        <ImagePopup
          name="photo"
          card={selectedCard}
          isOpened={isPreviewPopupOpen}
          isClosed={closeAllPopups}
        ></ImagePopup>

        <PopupWithForm
          name="edit-profile"
          title="Редактировать профиль"
          isOpened={isEditProfilePopupOpen}
          isClosed={closeAllPopups}
        >
          {EditProfilePopupChildren(userData.name, userData.about)}
        </PopupWithForm>

        <PopupWithForm
          name="edit-avatar"
          title="Обновить аватар"
          isOpened={isEditAvatarPopupOpen}
          isClosed={closeAllPopups}
        >
          {EditAvatarPopupChildren()}
        </PopupWithForm>

        <PopupWithForm
          name="add-card"
          title="Новое место"
          isOpened={isAddPopupOpen}
          isClosed={closeAllPopups}
        >
          {addNewPlaceChildren()}
        </PopupWithForm>

        <template className="cards-template">
          <li className="element">
            <img src="#" alt="#" className="element__image" />
            <button
              type="button"
              className="element__cards-remove"
              aria-level="Удалить"
            ></button>
            <div className="element__description">
              <h2 className="element__title"></h2>
              <div className="element__like_count">
                <button
                  type="button"
                  className="element__like"
                  aria-level="Нравиться!"
                ></button>
                <p className="element__like-counter">0</p>
              </div>
            </div>
          </li>
        </template>
      </div>
    </div>
  );
}

export default App;
