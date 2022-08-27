import React from "react";
import PopupWithForm from "./PopupWithFotm";

function DeleteCardPopup({ isOpened, isClosed, onDeletePhoto, card }) {
  function handleSubmit(event) {
    event.preventDefault();
    onDeletePhoto(card);
  }

  return (
    <PopupWithForm
      name="remove"
      title="Вы уверены?"
      isOpened={isOpened}
      isClosed={isClosed}
      buttonTitle="Да"
      handleSubmit={handleSubmit}
    />
  );
}
export default DeleteCardPopup;
