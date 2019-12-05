/* eslint-disable no-unused-vars */
import './vendor/normalize.css'
import './index.css'
import { menuOperator, mainMenu } from './blocks/menu/menu'
import modalOperator from './blocks/common/modaloperator'
import ShowError from './blocks/common/error/error'
import apiEx from './components/api-explorer'
import NewsReader from './components/news-reader'

const nReader = new NewsReader(apiEx.isLogged.bind(apiEx),
  apiEx.saveArticle.bind(apiEx),
  apiEx.deleteArticle.bind(apiEx))

// const cardIconSave = new Card(document.querySelector('.results'))

// Methods

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close()
}
