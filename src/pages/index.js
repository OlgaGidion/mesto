import '../pages/index.css';
import { initialCards, validationSettings, editButton, addButton } from '../utils/constants.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';

const userInfo = new UserInfo('.profile__title', '.profile__text');

const editPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: ({ name, about }) => {
    userInfo.setUserInfo(name, about);
  }
}, validationSettings);
editPopup.setEventListeners();

const editPopupForm = document.querySelector('.popup_type_edit').querySelector('.popup__form');
const editPopupValidator = new FormValidator(validationSettings, editPopupForm);

const addPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: ({ name, imageLink }) => {
    const newCard = createCard(name, imageLink);
    cardsSection.setItem(newCard);
  }
}, validationSettings);
addPopup.setEventListeners();

const addPopupForm = document.querySelector('.popup_type_add').querySelector('.popup__form');
const addPopupValidator = new FormValidator(validationSettings, addPopupForm);

const imagePopup = new PopupWithImage('.image-popup');
imagePopup.setEventListeners();

const createCard = (name, imageLink) => {
  const card = new Card(name, imageLink, '#element-template', (name, imageLink) => {
    imagePopup.open(name, imageLink);
  });

  return card.getElement();
};

const cardsSection = new Section({
  data: initialCards,
  renderer: ({ name, link }) => {
    cardsSection.setItem(createCard(name, link));
  }
}, '.elements__list');
cardsSection.renderItems();

editButton.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  editPopup.open({ name, about });
  editPopupValidator.validate();
});

addButton.addEventListener('click', () => {
  addPopup.open({ name: '', imageLink: '' });
  addPopupValidator.validate();
});