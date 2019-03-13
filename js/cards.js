class CreateCard {
    constructor(color, suit, value) {
        this._color = color;
        this._suit = suit;
        this._value = value;
        this._elementCard = document.createElement('div');

        this.isOpen = false;

        this._render();
    }
    _render() {
        this._elementCard.innerHTML = `<div class="card">${ cardSettings.signs[this._value] } ${ cardSettings.suits[this._suit] }</div>`;
        if (this._color) {
            this._elementCard.classList.add('card__red');
        } else {
            this._elementCard.classList.add('card__black');
        }
    }
}