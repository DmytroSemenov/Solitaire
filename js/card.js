class Card{
  constructor(settings) {
    this._isRed = settings.isRed;
    this._suit = settings.suit;
    this._cardValue = settings.cardValue;
    this._value = settings.value;
    this._element = document.createElement('div');

    this.isOpen = false;

    this._render();

    this._element.addEventListener('click', this._handler.bind(this));
  }

  getElement() {
    return this._element;
  }

  getValue() {
    return this._value;
  }

  open() {
    this.isOpen = true;
    this._element.children[0].classList.remove('card__back');
    this._render;
  }

  _render() {
    const classes = ['card'];

    classes.push(this._isRed ? 'card__red' : 'card__black');

    if (!this.isOpen) {
      classes.push('card__back');
    }

    this._element.innerHTML = `
    <div class='${classes.join(' ')}'>
    ${this._cardValue} ${this._suit}
    </div>`;
  }
  _handler(event) {
    this._element.children[0].classList.toggle('card__pressed');
    console.log(this);
  }
}
