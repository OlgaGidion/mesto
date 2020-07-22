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

    // image.addEventListener('click', elementImageClickHandler);
    // deleteButton.addEventListener('click', elementDeleteButtonHandler);
    // likeButton.addEventListener('click', elementLikeButtonHandler);

    image.setAttribute('src', this._imageLink);
    image.setAttribute('alt', this._name);
    title.textContent = this._name;

    return element;
  }
}

export default Card;