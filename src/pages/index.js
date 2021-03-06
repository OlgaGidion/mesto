import './index.css';
import { validationSettings, preloader, content, editButton, addButton, avatarButton, addPopupForm, editPopupForm, avatarPopupForm } from '../utils/constants.js';
import Api from '../utils/Api.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirmation from '../components/PopupConfirmation.js';
import FormValidator from '../components/FormValidator.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  token: 'b77784c0-9ff1-452f-b582-ae1b85f02ec1'
});

const userInfo = new UserInfo('.profile__title', '.profile__text', '.profile__avatar-image');

const avatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  submittingButtonText: 'Сохранение...',
  handleFormSubmit: ({ avatarLink }) => {
    api.updateAvatar(avatarLink)
      .then(({ _id, name, about, avatar }) => {
        userInfo.setUserInfo(_id, name, about, avatar);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
avatarPopup.setEventListeners();

const editPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  submittingButtonText: 'Сохранение...',
  handleFormSubmit: ({ name, about }) => {

    api.updateUserInfo(name, about)
      .then(({ _id, name, about, avatar }) => {
        userInfo.setUserInfo(_id, name, about, avatar);
        editPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  submittingButtonText: 'Создание...',
  handleFormSubmit: ({ name, imageLink }) => {
    api.addCard(name, imageLink)
      .then((card) => {
          cardsSection.addItem(card);
          addPopup.close();
        })
        .catch((err) => {
          console.log(err);
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
    deletePopup.close();
    element.remove();

    api.deleteCard(cardId)
      .catch((err) => {
        console.log(err);
      });
  });
};

const cardLikeHandler = (cardId) => {
  api.likeCard(cardId)
    .catch((err) => {
      console.log(err);
    });
};

const cardUnlikeHandler = (cardId) => {
  api.unlikeCard(cardId)
    .catch((err) => {
      console.log(err);
    });
};

const cardsSection = new Section({
  renderer: ({ _id, name, link, likes, owner }) => {
    const myId = userInfo.getUserInfo().id;
    const isMyCard = owner._id === myId;
    const isLiked = likes.some((user) => myId === user._id);

    const card = new Card(_id, name, link, likes.length, isLiked, '#element-template', isMyCard, cardClickHandler, cardDeleteHandler, cardLikeHandler, cardUnlikeHandler);

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

const getUserInfo = api.getUserInfo()
  .then(({ _id, name, about, avatar }) => {
    userInfo.setUserInfo(_id, name, about, avatar);
  });

const getCards = api.getCards()
  .then((cards) => {
    cards.reverse().forEach((card) => {
      cardsSection.addItem(card);
    });
  });

Promise.all([getUserInfo, getCards])
  .then(() => {
    preloader.classList.add('preloader_hidden');
    content.classList.remove('content_hidden');
  })
  .catch((err) => {
    console.log(err);
  });