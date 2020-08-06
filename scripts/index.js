import initialCards from './initial-cards.js';
import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';
import EditPopup from './EditPopup.js';
import AddPopup from './AddPopup.js';

const validationSettings = {
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

const editPopup = new EditPopup('.popup_type_edit', validationSettings, (name, job) => {
  profileTitle.textContent = name;
  profileText.textContent = job;
});

const addPopup = new AddPopup('.popup_type_add', validationSettings, (name, imageLink) => {
  const newElement = createCard(name, imageLink);
  elementsList.prepend(newElement);
});

const imagePopup = new PopupWithImage('.image-popup');

const createCard = (name, imageLink) => {
  const card = new Card(name, imageLink, '#element-template', (name, imageLink) => {
    imagePopup.open(name, imageLink);
  });
  return card.getElement();
}

initialCards
  .map((data) => createCard(data.name, data.link))
  .forEach((element) => elementsList.append(element));

editButton.addEventListener('click', () => {
  editPopup.open(profileTitle.textContent, profileText.textContent);
});

addButton.addEventListener('click', () => {
  addPopup.open();
});