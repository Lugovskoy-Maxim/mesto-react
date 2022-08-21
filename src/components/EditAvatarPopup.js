import React, { useCallback } from "react";
import PopupWithForm from "./PopupWithFotm";

function EditAvatarPopup({ name, title, isOpened, isClosed, onEditAvatar }) {
  const [saveBtnTitle, setSaveBtnTitle] = React.useState("Сохранить");
  const [value, setValue] = React.useState("");

  const onChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setSaveBtnTitle("Сохранение...");
    onEditAvatar(value).finally(() => {
      setSaveBtnTitle("Сохранить");
    });
  }

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
            type="url"
            id="avatar"
            name="avatar"
            value={value}
            onChange={onChange}
            className="popup__input"
            placeholder="Ссылка на аватар"
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

export default EditAvatarPopup;
