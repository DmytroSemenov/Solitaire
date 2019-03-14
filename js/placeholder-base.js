// class Placeholder {
//   constructor(element, isShifted) {
//     this._element = element;
//     this._isShifted = isShifted;
//     this._stack = [];

//     this._render()
//   }
//   _render() {
//     this._element.innerHTML = '';

//     if (this._stack.length) {
//       this._stack[this._stack.length - 1].open();
//       for (let i = 0; i < this._stack.length; i++) {
//         let elementShifted = this._stack[i]._element;
//         let marginTopY = 30 * i;
//         if (this._isShifted) elementShifted.style.marginTop = marginTopY + 'px';     
//         this._element.appendChild(elementShifted);
//       }
//     }
//   }
// }
