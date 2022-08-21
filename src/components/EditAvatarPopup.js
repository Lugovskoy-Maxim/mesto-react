import  { useCallback, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithFotm";

function EditAvatarPopup({ name, title, isOpened, isClosed, onEditAvatar, isOpen}) {
  const [saveBtnTitle, setSaveBtnTitle] = useState("Сохранить");
  const [value, setValue] = useState("");

useEffect(() => {
  setValue("");
}, [isOpen])


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
  );
}

export default EditAvatarPopup;
