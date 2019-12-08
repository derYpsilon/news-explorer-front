export default class MainMenuRender {
  constructor(loginFormOpen, logout, showError) {
    this.loginHandler = loginFormOpen
    this.logoutHandler = logout
    this.showError = showError
    this._out = this._logout.bind(this)
    this._in = this._login.bind(this)
    this._shownName = document.querySelector('#shown-user-name')
    this._menuLogout = this._shownName.parentNode.querySelector('.menu__logout')
    this._savedArticles = document.querySelector('#menu-saved-articles')
    this._updateView = new Event('updateView', { bubbles: true })
  }

  init() {
    this._renderMenu()
    document.addEventListener('updateMenu', this._renderMenu.bind(this))
  }

  _renderMenu() {
    const user = localStorage.getItem('user')
    if (!user) {
      if (document.location.pathname === '/articles/') document.location.href = '../'
      this._shownName.textContent = 'Авторизуйтесь'
      this._shownName.removeEventListener('click', this._out)
      this._shownName.addEventListener('click', this._in)
      this._menuLogout.style.display = 'none'
      this._savedArticles.style.display = 'none'
    } else {
      this._shownName.textContent = user
      this._menuLogout.style.display = 'inline-block'
      this._shownName.removeEventListener('click', this._in)
      this._shownName.addEventListener('click', this._out)
      this._savedArticles.style.display = 'flex'
    }
  }

  _logout() {
    this.logoutHandler()
      .then(() => {
        document.dispatchEvent(this._updateView)
        this._shownName.removeEventListener('click', this._out)
        this._renderMenu()
      })
      .catch((err) => {
        this.showError.show(err.message)
      })
  }

  _login() {
    this.loginHandler()
  }
}
