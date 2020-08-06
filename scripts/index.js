import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './initial-cards.js';
import PopupWithImage from './PopupWithImage.js';

const validationSettings = {
  inputTextSelector: '.input-text',
  buttonSubmitSelector: '.button_type_submit',
  inputTextErrorClass: 'input-text_error',
  inputErrorHiddenClass: 'popup__input-error_hidden'
};

const profileTitle = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');
const editButton = document.querySelector('.button_type_edit');
const addButton = document.querySelector('.button_type_add');
const elementsList = document.querySelector('.elements__list');

const editPopup = document.querySelector('.popup_type_edit');
const editPopupOverlay = editPopup.querySelector('.popup__overlay');
const editPopupCloseButton = editPopup.querySelector('.button_type_close');
const editPopupNameInput = editPopup.querySelector('.popup__input-name');
const editPopupDescriptionInput = editPopup.querySelector('.popup__input-description');
const editPopupForm = editPopup.querySelector('.popup__form');
const editPopupFormValidator = new FormValidator(validationSettings, editPopupForm);

const addPopup = document.querySelector('.popup_type_add');
const addPopupOverlay = addPopup.querySelector('.popup__overlay');
const addPopupCloseButton = addPopup.querySelector('.button_type_close');
const addPopupNameInput = addPopup.querySelector('.popup__input-name');
const addPopupDescriptionInput = addPopup.querySelector('.popup__input-description');
const addPopupForm = addPopup.querySelector('.popup__form');
const addPopupFormValidator = new FormValidator(validationSettings, addPopupForm);

const imagePopup = new PopupWithImage('.image-popup');

const isClosePopupKey = (key) => key === 'Escape';

const createCard = (name, imageLink) => {
  const card = new Card(name, imageLink, '#element-template', (name, imageLink) => {
    imagePopup.open(name, imageLink);
  });
  return card.getElement();
}

const openEditPopup = () => {
  editPopupNameInput.value = profileTitle.textContent;
  editPopupDescriptionInput.value = profileText.textContent;

  editPopupFormValidator.validate();
  openPopup(editPopup);
}

const openAddPopup = () => {
  addPopupNameInput.value = '';
  addPopupDescriptionInput.value = '';

  addPopupFormValidator.validate();
  openPopup(addPopup);
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', popupKeydownHandler);
}

const closePopup = () => {
  const popup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', popupKeydownHandler);
}

const editPopupFormSubmitHandler = () => {
  profileTitle.textContent = editPopupNameInput.value;
  profileText.textContent = editPopupDescriptionInput.value;

  closePopup();
}

const addPopupFormSubmitHandler = () => {
  const name = addPopupNameInput.value;
  const link = addPopupDescriptionInput.value;

  const newElement = createCard(name, link);
  elementsList.prepend(newElement);

  closePopup();
}

const popupKeydownHandler = (evt) => {
  if (isClosePopupKey(evt.key)) {
    closePopup();
  }
}

initialCards
  .map((data) => createCard(data.name, data.link))
  .forEach((element) => elementsList.append(element));

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);

editPopupOverlay.addEventListener('click', closePopup);
editPopupCloseButton.addEventListener('click', closePopup);
editPopupForm.addEventListener('submit', editPopupFormSubmitHandler);

addPopupOverlay.addEventListener('click', closePopup);
addPopupCloseButton.addEventListener('click', closePopup);
addPopupForm.addEventListener('submit', addPopupFormSubmitHandler);

addPopupFormValidator.enableValidation();
editPopupFormValidator.enableValidation();