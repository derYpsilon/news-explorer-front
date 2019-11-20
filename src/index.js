import './style.css'
import Overlay from './blocks/common/overlay/overlay'
import Component from './blocks/common/component'
import Menu from './blocks/menu/menu'

const overlay = new Overlay()
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
      overlay.show()
      menu.click()
    },
  },
)

window.onresize = () => {
  if (window.innerWidth > 767) menu.close()
}
