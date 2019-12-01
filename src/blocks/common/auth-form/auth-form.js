/* eslint-disable eqeqeq */
import './auth-form.css'

export default class AuthForm {
  constructor(domElement, goTo) {
    this.domElement = domElement
    this.closeButton = domElement.querySelector('.auth-form__close')
    this.closeButton.addEventListener('click', () => { this.close() })
    this.form = domElement.querySelector('.auth-form')
    this.goTo = document.querySelector(goTo)
    this.nextStep = domElement.querySelector('.auth-form__other-action-click')
    this.nextStep.addEventListener('click', () => { this.openNext() })
    this._callExt = () => { console.log('Add the callback via class setter') }
    this.submitButton = ''
    Array.from(this.form.elements)
      .forEach((item) => {
        if (item.nodeName == 'BUTTON') {
          this.submitButton = item
        }
        if (item.nodeName == 'INPUT') {
          // item.addEventListener('input', event => this.inputHandler(event))
          // console.log(item)
        }
      })
    this.form.addEventListener('submit', (event) => this.submitForm(event))
  }

  get callExt() {
    return this._callExt
  }

  set callExt(func) {
    this._callExt = func
  }

  disableSubmitButton() {
    this.submitButton.setAttribute('disabled', true)
  }

  enableSubmitButton() {
    this.submitButton.removeAttribute('disabled', true)
  }

  submitForm(event) {
    event.preventDefault()
    this.disableSubmitButton()
    this.callExt({ name: 'Ivan', password: 'Drago' })
  }

  open() {
    this.domElement.classList.remove('auth-form__wrapper_hide')
    document.body.classList.add('body-noscroll')
  }

  close() {
    document.body.classList.remove('body-noscroll')
    this.domElement.classList.add('auth-form__wrapper_hide')
  }

  openNext() {
    this.domElement.classList.add('auth-form__wrapper_hide')
    this.goTo.classList.remove('auth-form__wrapper_hide')
  }
}
