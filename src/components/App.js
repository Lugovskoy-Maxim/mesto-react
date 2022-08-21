import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import { api } from "../Utils/api";
import DeleteCardPopup from "./DeleteCardPopup";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isPreviewPopupOpen, setPreviewPopupOpen] = React.useState(false);
  const [isAddPopupOpen, setAddPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({
    link: "",
    title: "",
  });
  const [deletedCardId, setDeleteCardId] = React.useState({ id: "" });

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
  const handleCardDeleteClick = (card) => {
    setDeleteCardId({ id: card._id });
    setDeleteCardPopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPopupOpen(false);
    setPreviewPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard({ link: "", title: "" });
  };

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then((data) => {
        setUserData(data[0]); //name, about, avatar, _id
        setCards(data[1]);
        setUserId(data[0]._id);
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
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

  const handleAddPlaceSubmit = (link, title) => {
    return api
      .addCard(link, title)
      .then((newCard) => {
        setCards([newCard, ...cards]); //создать копию с новым елементом массива
        setAddPopupOpen(false);
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };

  const handleEditProfileSubmit = (userName, userAbout) => {
    return api
      .setUserInfo(userName, userAbout)
      .then((user) => {
        setUserData(user);
        setEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };

  const handleEditAvatarSubmit = (data) => {
    return api
      .setUserAvatar(data)
      .then((user) => {
        setUserData(user);
        setEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  };

  const handleDeleteCardSubmit = () => {
    return api
      .deleteCard(deletedCardId.id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== deletedCardId.id));
        setDeleteCardPopupOpen(false);
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
          onCardDelete={handleCardDeleteClick}
        />
        <Footer />

        <ImagePopup
          name="photo"
          card={selectedCard}
          isOpened={isPreviewPopupOpen}
          isClosed={closeAllPopups}
        ></ImagePopup>

        <EditAvatarPopup
          name="edit-avatar"
          title="Обновить аватар"
          isOpened={isEditAvatarPopupOpen}
          isClosed={closeAllPopups}
          onEditAvatar={handleEditAvatarSubmit}
        />

        <AddPlacePopup
          name="add-card"
          title="Новое место"
          isOpened={isAddPopupOpen}
          isClosed={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditProfilePopup
          namePopup="edit-profile"
          titlePopup="Редактировать профиль"
          isOpened={isEditProfilePopupOpen}
          isClosed={closeAllPopups}
          onEditProfile={handleEditProfileSubmit}
          userData={userData}
        />

        <DeleteCardPopup
          name="remove"
          title="Вы уверены?"
          isOpened={isDeleteCardPopupOpen}
          isClosed={closeAllPopups}
          onDeletePhoto={handleDeleteCardSubmit}
        />
      </div>
    </div>
  );
}

export default App;
