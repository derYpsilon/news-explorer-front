import '../../vendor/normalize.css'
import './index.css'
import config from '../../components/config'
/* eslint-disable no-unused-vars */
import { menuOperator, mainMenu } from '../../blocks/menu/menu'
import modalOperator from '../../blocks/common/modaloperator'
import apiEx from '../../components/api-backend'
import Collection from '../../components/collection'
import ShowError from '../../blocks/common/error/error'

const myCollection = new Collection(apiEx.isLogged.bind(apiEx),
  apiEx.getAllArticles.bind(apiEx),
  apiEx.deleteArticle.bind(apiEx),
  apiEx.userName,
  config,
  new ShowError())
// Methods

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close()
}
