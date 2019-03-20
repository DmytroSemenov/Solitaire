'use strict';

class Game {
  constructor() {
    this._onCardSelected = this._onCardSelected.bind(this);
    this.start();
  }

  start() {
    this.selectedCards = [];
    this.selectedStack = null;
    this.finalStack = [];

    const cards = this._getCards();

    for (let i = 1; i <= NUMBER_OF_WORKING_STACKS; i++) {
      new WorkingStack({
        element: document.querySelector(`[data-stack="num_${i}"]`),
        cards: cards.splice(0, i),
        onCardSelected: this._onCardSelected
      });
    }

    for (let i = 1; i <= SUITS.length; i++) {
      this.finalStack[i] = new FinalStack({
        element: document.querySelector(`[data-stack="final_${i}"]`),
        onCardSelected: this._onCardSelected
      });
    }

    const left = new BaseStack({
      element: document.querySelector('[data-stack="base"]'),
      cards: cards,

      onCardSelected: cards => {
        right.unselect();
        if (left.getCards().length > 0) {
          if (THREE)
            cards = left
              .getCards()
              .slice(-3)
              .reverse();
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
      }
    });

    const right = new BaseStackRight({
      element: document.querySelector('[data-stack="baseR"]'),
      onCardSelected: this._onCardSelected
    });
  }

  _onCardSelected(cards, stack) {
    // 1st click
    if (!this.selectedStack) {
      if (cards.length === 0 || !cards[0].isOpen) {
        return;
      }
      if (stack.getElement().dataset.stack === 'baseR') {
        cards = cards.slice(-1);
      }
      this.selectedCards = cards;
      this.selectedStack = stack;
      stack.select(cards);

      return;
    }
    // 2nd click
    this.selectedStack.unselect();
    if (this.selectedCards[0] === cards[0]) {
      for (let i = 1; i <= SUITS.length; i++) {
        if (this.finalStack[i].canAccept(this.selectedCards)) {
          stack = this.finalStack[i];
          break;
        }
      }
    }

    if (!stack.canAccept(this.selectedCards)) {
      if (cards.length === 0 || !cards[0].isOpen) {
        return;
      }
      if (stack.getElement().dataset.stack === 'baseR') {
        cards = cards.slice(-1);
      }
      this.selectedCards = cards;
      this.selectedStack = stack;
      stack.select(cards);

      return;
    }

    this.selectedStack.removeCards(this.selectedCards);
    stack.addCards(this.selectedCards);

    this.selectedCards = [];
    this.selectedStack = null;
    this._isWin();
  }

  _getCards() {
    const baseDeck = [];

    for (let suitIndex = 0; suitIndex < SUITS.length; suitIndex++) {
      for (let signIndex = 0; signIndex < AVAILABLE_SIGNS.length; signIndex++) {
        baseDeck.push(new Card({ suitIndex, signIndex }));
      }
    }
    // let i = baseDeck.length - 1;
    // const cards = [];
    // while (i >= 0) {
    //   let index = Math.round(Math.random() * i);
    //   cards.push(baseDeck.splice(index, 1)[0]);
    //   i--;
    // }
    // return cards;

    // I like the shortest version because it's only about 2,5 times slower.
    // But if you insist,
    // I'll change it to the upper version
    return baseDeck.sort((a, b) => Math.random() - 0.5);
  }

  _isWin() {
    let counterOfKings = 0;
    for (let i = 1; i <= SUITS.length; i++) {
      let cardForAnalyze = this.finalStack[i].getCards().slice(-1);
      if (!cardForAnalyze[0]) {
        return false;
      }
      if (cardForAnalyze[0]._sign === 'K') counterOfKings++;
    }
    if (counterOfKings === 4) {
      document.querySelector('.winner').style.display = 'block';
    }
  }
}

new Game();
