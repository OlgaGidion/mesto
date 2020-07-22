class Card {
  constructor(name, imageLink, elementTemplateSelector) {
    this._name = name;
    this._imageLink = imageLink;
    this._elementTemplate = document.querySelector(elementTemplateSelector);
  }

  getElement() {
    const element = this._elementTemplate.content.cloneNode(true);
    const image = element.querySelector('.elements__image');
    const title = element.querySelector('.elements__title');
    const deleteButton = element.querySelector('.button_type_delete');
    const likeButton = element.querySelector('.button_type_like');

    image.addEventListener('click', this._imageClickHandler);
    deleteButton.addEventListener('click', this._deleteButtonHandler);
    likeButton.addEventListener('click', this._likeButtonHandler);

    image.setAttribute('src', this._imageLink);
    image.setAttribute('alt', this._name);
    title.textContent = this._name;

    return element;
  }

  _imageClickHandler() {
  }

  _deleteButtonHandler(evt) {
    evt.preventDefault();

    const element = evt.currentTarget.closest('.elements__item');
    element.remove();
  }

  _likeButtonHandler(evt) {
    evt.preventDefault();

    evt.currentTarget.classList.toggle('button_type_like-selected');
  }
}

export default Card;