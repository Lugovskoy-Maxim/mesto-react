import React, { useCallback } from "react";
import PopupWithForm from "./PopupWithFotm";

function AddPlacePopup({ name, title, isOpened, isClosed, onAddPlace }) {
  const [saveBtnTitle, setSaveBtnTitle] = React.useState("Создать");
  const [titleCard, setTitleCard] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setSaveBtnTitle("Сохранение...");
    onAddPlace(link, titleCard)
      .then(() => {
        setLink("");
        setTitleCard("");
      })
      .finally(() => {
        setSaveBtnTitle("Создать");
      });
  }

  const cbChangetitle = useCallback((event) => {
    setTitleCard(event.target.value);
  }, []);

  const cbChangeLink = useCallback((event) => {
    setLink(event.target.value);
  }, []);

  return (
    <>
      <PopupWithForm
        name={name}
        title={title}
        isOpened={isOpened}
        isClosed={isClosed}
        buttonTitle={saveBtnTitle}
        handleSubmit={handleSubmit}
      >
        <label className="popup__field">
          <input
            onChange={cbChangetitle}
            value={titleCard}
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
            onChange={cbChangeLink}
            value={link}
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
      </PopupWithForm>
    </>
  );
}

export default AddPlacePopup;
