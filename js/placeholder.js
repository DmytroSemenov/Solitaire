class Placeholder {
  constructor(options) {
    this._element = options.element;
    this._isShifted = options.isShifted;
    this._isBase = options.isBase;
    this._stack = options.cards;

    this._render();
  }

  getElement() {
    return this._element;
  }
  
  _render() {
    this._element.innerHTML = '';

    if (this._stack.length) {
      if(!this._isBase) this._stack[this._stack.length - 1].open();

      for (let i = 0; i < this._stack.length; i++) {
        let elementShifted = this._stack[i]._element;
        let marginTopY = 30 * i;
        if (this._isShifted) elementShifted.style.marginTop = marginTopY + 'px';
        this._element.appendChild(elementShifted);
      }
    }
  }

}
