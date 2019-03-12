class CreateCard {
    constructor( element, suit, value ) {
        this._elementCard = document.createElement('div');
        this._element = element;
        this._suit = suit;
        this._value = value;

        this._render();
    }
    _render(){
        this._elementCard.innerHTML = `<div class="card">${ this._suit } ${ this._value }</div>`;
        this._element.appendChild(this._elementCard);
    }
}

const element = document.body;
const cardOne = new CreateCard(element, 1, 1);
console.log(cardOne);


"Create class temlate": {
    "prefix": "class",
    "body": [
        "class $1 {",
        "   constructor({ element }) {",
        "       this._element = element;",

        "       this._render();",
        "   }",

        "   _render(){",
        "       this._element.innerHTML = ``;",
        "   }",
        "}",			
    ],
    "description": "Create class temlate"
}