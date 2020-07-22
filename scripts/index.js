'use strict';

import Card from './Card.js';

const validationSettings = {
  formSelector: '.popup__form',
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

const addPopup = document.querySelector('.popup_type_add');
const addPopupOverlay = addPopup.querySelector('.popup__overlay');
const addPopupCloseButton = addPopup.querySelector('.button_type_close');
const addPopupNameInput = addPopup.querySelector('.popup__input-name');
const addPopupDescriptionInput = addPopup.querySelector('.popup__input-description');
const addPopupForm = addPopup.querySelector('.popup__form');

const imagePopup = document.querySelector('.image-popup');
const imagePopupOverlay = imagePopup.querySelector('.image-popup__overlay');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupCaption = imagePopup.querySelector('.image-popup__caption');
const imagePopupCloseButton = imagePopup.querySelector('.button_type_close');

const isClosePopupKey = (key) => key === 'Escape';

function createCard(name, imageLink) {
  const card = new Card(name, imageLink, '#element-template', openImagePopup);
  return card.getElement();
}

function openEditPopup() {
  editPopupNameInput.value = profileTitle.textContent;
  editPopupDescriptionInput.value = profileText.textContent;

  checkValidation(editPopupForm, validationSettings);

  openPopup(editPopup);
}

function openAddPopup() {
  addPopupNameInput.value = '';
  addPopupDescriptionInput.value = '';

  checkValidation(addPopupForm, validationSettings);

  openPopup(addPopup);
}

function openImagePopup(name, link) {
  imagePopupCaption.textContent = name;
  imagePopupImage.setAttribute('src', link);
  imagePopupImage.setAttribute('alt', name);

  openPopup(imagePopup);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', popupKeydownHandler);
}

function closePopup() {
  const popup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', popupKeydownHandler);
}

function editPopupFormSubmitHandler() {
  profileTitle.textContent = editPopupNameInput.value;
  profileText.textContent = editPopupDescriptionInput.value;

  closePopup();
}

function addPopupFormSubmitHandler() {
  const name = addPopupNameInput.value;
  const link = addPopupDescriptionInput.value;

  const newElement = createCard(name, link);
  elementsList.prepend(newElement);

  closePopup();
}

function elementImageClickHandler(evt) {
  const image = evt.currentTarget;
  const name = image.closest('.elements__item').querySelector('.elements__title').textContent;
  const link = image.getAttribute('src');

  openImagePopup(name, link);
}

function popupKeydownHandler(evt) {
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

imagePopupOverlay.addEventListener('click', closePopup);
imagePopupCloseButton.addEventListener('click', closePopup);

enableValidation(validationSettings);