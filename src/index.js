import './style.css'
import Component from './blocks/common/component'
import Menu from './blocks/menu/menu'

const menu = new Menu(
  {
    control: '.menu__mobile',
    overlay: '.menu__mobile-overlay',
    items: '.menu__items-list',
    menu: '.menu',
  },
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
