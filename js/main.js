'use strict';

const cardSettings = {
  suits: ['♠', '♣', '♦', '♥'],
  signs: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
};

// const stackNames = ['base', 'work1', 'work2', 'work3', 'work4', 'work5', 'work6', 'work7', 'fin1', 'fin2', 'fin3', 'fin4']
const stack = {};
class Game {
  constructor() {
    const cards = this._getCards();

    const stackBase = new Placeholder({
      element: document.getElementById('stack_base'),
      cards: cards.splice(0, 24),
      isShifted: false,
      onCardSelected: cardsSelected => {}
    });

    // const stackBaseDrops = new PlaceholderBase(
    //   document.getElementById('stack_base_r')
    // );

    for (let i = 1; i < 8; i++) {
      stack['num_' + i] = new Placeholder({
        element: document.getElementById(['deck_' + i]),
        cards: cards.splice(0, i),
        isShifted: true
      });
    }

    for (let i = 1; i < 5; i++) {
      stack['final_' + i] = new Placeholder({
        element: document.getElementById(['deck__final__' + i]),
        cards: [],
        isShifted: false
      });
    }

    // const game = document.querySelector('#game');
    // game.addEventListener('click', event => {
    //   console.log(event.target);
    // });
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

  handler(event) {
    this._element.children[0].classList.toggle('card__pressed');
    console.log(this);
  }
}

new Game();
