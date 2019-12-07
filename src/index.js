/* eslint-disable no-unused-vars */
import './vendor/normalize.css'
import './index.css'
import config from './components/config'
import { menuOperator, mainMenu } from './blocks/menu/menu'
import modalOperator from './blocks/common/modaloperator'
import ShowError from './blocks/common/error/error'
import apiEx from './components/api-backend'
import NewsApi from './components/news-api'
import NewsRender from './components/news-render'

const newsApi = new NewsApi(config.newsFeed)
const newsRender = new NewsRender(
  newsApi.getNews.bind(newsApi),
  apiEx.isLogged.bind(apiEx),
  apiEx.saveArticle.bind(apiEx),
  apiEx.deleteArticle.bind(apiEx),
  new ShowError(),
  config,
)

const se = new ShowError()
se.show('Hi there')
// const cardIconSave = new Card(document.querySelector('.results'))

// Methods

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close()
}
