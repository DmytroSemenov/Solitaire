'use strict'

const cardSettings = {
  suits: ['♠', '♣', '♦', '♥'],
  signs: ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
}

window.addEventListener('load', function () {
  new Game()
})

class Game {
  constructor () {
    const deck = new Deck()

    const stackBase = new PlaceholderBase(document.getElementById('stack_base'))
    stackBase._stack = stackBase._stack.concat(deck._deck.splice(0, 24))
    stackBase._render()

    const stackBaseDrops = new PlaceholderBase(document.getElementById('stack_base_r'))

    const stack_1 = new Placeholder(document.getElementById('deck_1'))
    stack_1._stack = stack_1._stack.concat(deck._deck.splice(0, 1))
    stack_1._render()

    const stack_2 = new Placeholder(document.getElementById('deck_2'))
    stack_2._stack = stack_2._stack.concat(deck._deck.splice(0, 2))
    stack_2._render()

    const stack_3 = new Placeholder(document.getElementById('deck_3'))
    stack_3._stack = stack_3._stack.concat(deck._deck.splice(0, 3))
    stack_3._render()

    const stack_4 = new Placeholder(document.getElementById('deck_4'))
    stack_4._stack = stack_4._stack.concat(deck._deck.splice(0, 4))
    stack_4._render()

    const stack_5 = new Placeholder(document.getElementById('deck_5'))
    stack_5._stack = stack_5._stack.concat(deck._deck.splice(0, 5))
    stack_5._render()

    const stack_6 = new Placeholder(document.getElementById('deck_6'))
    stack_6._stack = stack_6._stack.concat(deck._deck.splice(0, 6))
    stack_6._render()

    const stack_7 = new Placeholder(document.getElementById('deck_7'))
    stack_7._stack = stack_7._stack.concat(deck._deck.splice(0, 7))
    stack_7._render()

    const game = document.querySelector('#game')

    game.addEventListener('click', (event) => {
        this._render();
     
    })
  }
  _render () {
    //   alert('1');
  }
}
