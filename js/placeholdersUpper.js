class PlaceholderBase {
    constructor(element) {
        this._element = element;
        this._stack = [];

        // this._render();
    }
    _render() {
        if (this._stack.length) {
            this._element.appendChild(this._stack[this._stack.length - 1]._elementCard);
        }
    }
}