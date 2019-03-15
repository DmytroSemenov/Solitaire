'use strict';

const cardSettings = {
  suits: ['♠', '♣', '♦', '♥'],
  signs: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
};
const stackNames = ['stackBase', 'stack.num_1', 'stack.num_2', 'stack.num_3', 'stack.num_4', 'stack.num_5', 'stack.num_6', 'stack.num_7', 'stack.final_1', 'stack.final_2', 'stack.final_3', 'stack.final_4', 'stackBaseR']
const stack = {};
class Game {
  constructor() {
    const cards = this._getCards();

    let optionsForMove = {};

    stack.base = new Placeholder({
      element: document.querySelector('[data-stack="stack.base"]'),
      cards: cards.splice(0, 24),
      isShifted: false,
      isBase: true,
      onCardSelected: cardsSelected => {}
    });
    stack.base.getElement().addEventListener('click', this.handler);

    stack.baseR = new Placeholder({
      element: document.querySelector('[data-stack="stack.baseR"]'),
      cards: cards.splice(0, 0),
      isShifted: false,
      onCardSelected: cardsSelected => {}
    });
    stack.baseR.getElement().addEventListener('click', this.handler);

    for (let i = 1; i < 8; i++) {
      stack['num_' + i] = new Placeholder({
        element: document.querySelector(`[data-stack="stack.num_${i}"]`),
        cards: cards.splice(0, i),
        isShifted: true
      });
      stack['num_' + i].getElement().addEventListener('click', this.handler);
    }

    for (let i = 1; i < 5; i++) {
      stack['final_' + i] = new Placeholder({
        element: document.querySelector(`[data-stack="stack.final_${i}"]`),
        cards: [],
        isShifted: false
      });
      stack['final_' + i].getElement().addEventListener('click', this.handler);
    }

    optionsForMove = {
      deckFrom: stack.num_4,
      deckTo: stack.num_1,
      cardsFrom: 1,
    };
    this._moveCards(optionsForMove);

  }

  handler(event) {
    console.log(this);
    console.log(event.target);
  }

  _getCards() {
    const baseDeck = [];

    for (let i = 0; i < cardSettings.suits.length; i++) {
      let value = 1;
      for (let cardValue of cardSettings.signs) {
        let cardCreate = new Card({
          value,
          cardValue,
          suit: cardSettings.suits[i],
          isRed: i > 1
        });
        baseDeck.push(cardCreate);
        value++;
      }
    }
    // let i = baseDeck.length - 1;
    // while (i >= 0) {
    //   let index = Math.round(Math.random() * i);
    //   cards.push(baseDeck.splice(index, 1)[0]);
    //   i--;
    // }
    return baseDeck.sort((a, b) => Math.random() - 0.5);
  }

  _moveCards(movingOptions) {
    let movingCards = movingOptions.deckFrom._stack.splice(-1);
    movingOptions.deckTo._stack.push(...movingCards);
    movingOptions.deckFrom._render();
    movingOptions.deckTo._render();
  }
}

new Game();
