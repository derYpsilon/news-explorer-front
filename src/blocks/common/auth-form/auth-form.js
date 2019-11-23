import './auth-form.css'

export default class AuthForm {
  constructor(domElement, overlay, goTo, submitFunction) {
    this.domElement = domElement
    this.overlay = overlay
    this.closeButton = domElement.querySelector('.auth-form__close')
    this.closeButton.addEventListener('click', () => { this.close() })
    this.form = domElement.querySelector('.auth-form')
    this.goTo = document.querySelector(goTo)
    this.nextStep = domElement.querySelector('.auth-form__other-action-click')
    this.nextStep.addEventListener('click', () => { this.openNext() })
    this.submit = submitFunction
  }

  open() {
    this.overlay.show()
    this.domElement.classList.remove('auth-form__wrapper_hide')
    document.body.classList.add('body-noscroll')
  }

  close() {
    document.body.classList.remove('body-noscroll')
    this.overlay.hide()
    this.domElement.classList.add('auth-form__wrapper_hide')
  }

  openNext() {
    this.domElement.classList.add('auth-form__wrapper_hide')
    this.goTo.classList.remove('auth-form__wrapper_hide')
  }
}
