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

    const imageElement = element.querySelector('.elements__image');
    const titleElement = element.querySelector('.elements__title');
    const deleteButton = element.querySelector('.button_type_delete');
    this._likeCountElement = element.querySelector('.elements__like-count');
    this._likeButton = element.querySelector('.button_type_like');

    if (!this._showDeleteButton) {
      deleteButton.classList.add('hidden');
    }

    imageElement.addEventListener('click', () => this._imageClickHandler());
    deleteButton.addEventListener('click', (evt) => this._deleteButtonHandler(evt));
    this._likeButton.addEventListener('click', (evt) => this._likeButtonHandler(evt));

    imageElement.setAttribute('src', this._imageLink);
    imageElement.setAttribute('alt', this._name);
    titleElement.textContent = this._name;

    this._updateLikes();

    return element;
  }

  _updateLikes() {
    this._likeCountElement.textContent = this._likeCount;

    if (this._isLiked) {
      this._likeButton.classList.add('button_type_like-selected');
    } else {
      this._likeButton.classList.remove('button_type_like-selected');
    }
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
      this._likeCount++;
      this._handleLike(this._id);
    } else {
      this._likeCount--;
      this._handleUnlike(this._id);
    }

    this._isLiked = !this._isLiked;

    this._updateLikes();
  }
}

export default Card;