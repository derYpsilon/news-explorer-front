import '../../vendor/normalize.css'
import './index.css'
/* eslint-disable no-unused-vars */
import { menuOperator, mainMenu } from '../../blocks/menu/menu'
import modalOperator from '../../blocks/common/modaloperator'
import Card from '../../blocks/common/card/card'
import apiEx from '../../components/api-explorer'

const cardIconDelete = new Card(document.querySelector('.storage'))
// Methods

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close()
}
