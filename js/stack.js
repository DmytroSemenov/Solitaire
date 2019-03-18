class Stack {
  constructor({ element, cards = [], onCardSelected }) {
    this._element = element;
    this._cards = cards;

    this._element.addEventListener('cardSelected', event => {
      const index = this._cards.indexOf(event.detail);
      const selectedCards = this._cards.slice(index);
      onCardSelected(selectedCards, this);
    });

    this._element.addEventListener('click', event => {
      if (this._cards.length > 0 || event.isCardClickHandled) {
        return;
      }

      onCardSelected([], this);
    });

    this._render();
  }

  getCards() {
    return this._cards;
  }

  addCards(cards) {
    this._cards.push(...cards);
    this._render();
  }

  removeCards(cards) {
    this._cards = this._cards.filter(card => !cards.includes(card));

    this._render();
  }

  select(cards) {
    cards.forEach(card => card.toggleSelecteion(true));
  }

  unselect() {
    this._cards.forEach(card => card.toggleSelecteion(false));
  }

  _render() {
    this._element.innerHTML = '';

    for (const card of this._cards) {
      this._element.appendChild(card.getElement());
    }
  }

  _getLastCard() {
    return this._cards[this._cards.length - 1];
  }
}

class WorkingStack extends Stack {
  canAccept(cards) {
    if (this._cards.length === 0) {
      return cards[0]._value === AVAILABLE_SIGNS.length - 1;
    }

    const lastCard = this._getLastCard();

    return (
      lastCard._value === cards[0]._value + 1 &&
      lastCard._isRed !== cards[0]._isRed
    );
  }

  _render() {
    super._render();

    for (let i = 0; i < this._cards.length; i++) {
      this._cards[i].setIndex(i);
    }

    if (this._cards.length > 0) {
      this._getLastCard().open();
    }
  }
}

class FinalStack extends Stack {
  canAccept(cards) {
    if (cards.length > 1) {
      return false;
    }

    if (this._cards.length === 0) {
      return cards[0]._value === 0;
    }

    const lastCard = this._getLastCard();

    return (
      cards[0]._suit === lastCard._suit &&
      cards[0]._value === lastCard._value + 1
    );
  }

  _render() {
    super._render();

    for (let i = 0; i < this._cards.length; i++) {
      this._cards[i].setIndex(0);
    }
  }
}

class BaseStack extends Stack {
  canAccept() {
    return false;
  }
}
