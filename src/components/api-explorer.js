//
//   _____     _    _____         _
//  |  _  |___|_|  |   __|_ _ ___| |___ ___ ___ ___
//  |     | . | |  |   __|_'_| . | | . |  _| -_|  _|
//  |__|__|  _|_|  |_____|_,_|  _|_|___|_| |___|_|
//        |_|                |_|
//

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
    this.userMenuHandler = () => loginForm.open()
    this.menuCustomizer()
    this._callExt = null
    this.updateView = new Event('updateView', { bubbles: true })
  }

  // eslint-disable-next-line class-methods-use-this
  get userName() {
    return localStorage.getItem('user')
  }

  isLogged() {
    return Boolean(this.userName)
  }

  menuCustomizer() {
    const shownName = document.querySelector('#shown-user-name')
    if (!this.userName) {
      if (document.location.pathname === '/articles/') document.location.href = '../'
      shownName.textContent = 'Авторизуйтесь'
      shownName.addEventListener('click', this.userMenuHandler)
      shownName.parentNode.querySelector('.menu__logout').style.display = 'none'
      document.querySelector('#menu-saved-articles').style.display = 'none'
    } else {
      shownName.textContent = this.userName
      shownName.parentNode.querySelector('.menu__logout').style.display = 'inline-block'
      shownName.removeEventListener('click', this.userMenuHandler)
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
        this.menuCustomizer()
        document.dispatchEvent(this.updateView)
      })
      .catch((e) => console.log(e.message))
  }

  login(data) {
    return fetch(config.login,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка авторизации ${res.status}`)
        return res.json()
      })
      .then((answer) => {
        fetch(config.getUser, { credentials: 'include' })
          .then((res) => {
            if (!res.ok) throw new Error(`Ошибка чтения ${res.status}`)
            return res.json()
          })
          .then((userInfo) => {
            localStorage.setItem('user', userInfo.user)
            loginForm.enableSubmitButton()
            loginForm.close()
            this.menuCustomizer()
            document.dispatchEvent(this.updateView)
          })
          .catch((e) => console.log(e.message))
      })
      .catch((err) => {
        console.log(err.message)
        throw new Error(err.message)
      })
  }

  signUp(data) {
    return fetch(config.signup,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка ${res.status} -- ${res.text()}`)
        return res.json()
      })
      .then(() => {
        signupForm.close()
        regCompleteForm.open()
        return Promise.resolve()
      })
      .catch((err) => {
        console.log(err.message)
        throw new Error(err.message)
      })
  }
}

const apiEx = new Explorer()
loginForm.callExt = apiEx.login.bind(apiEx)
signupForm.callExt = apiEx.signUp.bind(apiEx)

export default apiEx
