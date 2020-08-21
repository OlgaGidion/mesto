class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    const element = this._renderer(item);
    this._container.prepend(element);
  }
}

export default Section;