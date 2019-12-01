/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import AuthForm from '../blocks/common/auth-form/auth-form'

const loginForm = new AuthForm(
  document.querySelector('#login-form'),
  '#signup-form',
  () => { console.log('works') },
)

const signupForm = new AuthForm(
  document.querySelector('#signup-form'),
  '#login-form',
  () => { console.log('works') },
)

const regCompleteForm = new AuthForm(
  document.querySelector('#signup-ok'),
  '#login-form',
  () => { console.log('works') },
)

class Explorer {
  constructor() {
    this._isLogged = Boolean(this.userName)
    this.menuCustomizer()
    console.log(`_isLogged: ${this._isLogged}`)
  }

  // eslint-disable-next-line class-methods-use-this
  get userName() {
    // return 'Иннокентий'

    return localStorage.getItem('user')
  }

  menuCustomizer() {
    const shownName = document.querySelector('#shown-user-name')
    if (!this.userName) {
      shownName.insertAdjacentText('afterbegin', 'Авторизуйтесь')
      shownName.addEventListener('click', () => loginForm.open())
      shownName.querySelector('.menu__logout').style.display = 'none'
      document.querySelector('#menu-saved-articles').style.display = 'none'
    } else {
      shownName.insertAdjacentText('afterbegin', this.userName)
      shownName.querySelector('.menu__logout').style.display = 'inline-block'
      shownName.removeEventListener('click', () => loginForm.open())
      document.querySelector('#menu-saved-articles').style.display = 'flex'
    }
  }

  login(user, password) {
    console.log(user, password)
  }
}

const apiEx = new Explorer()
export default apiEx
