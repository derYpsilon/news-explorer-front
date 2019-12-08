export default class MainMenuRender {
  constructor(loginFormOpen, logout, showError) {
    this._loginHandler = loginFormOpen
    this._logoutHandler = logout
    this._showError = showError
    this._out = this._logout.bind(this)
    this._in = this._login.bind(this)
    this._shownName = document.querySelector('#shown-user-name')
    this._updateView = new Event('updateView', { bubbles: true })
    document.addEventListener('updateMenu', this._renderMenu.bind(this))
  }

  init() {
    this._renderMenu()
  }

  _renderMenu() {
    const user = localStorage.getItem('user')
    if (!user) {
      if (document.location.pathname === '/articles/') document.location.href = '../'
      this._shownName.textContent = 'Авторизуйтесь'
      this._shownName.removeEventListener('click', this._out)
      this._shownName.addEventListener('click', this._in)
      this._shownName.parentNode.querySelector('.menu__logout').style.display = 'none'
      document.querySelector('#menu-saved-articles').style.display = 'none'
    } else {
      this._shownName.textContent = user
      this._shownName.parentNode.querySelector('.menu__logout').style.display = 'inline-block'
      this._shownName.removeEventListener('click', this._in)
      this._shownName.addEventListener('click', this._out)
      document.querySelector('#menu-saved-articles').style.display = 'flex'
    }
  }

  _logout() {
    this._logoutHandler()
      .then(() => {
        document.dispatchEvent(this._updateView)
        this._shownName.removeEventListener('click', this._out)
        this._renderMenu()
      })
      .catch((err) => {
        this._showError.show(err.message)
      })
  }

  _login() {
    this._loginHandler()
  }
}


// logout() {
//   fetch(config.logout,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       mode: 'cors',
//       credentials: 'include',
//     })
//     .then((res) => {
//       if (!res.ok) throw new Error(`Ошибка выхода ${res.status}`)
//       return res.json()
//     })
//     .then(() => {
//       localStorage.clear()
//       this._menuCustomizer()
//       document.dispatchEvent(this.updateView)
//     })
//     .catch((e) => console.log(e.message))
// }

// login(data) {
//   return fetch(config.login,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       mode: 'cors',
//       credentials: 'include',
//       body: JSON.stringify(data),
//     })
//     .then((res) => {
//       if (!res.ok) throw new Error(res.status)
//       return res.json()
//     })
//     .then((answer) => {
//       fetch(config.getUser, { credentials: 'include' })
//         .then((res) => {
//           if (!res.ok) throw new Error(`Ошибка чтения ${res.status}`)
//           return res.json()
//         })
//         .then((userInfo) => {
//           localStorage.setItem('user', userInfo.user)
//           loginForm.enableSubmitButton()
//           loginForm.close()
//           this._menuCustomizer()
//           document.dispatchEvent(this.updateView)
//         })
//         .catch((e) => console.log(e.message))
//     })
//     .catch((err) => {
//       console.log(err.message)
//       throw new Error(err.message)
//     })
// }

// signUp(data) {
//   return fetch(config.signup,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       mode: 'cors',
//       credentials: 'include',
//       body: JSON.stringify(data),
//     })
//     .then((res) => {
//       if (!res.ok) throw new Error(`Ошибка ${res.status} -- ${res.text()}`)
//       return res.json()
//     })
//     .then(() => {
//       signupForm.close()
//       regCompleteForm.open()
//       return Promise.resolve()
//     })
//     .catch((err) => {
//       console.log(err.message)
//       throw new Error(err.message)
//     })
// }
