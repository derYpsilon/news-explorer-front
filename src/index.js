/* eslint-disable no-unused-vars */
import './vendor/normalize.css'
import './vendor/fonts.css'
import './blocks/common/wrapper.css'
import './blocks/header/header.css'
import './blocks/common/button/button.css'
import './blocks/common/preloader/preloader.css'
import './blocks/preloader/preloader.css'
import './blocks/results/results.css'
import './blocks/common/card/card.css'
import './blocks/common/about/about.css'
import './blocks/common/footer/footer.css'
import './blocks/common/body-noscroll/body-noscroll.css'
import './index.css'
import Overlay from './blocks/common/overlay/overlay'
import Component from './blocks/common/component'
import Menu from './blocks/menu/menu'
import AuthForm from './blocks/common/auth-form/auth-form'
import modalOperator from './blocks/common/modaloperator'

const overlay = new Overlay()
const submitFunc = () => { console.log('works') }

const loginForm = new AuthForm(
  document.querySelector('#login-form'),
  overlay,
  '#signup-form',
  submitFunc,
)

const signupForm = new AuthForm(
  document.querySelector('#signup-form'),
  overlay,
  '#login-form',
  () => { console.log('works') },
)

const regCompleteForm = new AuthForm(
  document.querySelector('#signup-ok'),
  overlay,
  '#login-form',
  () => { console.log('works') },
)

const menu = new Menu(
  {
    control: '.menu__mobile',
    items: '.menu__items-list',
    menu: '.menu',
  },
  overlay,
)

const menuOperator = new Component(
  document.querySelector('.menu__mobile'),
  {
    click: () => {
      menu.click()
    },
  },
)

// Methods

regCompleteForm.open()

window.onresize = () => {
  if (window.innerWidth > 767) menu.close()
}
