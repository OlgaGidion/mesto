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
      .then(({ _id, name, about, avatar }) => {
        userInfo.setUserInfo(_id, name, about, avatar);
        avatarPopup.close();
      });
  }
});
avatarPopup.setEventListeners();

const editPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: ({ name, about }) => {
    api.updateUserInfo(name, about)
      .then(({ _id, name, about, avatar }) => {
        userInfo.setUserInfo(_id, name, about, avatar);
        editPopup.close();
      });
  }
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: ({ name, imageLink }) => {
    api.addCard(name, imageLink)
      .then((card) => {
          cardsSection.addItem(card);
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

const cardDeleteHandler = (element, cardId) => {
  deletePopup.open(() => {
    api.deleteCard(cardId)
      .then(() => {
        element.remove();
      });
  });
};

const cardsSection = new Section({
  renderer: ({ _id, name, link, likes, owner }) => {
    const myId = userInfo.getUserInfo().id;
    const isMyCard = owner._id === myId;
    const isLiked = likes.some((user) => myId === user._id);

    const card = new Card(_id, name, link, likes.length, isLiked, '#element-template', isMyCard, cardClickHandler, cardDeleteHandler);

    return card.getElement();
  }
}, '.elements__list');

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
  .then(({ _id, name, about, avatar }) => {
    userInfo.setUserInfo(_id, name, about, avatar);
  })
  .catch(error => {
    console.log('ERROR: ' + error); // TODO
  });

api.getCards()
  .then((cards) => {
    cards.reverse().forEach((card) => {
      cardsSection.addItem(card);
    });
  });