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