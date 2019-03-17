'use strict';

const cardSettings = {
  suits: ['♠', '♣', '♦', '♥'],
  signs: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
};
const stackNames = [
  'stackBase',
  'stack.num_1',
  'stack.num_2',
  'stack.num_3',
  'stack.num_4',
  'stack.num_5',
  'stack.num_6',
  'stack.num_7',
  'stack.final_1',
  'stack.final_2',
  'stack.final_3',
  'stack.final_4',
  'stackBaseR'
];
const stack = {};
let optionsForMove = {};

class Game {
  constructor() {
    const cards = this._getCards();

    stack.base = new Placeholder({
      element: document.querySelector('[data-stack="base"]'),
      cards: cards.splice(0, 24),
      isShifted: false,
      isBase: true,
      onCardSelected: cardsSelected => {}
    });
    stack.base.getElement().addEventListener('click', this.handler);

    stack.baseR = new Placeholder({
      element: document.querySelector('[data-stack="baseR"]'),
      cards: [],
      isShifted: false,
      onCardSelected: cardsSelected => {}
    });
    stack.baseR.getElement().addEventListener('click', this.handler);

    for (let i = 1; i < 8; i++) {
      stack['num_' + i] = new Placeholder({
        element: document.querySelector(`[data-stack="num_${i}"]`),
        cards: cards.splice(0, i),
        isShifted: true
      });
      stack['num_' + i].getElement().addEventListener('click', this.handler);
    }

    for (let i = 1; i < 5; i++) {
      stack['final_' + i] = new Placeholder({
        element: document.querySelector(`[data-stack="final_${i}"]`),
        cards: [],
        isShifted: false
      });
      stack['final_' + i].getElement().addEventListener('click', this.handler);
    }

    optionsForMove = {
      cardPressed: false,
      cardPressedElement: null,
      deckFrom: stack.num_4,
      deckTo: stack.num_1,
      cardsToMove: 1,
      cardForMoving: {},
      cardForPlacing: {},

      move: this._moveCards
    };
  } //// end of constructor Game

  handler(event) {
    //////////////////////////////////////MUST BE ADDED restrict moving king to upper decks  
    function canImove() {
      // console.log(optionsForMove);
      if (!optionsForMove.deckTo._isShifted) {
        // for 4 finish decks  && optionsForMove.cardsToMove == 1

        if (
          optionsForMove.deckTo._stack.length == 0 &&
          optionsForMove.cardForMoving._value == 1
        )
          return true;
        if (
          optionsForMove.cardForMoving._suit ==
            optionsForMove.cardForPlacing._suit &&
          optionsForMove.cardForMoving._value ==
            optionsForMove.cardForPlacing._value + 1
        )
          return true;
      }

      if (
        optionsForMove.deckTo._stack.length == 0 &&
        optionsForMove.deckTo._isShifted === true &&
        optionsForMove.cardForMoving._value == 13
      )
        return true;
      ////THE MAIN RULE
      if (
        optionsForMove.cardForPlacing._value - 1 ==
          optionsForMove.cardForMoving._value &&
        optionsForMove.cardForPlacing._isRed !==
          optionsForMove.cardForMoving._isRed
      )
        return true;

      return false;
    }
    /////////////////////////////////////////////////////////////////////////
    if (this.dataset.stack == 'base') {
      if (stack.base._stack.length == 0) {
        for (let i = 0; i < stack.baseR._stack.length; i++){
          stack.baseR._stack[i].close();
        }
        optionsForMove.deckFrom = stack.baseR;
        optionsForMove.deckTo = stack.base;
        optionsForMove.cardsToMove = 0;
       
      } else {
        optionsForMove.deckFrom = stack.base;
        optionsForMove.deckTo = stack.baseR;
        optionsForMove.cardsToMove = stack.base._stack.length - 1;
      }
      optionsForMove.move(optionsForMove);
      return;
    }

    if (event.target.className.includes('back')) return;

    if (!optionsForMove.cardPressed) {
      if (!stack[this.dataset.stack]._stack.length) return;

      optionsForMove.deckFrom = stack[this.dataset.stack];
      optionsForMove.cardPressed = true;
      optionsForMove.cardPressedElement = event.target;

      let flag = false;
      for (let i = 0; i < stack[this.dataset.stack]._stack.length; i++) {
        if (stack[this.dataset.stack]._stack[i].getElement() === event.target) {
          optionsForMove.cardsToMove = i;
          optionsForMove.cardForMoving = stack[this.dataset.stack]._stack[i];
          flag = true;
        }
        if (flag)
          stack[this.dataset.stack]._stack[i]
            .getElement()
            .classList.add('card__pressed');
      }

      return;
    }

    optionsForMove.deckTo = stack[this.dataset.stack];
    optionsForMove.cardForPlacing =
      stack[this.dataset.stack]._stack[
        stack[this.dataset.stack]._stack.length - 1
      ];
    optionsForMove.cardPressed = false;
    for (
      let i = optionsForMove.cardsToMove;
      i < optionsForMove.deckFrom._stack.length;
      i++
    ) {
      optionsForMove.deckFrom._stack[i]
        .getElement()
        .classList.remove('card__pressed');
    }

    if (canImove()) optionsForMove.move(optionsForMove);
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
    let movingCards = movingOptions.deckFrom._stack.splice(
      optionsForMove.cardsToMove
    );
    movingOptions.deckTo._stack.push(...movingCards);
    movingOptions.deckFrom._render();
    movingOptions.deckTo._render();
  }
}

new Game();
