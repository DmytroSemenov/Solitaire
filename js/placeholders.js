class Placeholder {
    constructor(element) {
        this._element = element;
        this._stack = [];

        // this._render();
    }
    _render() {
        if (this._stack.length) {
            for (let i = 0; i < this._stack.length -1; i++) {
                let elementShifted = this._stack[i]._elementCard;
                let marginTopY = 30 * i;
                elementShifted.style.marginTop = marginTopY + 'px';
                // if(!this._stack[i].isOpen) this._stack[i]._elementCard.classList.add('card__back');
                
                this._element.appendChild(elementShifted);  
                if(!this._stack[i].isOpen) this._element.lastChild.classList.add('card__back');                        
            }
            this._element.appendChild(this._stack[this._stack.length - 1]._elementCard);
        }
    }
}