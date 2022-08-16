import React from "react";

function PopupWithForm({name, title, isOpened, isClosed, children}) {
  return (
    <section className={`popup popup_type_${name} ${isOpened && `popup_opened`}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form popup__form_add" name="cardForm" noValidate>
        {children}



        </form>
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть"
          onClick={isClosed}
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
