/* eslint-disable no-unused-vars */
import './vendor/normalize.css'
import './index.css'
import { menuOperator, mainMenu } from './blocks/menu/menu'
import modalOperator from './blocks/common/modaloperator'
import Card from './blocks/common/card/card'
import { loginForm, signupForm, regCompleteForm } from './blocks/common/auth-form/auth-form'

const cardIconSave = new Card(document.querySelector('.results'))

// Methods

regCompleteForm.open()

window.onresize = () => {
  if (window.innerWidth > 767) mainMenu.close()
}
