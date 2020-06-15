'use strict';

let profileTitle = document.querySelector('.profile__title');
let profileText = document.querySelector('.profile__text');
let editButton = document.querySelector('.button_type_edit');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.button_type_close');
let popupNameInput = popup.querySelector('.popup__input-name');
let popupDescriptionInput = popup.querySelector('.popup__input-description');
let popupForm = popup.querySelector('.popup__form');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function editButtonClickHandler() {
  popupNameInput.value = profileTitle.textContent;
  popupDescriptionInput.value = profileText.textContent;

  openPopup();
}

function popupFormSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = popupNameInput.value;
  profileText.textContent = popupDescriptionInput.value;

  closePopup();
}

editButton.addEventListener('click', editButtonClickHandler);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', popupFormSubmitHandler);