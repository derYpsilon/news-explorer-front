import config from './config'
import ModalOperator from '../blocks/common/modaloperator'
import AuthForm from '../blocks/common/auth-form/auth-form'
import ShowError from '../blocks/common/error/error'
import ApiBackend from './api-backend'
import MainMenuRender from './main-menu-render'

const initUI = () => {
  const modalOperator = new ModalOperator(document.body, document.querySelector('#scroll'))
  const showError = new ShowError()
  const apiBackend = new ApiBackend(config)

  const loginForm = new AuthForm(
    document.querySelector('#login-form'),
    '#signup-form',
    apiBackend.login.bind(apiBackend),
    apiBackend.getUserName.bind(apiBackend),
    showError,
  )

  const signupForm = new AuthForm(
    document.querySelector('#signup-form'),
    '#login-form',
    apiBackend.signUp.bind(apiBackend),
    apiBackend.getUserName.bind(apiBackend),
    showError,
  )

  const regCompleteForm = new AuthForm(
    document.querySelector('#signup-ok'),
    '#login-form',
    null,
    null,
    showError,
  )

  const userMenu = new MainMenuRender(
    loginForm.open.bind(loginForm),
    apiBackend.logout.bind(apiBackend),
    showError,
  )
  userMenu.init()
  return {
    modalOperator,
    showError,
    apiBackend,
    loginForm,
    signupForm,
    regCompleteForm,
    userMenu,
  }
}

export default initUI
