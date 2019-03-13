class Deck {
    constructor() {
        this._deck = [];
        this._create();
    }
    _create() {
        let baseDeck = [];
        for (let i = 0; i < cardSettings.suits.length; i++) {
            for (let j = 1; j < cardSettings.signs.length; j++) {
                let color = 0;
                if (i > 1) color = 1;
                baseDeck.push(new CreateCard(color, i, j));
            }
        }
        let i = baseDeck.length - 1;
        while (i >= 0) {
            let index = Math.round(Math.random() * i);
            this._deck.push(baseDeck.splice(index, 1)[0]);
            i--;
        }
    }
}