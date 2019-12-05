import '../../vendor/normalize.css'
import './index.css'
/* eslint-disable no-unused-vars */
import { menuOperator, mainMenu } from '../../blocks/menu/menu'
import modalOperator from '../../blocks/common/modaloperator'
import apiEx from '../../components/api-explorer'
import Collection from '../../components/collection'

const myCollection = new Collection(apiEx.isLogged.bind(apiEx),
  apiEx.getAllArticles.bind(apiEx),
  apiEx.deleteArticle.bind(apiEx),
  apiEx.userName)
// Methods

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close()
}
