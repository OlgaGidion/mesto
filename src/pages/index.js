import './index.css';
import { validationSettings, editButton, addButton, avatarButton, addPopupForm, editPopupForm, avatarPopupForm } from '../utils/constants.js';
import Api from '../utils/Api.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirmation from '../components/PopupConfirmation.js';
import FormValidator from '../components/FormValidator.js';

const userInfo = new UserInfo('.profile__title', '.profile__text', '.profile__avatar-image');

const avatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: ({ avatarLink }) => {
    api.updateAvatar(avatarLink)
      .then(({ name, about, avatar }) => {
        userInfo.setUserInfo(name, about, avatar);
        avatarPopup.close();
      });
  }
});
avatarPopup.setEventListeners();

const editPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: ({ name, about }) => {
    api.updateUserInfo(name, about)
      .then(({ name, about, avatar }) => {
        userInfo.setUserInfo(name, about, avatar);
        editPopup.close();
      });
  }
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: ({ name, imageLink }) => {
    api.addCard(name, imageLink)
    .then(({ name, link }) => {
        const newCard = createCard(name, link);
        cardsSection.setItem(newCard);
        addPopup.close();
      });
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
  data: [],
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

avatarButton.addEventListener('click', () => {
  const { avatarLink } = userInfo.getUserInfo();
  avatarPopup.open({ avatarLink });
  avatarPopupValidator.validate();
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  token: 'b77784c0-9ff1-452f-b582-ae1b85f02ec1'
});

api.getUserInfo()
  .then(({ name, about, avatar }) => {
    userInfo.setUserInfo(name, about, avatar);
  })
  .catch(error => {
    console.log('ERROR: ' + error); // TODO
  });

api.getCards()
  .then((cards) => {
    cards.forEach(({ name, link }) => {
      const card = createCard(name, link);
      cardsSection.setItem(card);
    });
  });