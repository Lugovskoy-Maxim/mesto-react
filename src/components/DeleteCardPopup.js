import React from "react";
import PopupWithForm from "./PopupWithFotm";

function DeleteCardPopup({
  name,
  title,
  isOpened,
  isClosed,
  onDeletePhoto,
  card
}) {
  const [saveBtnTitle, setSaveBtnTitle] = React.useState("Да");

  function handleSubmit(event) {
    event.preventDefault();
    setSaveBtnTitle("Удаление...");
    onDeletePhoto(card).finally(() => {
      setSaveBtnTitle("Да");
    });
  }

  return (
    <PopupWithForm
      name={name}
      title={title}
      isOpened={isOpened}
      isClosed={isClosed}
      buttonTitle={saveBtnTitle}
      handleSubmit={handleSubmit}
    />
  );
}
export default DeleteCardPopup;