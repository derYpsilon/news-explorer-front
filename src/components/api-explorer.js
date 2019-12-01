/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import AuthForm from '../blocks/common/auth-form/auth-form'
import config from './config'

const loginForm = new AuthForm(
  document.querySelector('#login-form'),
  '#signup-form',
)

const signupForm = new AuthForm(
  document.querySelector('#signup-form'),
  '#login-form',
)

const regCompleteForm = new AuthForm(
  document.querySelector('#signup-ok'),
  '#login-form',
)

class Explorer {
  constructor() {
    this._isLogged = Boolean(this.userName)
    this.menuCustomizer()
    console.log(`_isLogged: ${this._isLogged}`)
    this._callExt = null
  }

  // eslint-disable-next-line class-methods-use-this
  get userName() {
    return localStorage.getItem('user')
  }

  menuCustomizer() {
    const shownName = document.querySelector('#shown-user-name')
    if (!this.userName) {
      shownName.insertAdjacentText('afterbegin', 'Авторизуйтесь')
      shownName.addEventListener('click', () => loginForm.open())
      shownName.parentNode.querySelector('.menu__logout').style.display = 'none'
      document.querySelector('#menu-saved-articles').style.display = 'none'
    } else {
      shownName.textContent = this.userName
      shownName.parentNode.querySelector('.menu__logout').style.display = 'inline-block'
      shownName.removeEventListener('click', () => loginForm.open())
      shownName.addEventListener('click', () => this.logout())
      document.querySelector('#menu-saved-articles').style.display = 'flex'
    }
  }

  logout() {
    fetch(config.logout,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка выхода ${res.status}`)
        return res.json()
      })
      .then(() => {
        localStorage.clear()
        document.location.href = document.location.pathname === '/articles/' ? '../' : './'
      })
      .catch((e) => console.log(e.message))
  }

  login(data) {
    console.log(data)
    fetch(config.login,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          password: '123456789',
          email: 'user@user.ru',
        }),
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка авторизации ${res.status}`)
        return res.json()
      })
      .then((answer) => {
        console.log(answer)
        fetch('https://api.tsitskun.tk/users/me', { credentials: 'include' })
          .then((res) => {
            if (!res.ok) throw new Error(`Ошибка чтения ${res.status}`)
            return res.json()
          })
          .then((userInfo) => {
            localStorage.setItem('user', userInfo.user)
            this.menuCustomizer()
          })
          .catch((e) => console.log(e.message))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}

const apiEx = new Explorer()
loginForm.callExt = apiEx.login.bind(apiEx)

export default apiEx
