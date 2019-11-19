export default class Menu {
  constructor(
    {
      control, overlay, items, menu,
    },
    classes = {},
  ) {
    this.isOpened = false
    this.overlay = document.querySelector(overlay)
    this.menuItems = document.querySelector(items)
    this.menuControl = document.querySelector(control)
    this.menu = document.querySelector(menu)
  }

  click() {
    if (this.isOpened) {
      this.close()
    } else {
      this.open()
    }
  }

  open() {
    this.menuControl.classList.add('menu__mobile_close')
    this.overlay.classList.add('menu__mobile-overlay_on')
    this.menu.style.backgroundColor = '#1A1B22'
    this.menuItems.classList.add('menu__items-list_show')
    this.isOpened = true
  }

  close() {
    this.menuControl.classList.remove('menu__mobile_close')
    this.overlay.classList.remove('menu__mobile-overlay_on')
    this.menu.style.backgroundColor = ''
    this.menuItems.classList.remove('menu__items-list_show')
    this.isOpened = false
  }
}
