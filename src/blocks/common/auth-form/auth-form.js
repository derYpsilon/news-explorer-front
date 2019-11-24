import './auth-form.css'

class AuthForm {
  constructor(domElement, goTo, submitFunction) {
    this.domElement = domElement
    this.closeButton = domElement.querySelector('.auth-form__close')
    this.closeButton.addEventListener('click', () => { this.close() })
    this.form = domElement.querySelector('.auth-form')
    this.goTo = document.querySelector(goTo)
    this.nextStep = domElement.querySelector('.auth-form__other-action-click')
    this.nextStep.addEventListener('click', () => { this.openNext() })
    // Stub for external sibmitFunction
    this.submit = submitFunction
    // TODO get submitButton element and add event listener to it
    // TODO add check is Button exists
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

export const loginForm = new AuthForm(
  document.querySelector('#login-form'),
  '#signup-form',
  () => { console.log('works') },
)

export const signupForm = new AuthForm(
  document.querySelector('#signup-form'),
  '#login-form',
  () => { console.log('works') },
)

export const regCompleteForm = new AuthForm(
  document.querySelector('#signup-ok'),
  '#login-form',
  () => { console.log('works') },
)
