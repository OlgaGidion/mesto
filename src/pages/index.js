import initialCards from '../initial-cards.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import EditPopup from '../components/EditPopup.js';
import AddPopup from '../components/AddPopup.js';
import '../pages/index.css';

const validationSettings = {
  inputTextSelector: '.input-text',
  buttonSubmitSelector: '.button_type_submit',
  inputTextErrorClass: 'input-text_error',
  inputErrorHiddenClass: 'popup__input-error_hidden'
};

const userInfo = new UserInfo('.profile__title', '.profile__text');

const editButton = document.querySelector('.button_type_edit');
const addButton = document.querySelector('.button_type_add');

const editPopup = new EditPopup('.popup_type_edit', validationSettings, (name, about) => {
  userInfo.setUserInfo(name, about);
});

const addPopup = new AddPopup('.popup_type_add', validationSettings, (name, imageLink) => {
  const newCard = createCard(name, imageLink);
  cardsSection.addItem(newCard);
});

const imagePopup = new PopupWithImage('.image-popup');

const createCard = (name, imageLink) => {
  const card = new Card(name, imageLink, '#element-template', (name, imageLink) => {
    imagePopup.open(name, imageLink);
  });

  return card.getElement();
};

const cardsSection = new Section({
  data: initialCards,
  renderer: ({name, link}) => {
    cardsSection.setItem(createCard(name, link));
  }
}, '.elements__list');
cardsSection.renderItems();

editButton.addEventListener('click', () => {
  const {name, about} = userInfo.getUserInfo();
  editPopup.open(name, about);
});

addButton.addEventListener('click', () => {
  addPopup.open();
});