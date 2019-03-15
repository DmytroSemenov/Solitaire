class Placeholder {
  constructor (element) {
    this._element = element
    this._stack = []

  // this._render()
  }
  _render () {
    this._element.innerHTML = ''

    if (this._stack.length) {
      for (let i = 0; i < this._stack.length; i++) {
        let elementShifted = this._stack[i]._elementCard
        let marginTopY = 30 * i
        elementShifted.style.marginTop = marginTopY + 'px'

        if (i === this._stack.length - 1) {
          this._element.appendChild(this._stack[i]._elementCard);
        } else {
          if (!this._stack[i].isOpen) this._stack[i]._elementCard.firstChild.classList.add('card__back')
          this._element.appendChild(elementShifted)
        }
      }
    }
  }
}
