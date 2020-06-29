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

const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template');

initialCards
  .map(data => createElement(data.name, data.link))
  .forEach(element => elementsList.append(element));

function createElement(name, link) {
  const element = elementTemplate.content.cloneNode(true);
  const image = element.querySelector('.elements__image');
  const title = element.querySelector('.elements__title');

  image.setAttribute('src', link);
  title.textContent = name;

  return element;
}

function openEditPopup() {
  editPopup.classList.add('popup_opened');
}

function closeEditPopup() {
  editPopup.classList.remove('popup_opened');
}

function openAddPopup() {
  addPopup.classList.add('popup_opened');
}

function closeAddPopup() {
  addPopup.classList.remove('popup_opened');
}

function editButtonClickHandler() {
  editPopupNameInput.value = profileTitle.textContent;
  editPopupDescriptionInput.value = profileText.textContent;

  openEditPopup();
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

  const newElement = createElement(name, link);
  elementsList.prepend(newElement);

  closeAddPopup();
}

editButton.addEventListener('click', editButtonClickHandler);
addButton.addEventListener('click', openAddPopup);
editPopupCloseButton.addEventListener('click', closeEditPopup);
editPopupForm.addEventListener('submit', editPopupFormSubmitHandler);
addPopupCloseButton.addEventListener('click', closeAddPopup);
addPopupForm.addEventListener('submit', addPopupFormSubmitHandler);