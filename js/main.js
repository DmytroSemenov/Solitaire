"use strict";

const cardSettings = {
    suits: ['♠', '♣', '♦', '♥'],
    signs: ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
}

window.addEventListener('load', function () {
    new Game();
});

class Game {
    constructor() {
        const deck = new Deck();

        // const stackBase = new Placeholder(document.getElementById('stack_base'));
        // stackBase._stack = stackBase._stack.concat(deck._deck.splice(0, 24));
        // stackBase._render();

        const stackBaseDrops = new Placeholder(document.getElementById('stack_base_r'));

        const stack_1 = new Placeholder(document.getElementById('deck_1'));
        stack_1._stack = stack_1._stack.concat(deck._deck.splice(0, 1));
        stack_1._render();

        const stack_2 = new Placeholder(document.getElementById('deck_2'));
        stack_2._stack = stack_2._stack.concat(deck._deck.splice(0, 2));
        stack_2._render();


        console.log(stack_2);

        // let rndCard = deck._deck[48]._elementCard;


        // const element = document.body;
        // element.appendChild(rndCard);
        // arrays
        // this._render();
    }
    _render() {

    }
}