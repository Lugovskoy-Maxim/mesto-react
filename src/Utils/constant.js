const profileNameEdit = document.querySelector(".profile__edit");
const popupAddButton = document.querySelector(".profile__add");
const popupRemoveCardButton = document.querySelector(".popup_type_remove");
const profileForm = document.forms.editProfileForm;
const avatarForm = document.forms.avatarForm;
const cardForm = document.forms.cardForm;
const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");
const profileEditAvatar = document.querySelector(".profile__avatar-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__caption");
const profileAvatar = document.querySelector(".profile__avatar");
const formConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__button_disable",
  inputErrorClass: "popup__field",
  errorClass: "popup__field-error",
};

export {
  avatarForm,
  profileNameEdit,
  popupAddButton,
  formConfig,
  cardForm,
  profileForm,
  nameInput,
  aboutInput,
  profileEditAvatar,
  profileName,
  profileAbout,
  profileAvatar,
  popupRemoveCardButton,
};