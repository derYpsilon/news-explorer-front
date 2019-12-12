import '../../vendor/normalize.css'
import './index.css'
import config from '../../components/config'
/* eslint-disable no-unused-vars */
import { menuOperator, mainMenu } from '../../blocks/menu/menu'
import initUI from '../../components/setup'
import Collection from '../../components/collection'

const pageUI = initUI()

const myCollection = new Collection(
  pageUI.apiBackend.getAllArticles.bind(pageUI.apiBackend),
  pageUI.apiBackend.deleteArticle.bind(pageUI.apiBackend),
  config,
  pageUI.showError,
)
// Methods

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close()
}
