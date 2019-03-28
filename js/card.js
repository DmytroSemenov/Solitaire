class Card {
  constructor({ suitIndex, signIndex }) {
    this._element = document.createElement('div');

    this._suit = SUITS[suitIndex];
    this._isRed = RED_SUITS.includes(this._suit);

    this._sign = AVAILABLE_SIGNS[signIndex];
    this._value = signIndex;

    this.isOpen = false;

    this._render();

    const myEvent = new CustomEvent('cardSelected', {
      detail: this,
      bubbles: true
    });

    this._element.addEventListener('mousedown', event => {
      this._element.dispatchEvent(myEvent);

      event.isCardClickHandled = true;
    });
  }

  getElement() {
    return this._element;
  }

  getSign() {
    return this._sign;
  }

  setIndex(index) {
    this._element.style.marginTop = `${VISUAL_CARD_SHIFT * index}px`;
  }

  setShiftRight(index) {
    this._element.style.marginLeft = `${VISUAL_CARD_SHIFT * index}px`;
  }

  open() {
    this.isOpen = true;
    this._element.classList.remove('card--closed');
  }

  close() {
    this.isOpen = false;
    this._element.classList.add('card--closed');
  }

  toggleSelecteion(isSelected) {
    this._element.classList.toggle('card--pressed', isSelected);
  }

  _render() {
    const classes = ['card'];
    classes.push(this._isRed ? 'card__red' : 'card__black');
    if (!this.isOpen) {
      classes.push('card--closed');
    }
    this._element.innerHTML = `${this._sign} ${this._suit}`;
    this._element.className = classes.join(' ');
  }
}
