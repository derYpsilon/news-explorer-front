import './index.css'
import Overlay from './blocks/common/overlay/overlay'
import Component from './blocks/common/component'
import Menu from './blocks/menu/menu'
import AuthForm from './blocks/common/auth-form/auth-form'

const overlay = new Overlay()
const submitFunc = () => { console.log('works') }
const loginForm = new AuthForm(
  document.querySelector('#login-form'),
  overlay,
  '#signup-form',
  submitFunc,
)
// eslint-disable-next-line no-unused-vars
const signupForm = new AuthForm(
  document.querySelector('#signup-form'),
  overlay,
  '#login-form',
  () => { console.log('works') },
)
loginForm.open()
const menu = new Menu(
  {
    control: '.menu__mobile',
    items: '.menu__items-list',
    menu: '.menu',
  },
  overlay,
)

// eslint-disable-next-line no-unused-vars
const menuOperator = new Component(
  document.querySelector('.menu__mobile'),
  {
    click: () => {
      menu.click()
    },
  },
)

window.onresize = () => {
  if (window.innerWidth > 767) menu.close()
}
