'use strict';

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profileTitle = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');
const editButton = document.querySelector('.button_type_edit');
const addButton = document.querySelector('.button_type_add');
const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template');

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

function createElement(name, link) {
  const element = elementTemplate.content.cloneNode(true);
  const image = element.querySelector('.elements__image');
  const title = element.querySelector('.elements__title');
  const deleteButton = element.querySelector('.button_type_delete');
  const likeButton = element.querySelector('.button_type_like');

  image.addEventListener('click', elementImageClickHandler);
  deleteButton.addEventListener('click', elementDeleteButtonHandler);
  likeButton.addEventListener('click', elementLikeButtonHandler);

  image.setAttribute('src', link);
  image.setAttribute('alt', name);
  title.textContent = name;

  return element;
}

function openEditPopup() {
  editPopupNameInput.value = profileTitle.textContent;
  editPopupDescriptionInput.value = profileText.textContent;

  editPopupNameInput.classList.remove('input-text_error');
  editPopupDescriptionInput.classList.remove('input-text_error');

  const editPopupNameInputError = document.querySelector(`#${editPopupNameInput.id}_error`);
  editPopupNameInputError.classList.add('popup__input-error_hidden');

  const editPopupDescriptionInputError = document.querySelector(`#${editPopupDescriptionInput.id}_error`);
  editPopupDescriptionInputError.classList.add('popup__input-error_hidden');

  const editPopupSubmitButton = editPopupForm.querySelector('.button_type_submit');
  editPopupSubmitButton.removeAttribute('disabled');

  editPopup.classList.add('popup_opened');

  editPopupOverlay.addEventListener('click', closeEditPopup);
  editPopupCloseButton.addEventListener('click', closeEditPopup);
  editPopupForm.addEventListener('submit', editPopupFormSubmitHandler);
  document.addEventListener('keydown', editPopupKeydownHandler);
}

function closeEditPopup() {
  editPopup.classList.remove('popup_opened');

  editPopupOverlay.removeEventListener('click', closeEditPopup);
  editPopupCloseButton.removeEventListener('click', closeEditPopup);
  editPopupForm.removeEventListener('submit', editPopupFormSubmitHandler);
  document.removeEventListener('keydown', editPopupKeydownHandler);
}

function openAddPopup() {
  addPopupNameInput.value = '';
  addPopupDescriptionInput.value = '';

  addPopup.classList.add('popup_opened');

  addPopupOverlay.addEventListener('click', closeAddPopup);
  addPopupCloseButton.addEventListener('click', closeAddPopup);
  addPopupForm.addEventListener('submit', addPopupFormSubmitHandler);
  document.addEventListener('keydown', addPopupKeydownHandler);
}

function closeAddPopup() {
  addPopup.classList.remove('popup_opened');

  addPopupOverlay.removeEventListener('click', closeAddPopup);
  addPopupCloseButton.removeEventListener('click', closeAddPopup);
  addPopupForm.removeEventListener('submit', addPopupFormSubmitHandler);
  document.removeEventListener('keydown', addPopupKeydownHandler);
}

function openImagePopup(name, link) {
  imagePopupCaption.textContent = name;
  imagePopupImage.setAttribute('src', link);

  imagePopup.classList.add('popup_opened');

  imagePopupOverlay.addEventListener('click', closeImagePopup);
  imagePopupCloseButton.addEventListener('click', closeImagePopup);
  document.addEventListener('keydown', imagePopupKeydownHandler);
}

function closeImagePopup() {
  imagePopup.classList.remove('popup_opened');

  imagePopupOverlay.removeEventListener('click', closeImagePopup);
  imagePopupCloseButton.removeEventListener('click', closeImagePopup);
  document.removeEventListener('keydown', imagePopupKeydownHandler);
}

function editPopupFormSubmitHandler() {
  profileTitle.textContent = editPopupNameInput.value;
  profileText.textContent = editPopupDescriptionInput.value;

  closeEditPopup();
}

function addPopupFormSubmitHandler() {
  const name = addPopupNameInput.value;
  const link = addPopupDescriptionInput.value;

  const newElement = createElement(name, link);
  elementsList.prepend(newElement);

  closeAddPopup();
}

function elementImageClickHandler(evt) {
  const image = evt.currentTarget;
  const name = image.closest('.elements__item').querySelector('.elements__title').textContent;
  const link = image.getAttribute('src');

  openImagePopup(name, link);
}

function elementDeleteButtonHandler(evt) {
  evt.preventDefault();

  const element = evt.currentTarget.closest('.elements__item');
  element.remove();
}

function elementLikeButtonHandler(evt) {
  evt.preventDefault();

  evt.currentTarget.classList.toggle('button_type_like-selected');
}

function editPopupKeydownHandler(evt) {
  if (isClosePopupKey(evt.key)) {
    closeEditPopup();
  }
}

function addPopupKeydownHandler(evt) {
  if (isClosePopupKey(evt.key)) {
    closeAddPopup();
  }
}

function imagePopupKeydownHandler(evt) {
  if (isClosePopupKey(evt.key)) {
    closeImagePopup();
  }
}

initialCards
  .map((data) => createElement(data.name, data.link))
  .forEach((element) => elementsList.append(element));

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);

enableValidation();