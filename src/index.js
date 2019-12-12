/* eslint-disable no-unused-vars */
import './vendor/normalize.css'
import './index.css'
import config from './components/config'
import { menuOperator, mainMenu } from './blocks/menu/menu'
import initUI from './components/setup'
import NewsApi from './components/news-api'
import NewsRender from './components/news-render'

const pageUI = initUI()

const newsApi = new NewsApi(config.newsFeed)

const newsRender = new NewsRender(
  newsApi.getNews.bind(newsApi),
  pageUI.apiBackend.saveArticle.bind(pageUI.apiBackend),
  pageUI.apiBackend.deleteArticle.bind(pageUI.apiBackend),
  pageUI.showError,
  config,
)

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close()
}
