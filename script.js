'use strict';

let editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', function() {
  let popup = document.querySelector('.popup');
  popup.style.display = 'flex';

  let popupCloseButton = popup.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', function() {
    popup.style.display = 'none';
  })
});