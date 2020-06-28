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
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.button_type_close');
const popupNameInput = popup.querySelector('.popup__input-name');
const popupDescriptionInput = popup.querySelector('.popup__input-description');
const popupForm = popup.querySelector('.popup__form');
const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template');

initialCards
  .map(data => {
    const element = elementTemplate.content.cloneNode(true);
    const image = element.querySelector('.elements__image');
    const title = element.querySelector('.elements__title');

    image.setAttribute('src', data.link);
    title.textContent = data.name;

    return element;
  })
  .forEach(element => elementsList.append(element));

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