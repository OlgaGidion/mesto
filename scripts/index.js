import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './initial-cards.js';
import PopupWithImage from './PopupWithImage.js';
import EditPopup from './EditPopup.js';

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

const editPopup = new EditPopup('.popup_type_edit', validationSettings, (name, job) => {
  profileTitle.textContent = name;
  profileText.textContent = job;
});

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

editButton.addEventListener('click', () => {
  editPopup.open(profileTitle.textContent, profileText.textContent);
});

addButton.addEventListener('click', openAddPopup);

//editPopupForm.addEventListener('submit', editPopupFormSubmitHandler);

addPopupOverlay.addEventListener('click', closePopup);
addPopupCloseButton.addEventListener('click', closePopup);
addPopupForm.addEventListener('submit', addPopupFormSubmitHandler);

addPopupFormValidator.enableValidation();