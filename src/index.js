/* eslint-disable no-unused-vars */
import './vendor/normalize.css'
import './index.css'
import config from './components/config'
import { menuOperator, mainMenu } from './blocks/menu/menu'
import modalOperator from './blocks/common/modaloperator'
import AuthForm from './blocks/common/auth-form/auth-form'
import ShowError from './blocks/common/error/error'
import ApiBackend from './components/api-backend'
import NewsApi from './components/news-api'
import NewsRender from './components/news-render'
import MainMenuRender from './components/main-menu-render'

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

const newsApi = new NewsApi(config.newsFeed)

const userMenu = new MainMenuRender(
  loginForm.open.bind(loginForm),
  apiBackend.logout.bind(apiBackend),
  showError,
)
userMenu.init()

const newsRender = new NewsRender(
  newsApi.getNews.bind(newsApi),
  apiBackend.saveArticle.bind(apiBackend),
  apiBackend.deleteArticle.bind(apiBackend),
  showError,
  config,
)

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close()
}
