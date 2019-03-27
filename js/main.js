'use strict';

class Game {
  constructor() {
    this._onCardSelected = this._onCardSelected.bind(this);
    this._onCardDoubleclick = this._onCardDoubleclick.bind(this);
    this._hasNextTurn = this._hasNextTurn.bind(this);

    this.start();
  }

  start() {
    this.selectedCards = [];
    this.selectedStack = null;
    this.finalStacks = [];
    this.workStacks = [];

    this.cardsFromHint = [];
    this.cardToHint = [];
    this.timerId = null;

    this.avatar = {};

    const cards = this._getCards();

    for (let i = 1; i <= NUMBER_OF_WORKING_STACKS; i++) {
      this.workStacks[i] = new WorkingStack({
        element: document.querySelector(`[data-stack="num_${i}"]`),
        cards: cards.splice(0, i),
        onCardSelected: this._onCardSelected,
        onCardDoubleclick: this._onCardDoubleclick
      });
    }

    for (let i = 1; i <= SUITS.length; i++) {
      this.finalStacks[i] = new FinalStack({
        element: document.querySelector(`[data-stack="final_${i}"]`),
        onCardSelected: this._onCardSelected,
        onCardDoubleclick: () => {}
      });
    }

    this.baseLeft = new BaseStack({
      element: document.querySelector('[data-stack="base"]'),
      cards: cards,
      isBase: true,

      onCardSelected: cards => {
        this._reSetTimeout();

        this.baseRight.unselect();
        if (this.baseLeft.getCards().length > 0) {
          if (THREE_CARDS_DEAL)
            cards = this.baseLeft
              .getCards()
              .slice(-3)
              .reverse();
          this.baseLeft.removeCards(cards);
          cards.forEach(card => card.open());
          this.baseRight.addCards(cards);
        } else {
          const rightCards = this.baseRight.getCards();
          this.baseRight.removeCards(rightCards);
          rightCards.forEach(card => card.close());
          rightCards.reverse();
          this.baseLeft.addCards(rightCards);
        }
      }
    });

    this.baseRight = new BaseStackRight({
      element: document.querySelector('[data-stack="baseR"]'),
      isBase: true,
      onCardSelected: this._onCardSelected,
      onCardDoubleclick: this._onCardDoubleclick
    });

    ///////////////////////////////////////////////

    document.querySelector('.game').addEventListener('mousedown', event => {
      this.avatar.element = document.createElement('div');
      document.querySelector('.game').append(this.avatar.element);
      this.avatar.element.className = 'avatar';
      // console.log(event.clientX);
      // console.log(event.target.offsetLeft);
      this.avatar.shiftLeft = event.clientX - event.target.offsetLeft;
      this.avatar.shiftTop = event.clientY - event.target.offsetTop;
      console.log(this.avatar.shiftLeft, this.avatar.shiftTop);
      this.avatar.element.style.left =
        event.clientX - this.avatar.shiftLeft + 'px';
      this.avatar.element.style.top =
        event.clientY - this.avatar.shiftTop + 'px';
    });

    document.querySelector('.game').addEventListener('mousemove', event => {
      if (!this.avatar.element) return;
      this.avatar.element.style.left =
        event.clientX - this.avatar.shiftLeft + 'px';
      this.avatar.element.style.top =
        event.clientY - this.avatar.shiftTop + 'px';
    });

    document.querySelector('.game').addEventListener('mouseup', event => {
      document.querySelector('.avatar').remove();
    });

    ////////////////////////////////////////////////////
  }

  _onCardSelected(cards, stack) {
    // 1st click
    this._reSetTimeout();

    if (!this.selectedStack) {
      if (cards.length === 0 || !cards[0].isOpen) {
        return;
      }

      this.selectedCards = cards;
      this.selectedStack = stack;
      stack.select(cards);

      return;
    }
    // 2nd click
    this.selectedStack.unselect();
    // double click
    // if (this.selectedCards[0] === cards[0])
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

  _onCardDoubleclick(cards, stack) {
    if (cards.length === 0) {
      return;
    }
    this.selectedCards = cards;
    this.selectedStack = stack;
    for (let i = 1; i <= SUITS.length; i++) {
      if (this.finalStacks[i].canAccept(this.selectedCards)) {
        stack = this.finalStacks[i];
        this.selectedStack.unselect();

        this.selectedStack.removeCards(this.selectedCards);
        stack.addCards(this.selectedCards);
        this.selectedCards = [];
        this.selectedStack = null;
        this._isWin();

        break;
      }
    }
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
      let cardForAnalyze = this.finalStacks[i].getCards().slice(-1);
      if (!cardForAnalyze[0]) {
        return false;
      }
      if (cardForAnalyze[0].getSign() === 'K') counterOfKings++;
    }
    if (counterOfKings === 4) {
      document.querySelector('.winner').style.display = 'block';
    }
  }

  _hasNextTurn() {
    if (this.selectedStack) {
      this.selectedStack.unselect();
    }
    if (this.baseRight.getCards().length !== 0) {
      this.cardsFromHint = this.baseRight.getCards().slice(-1);

      if (this._ifCanAcceptMark(SUITS.length, this.finalStacks)) {
        return true;
      }
      if (this._ifCanAcceptMark(NUMBER_OF_WORKING_STACKS, this.workStacks)) {
        return true;
      }
    }

    for (let i = 1; i <= NUMBER_OF_WORKING_STACKS; i++) {
      this.cardsFromHint = this.workStacks[i].getCards().slice(-1);

      if (this.cardsFromHint.length === 0) {
        continue;
      }

      if (this._ifCanAcceptMark(SUITS.length, this.finalStacks)) {
        return true;
      }
    }

    for (let i = 1; i <= NUMBER_OF_WORKING_STACKS; i++) {
      let deckTested = this.workStacks[i].getCards();
      if (deckTested.length === 0) {
        continue;
      }
      if (deckTested[0].isOpen && deckTested[0].getSign() === 'K') {
        continue;
      }

      for (let index = 0; index < deckTested.length; index++) {
        if (deckTested[index].isOpen) {
          this.cardsFromHint = deckTested.slice(index);
          break;
        }
      }

      if (this._ifCanAcceptMark(NUMBER_OF_WORKING_STACKS, this.workStacks)) {
        return true;
      }
    }
    return false;
  }

  _ifCanAcceptMark(numberOfStacks, targetStacks) {
    for (let i = 1; i <= numberOfStacks; i++) {
      if (targetStacks[i].canAccept(this.cardsFromHint)) {
        this.cardToHint = targetStacks[i].getCards().slice(-1);
        this.cardsFromHint.forEach(card => card.toggleSelecteion(true));
        if (this.cardToHint[0]) this.cardToHint[0].toggleSelecteion(true);
        return true;
      }
    }
    return false;
  }

  _reSetTimeout() {
    clearTimeout(this.timerId);
    if (this.cardsFromHint[0]) {
      this.cardsFromHint.forEach(card => card.toggleSelecteion(false));
    }
    if (this.cardToHint[0]) {
      this.cardToHint.forEach(card => card.toggleSelecteion(false));
    }
    this.timerId = setTimeout(this._hasNextTurn, DELAY_TO_HINT);
  }
}

new Game();
