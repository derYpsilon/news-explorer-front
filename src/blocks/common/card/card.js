/* eslint-disable class-methods-use-this */
export default class Card {
  constructor(parentField) {
    this.parentField = parentField
    this.parentField.addEventListener('click', (event) => { this.click(event) })
  }

  click(event) {
    if (event.target.className.includes('card__icon')) event.preventDefault()
  }
}
