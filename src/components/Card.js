class Card {
  constructor(name, imageLink, elementTemplateSelector, showDeleteButton, handleCardClick, handleCardDelete) {
    this._name = name;
    this._imageLink = imageLink;
    this._elementTemplate = document.querySelector(elementTemplateSelector);
    this._showDeleteButton = showDeleteButton;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
  }

  getElement() {
    const element = this._elementTemplate.content.cloneNode(true);
    const image = element.querySelector('.elements__image');
    const title = element.querySelector('.elements__title');
    const deleteButton = element.querySelector('.button_type_delete');
    const likeButton = element.querySelector('.button_type_like');

    if (!this._showDeleteButton) {
      deleteButton.classList.add('button_hidden');
    }

    image.addEventListener('click', () => this._imageClickHandler());
    deleteButton.addEventListener('click', (evt) => this._deleteButtonHandler(evt));
    likeButton.addEventListener('click', this._likeButtonHandler);

    image.setAttribute('src', this._imageLink);
    image.setAttribute('alt', this._name);
    title.textContent = this._name;

    return element;
  }

  _imageClickHandler() {
    this._handleCardClick(this._name, this._imageLink);
  }

  _deleteButtonHandler(evt) {
    evt.preventDefault();

    const element = evt.currentTarget.closest('.elements__item');
    this._handleCardDelete(element);
  }

  _likeButtonHandler(evt) {
    evt.preventDefault();

    evt.currentTarget.classList.toggle('button_type_like-selected');
  }
}

export default Card;