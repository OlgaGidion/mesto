import './index.css';
import { initialCards, validationSettings, editButton, addButton, avatarImage, addPopupForm, editPopupForm, avatarPopupForm } from '../utils/constants.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirmation from '../components/PopupConfirmation.js';
import FormValidator from '../components/FormValidator.js';

const userInfo = new UserInfo('.profile__title', '.profile__text', '.profile__avatar');

const avatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: ({ avatarLink }) => {
    console.log(avatarLink);
  }
});
avatarPopup.setEventListeners();

const editPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: ({ name, about }) => {
    userInfo.setUserInfo(name, about);
  }
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: ({ name, imageLink }) => {
    const newCard = createCard(name, imageLink);
    cardsSection.setItem(newCard);
  }
});
addPopup.setEventListeners();

const deletePopup = new PopupConfirmation({
  popupSelector: '.popup_type_delete'
});
deletePopup.setEventListeners();

const imagePopup = new PopupWithImage('.image-popup');
imagePopup.setEventListeners();

const editPopupValidator = new FormValidator(validationSettings, editPopupForm);
editPopupValidator.enableValidation();

const addPopupValidator = new FormValidator(validationSettings, addPopupForm);
addPopupValidator.enableValidation();

const avatarPopupValidator = new FormValidator(validationSettings, avatarPopupForm);
avatarPopupValidator.enableValidation();

const cardClickHandler = (name, imageLink) => {
  imagePopup.open(name, imageLink);
};

const cardDeleteHandler = (element) => {
  deletePopup.open(() => {
    element.remove();
  });
};

const createCard = (name, imageLink) => {
  const card = new Card(name, imageLink, '#element-template', cardClickHandler, cardDeleteHandler);
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

avatarImage.addEventListener('click', () => {
  const { avatarLink } = userInfo.getUserInfo();
  avatarPopup.open({ avatarLink });
  avatarPopupValidator.validate();
});