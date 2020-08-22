class Card {
  constructor(id, name, imageLink, likeCount, isLiked, elementTemplateSelector, showDeleteButton, handleCardClick, handleCardDelete, handleLike, handleUnlike) {
    this._id = id;
    this._name = name;
    this._imageLink = imageLink;
    this._likeCount = likeCount;
    this._isLiked = isLiked;
    this._elementTemplate = document.querySelector(elementTemplateSelector);
    this._showDeleteButton = showDeleteButton;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLike = handleLike;
    this._handleUnlike = handleUnlike;
  }

  getElement() {
    const element = this._elementTemplate.content.cloneNode(true);
    const image = element.querySelector('.elements__image');
    const title = element.querySelector('.elements__title');
    const likeCount = element.querySelector('.elements__like-count');
    const deleteButton = element.querySelector('.button_type_delete');
    const likeButton = element.querySelector('.button_type_like');

    if (!this._showDeleteButton) {
      deleteButton.classList.add('button_hidden');
    }

    if (this._isLiked) {
      likeButton.classList.add('button_type_like-selected');
    }

    image.addEventListener('click', () => this._imageClickHandler());
    deleteButton.addEventListener('click', (evt) => this._deleteButtonHandler(evt));
    likeButton.addEventListener('click', (evt) => this._likeButtonHandler(evt));

    image.setAttribute('src', this._imageLink);
    image.setAttribute('alt', this._name);
    title.textContent = this._name;
    likeCount.textContent = this._likeCount;

    return element;
  }

  _imageClickHandler() {
    this._handleCardClick(this._name, this._imageLink);
  }

  _deleteButtonHandler(evt) {
    evt.preventDefault();

    const element = evt.currentTarget.closest('.elements__item');
    this._handleCardDelete(element, this._id);
  }

  _likeButtonHandler(evt) {
    evt.preventDefault();

    if (!this._isLiked) {
      this._handleLike(this._id);
    } else {
      this._handleUnlike(this._id);
    }
  }
}

export default Card;