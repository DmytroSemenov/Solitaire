'use strict';

class Game {
  constructor() {
    this._onCardSelected = this._onCardSelected.bind(this);

    this.start();
  }

  start() {
    this.selectedCards = [];
    this.selectedStack = null;

    const cards = this._getCards();

    for (let i = 1; i <= NUMBER_OF_WORKING_STACKS; i++) {
      new WorkingStack({
        element: document.querySelector(`[data-stack="num_${i}"]`),
        cards: cards.splice(0, i),
        onCardSelected: this._onCardSelected
      });
    }

    for (let i = 1; i <= SUITS.length; i++) {
      new FinalStack({
        element: document.querySelector(`[data-stack="final_${i}"]`),
        onCardSelected: this._onCardSelected,
      });
    }

    const left = new BaseStack({
      element: document.querySelector('[data-stack="base"]'),
      cards: cards,

      onCardSelected: (cards) => {
        if (left.getCards().length > 0) {
          left.removeCards(cards);
          cards.forEach(card => card.open());
          right.addCards(cards);
        } else {
          const rightCards = right.getCards();
          right.removeCards(rightCards);
          rightCards.forEach(card => card.close());
          rightCards.reverse();
          left.addCards(rightCards);
        }
      },
    });

    const right = new BaseStack({
      element: document.querySelector('[data-stack="baseR"]'),
      onCardSelected: this._onCardSelected,
    });
  }

  _onCardSelected(cards, stack) {
    // 1st click
    if (!this.selectedStack) {
      this.selectedCards = cards;
      this.selectedStack = stack;
      stack.select(cards);

      return;
    }

    // 2nd click
    this.selectedStack.unselect();

    if (!stack.canAccept(this.selectedCards)) {
      this.selectedCards = cards;
      this.selectedStack = stack;
      stack.select(cards);

      return;
    }

    this.selectedStack.removeCards(this.selectedCards);
    stack.addCards(this.selectedCards);

    this.selectedCards = [];
    this.selectedStack = null;
  }

  _getCards() {
    const baseDeck = [];

    for (let suitIndex = 0; suitIndex < SUITS.length; suitIndex++) {
      for (let signIndex = 0; signIndex < AVAILABLE_SIGNS.length; signIndex++) {
        baseDeck.push(
          new Card({ suitIndex, signIndex })
        );
      }
    }

    // let i = baseDeck.length - 1;
    // const cards = [];
    // while (i >= 0) {
    //   let index = Math.round(Math.random() * i);
    //   cards.push(baseDeck.splice(index, 1)[0]);
    //   i--;
    // }

    return baseDeck.sort((a, b) => Math.random() - 0.5);
  }
}

new Game();
