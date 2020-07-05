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
const editPopupCloseButton = editPopup.querySelector('.button_type_close');
const editPopupNameInput = editPopup.querySelector('.popup__input-name');
const editPopupDescriptionInput = editPopup.querySelector('.popup__input-description');
const editPopupForm = editPopup.querySelector('.popup__form');

const addPopup = document.querySelector('.popup_type_add');
const addPopupCloseButton = addPopup.querySelector('.button_type_close');
const addPopupNameInput = addPopup.querySelector('.popup__input-name');
const addPopupDescriptionInput = addPopup.querySelector('.popup__input-description');
const addPopupForm = addPopup.querySelector('.popup__form');

const imagePopup = document.querySelector('.image-popup');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupCaption = imagePopup.querySelector('.image-popup__caption');
const imagePopupCloseButton = imagePopup.querySelector('.button_type_close');

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

  editPopup.classList.add('popup_opened');
}

function closeEditPopup() {
  editPopup.classList.remove('popup_opened');
}

function openAddPopup() {
  addPopupNameInput.value = '';
  addPopupDescriptionInput.value = '';

  addPopup.classList.add('popup_opened');
}

function closeAddPopup() {
  addPopup.classList.remove('popup_opened');
}

function openImagePopup(name, link) {
  imagePopupCaption.textContent = name;
  imagePopupImage.setAttribute('src', link);

  imagePopup.classList.add('popup_opened');
}

function closeImagePopup() {
  imagePopup.classList.remove('popup_opened');
}

function editPopupFormSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = editPopupNameInput.value;
  profileText.textContent = editPopupDescriptionInput.value;

  closeEditPopup();
}

function addPopupFormSubmitHandler(evt) {
  evt.preventDefault();

  const name = addPopupNameInput.value;
  const link = addPopupDescriptionInput.value;
  const isValid = name !== '' && link !== '';

  if (isValid) {
    const newElement = createElement(name, link);
    elementsList.prepend(newElement);

    closeAddPopup();
  } else {
    alert('Name and link must be filled in.');
  }
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

initialCards
  .map(data => createElement(data.name, data.link))
  .forEach(element => elementsList.append(element));

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);

editPopupCloseButton.addEventListener('click', closeEditPopup);
editPopupForm.addEventListener('submit', editPopupFormSubmitHandler);

addPopupCloseButton.addEventListener('click', closeAddPopup);
addPopupForm.addEventListener('submit', addPopupFormSubmitHandler);

imagePopupCloseButton.addEventListener('click', closeImagePopup);