'use strict';

let editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', function() {
  let popupContainer = document.querySelector('.popup-container');
  popupContainer.style.display = 'flex';

  let popupCloseButton = popupContainer.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', function() {
    popupContainer.style.display = 'none';
  })
});