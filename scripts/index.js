'use strict';

let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-button');

function editButtonClickHandler() {
  popup.classList.add('popup_opened');
}

function popupCloseButtonClickHandler() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', editButtonClickHandler);
popupCloseButton.addEventListener('click', popupCloseButtonClickHandler);

let profileTitle = document.querySelector('.profile__title');
let profileText = document.querySelector('.profile__text');

let popupNameInput = popup.querySelector('.popup__input-name');
let popupDescriptionInput = popup.querySelector('.popup__input-description');

popupNameInput.value = profileTitle.textContent;
popupDescriptionInput.value = profileText.textContent;