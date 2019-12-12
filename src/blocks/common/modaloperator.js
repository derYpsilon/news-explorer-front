import './scroll-lock.css'

export default class ModalOperator {
  constructor(kbdElement, clickElement) {
    this.kbdElement = kbdElement
    this.clickElement = clickElement
    this.modals = Array.from(this.kbdElement.querySelectorAll('.service-wrapper'))
    this.kbdElement.addEventListener('keydown', (event) => this.onKey(event))
    this.clickElement.addEventListener('mousedown', (event) => this.onClick(event))
  }

  onKey(event) {
    if (Array.from(this.clickElement.classList).includes('body-noscroll')) {
      if (event.code === 'Escape') {
        this.modals.find(
          // eslint-disable-next-line no-confusing-arrow
          (element) => Array.from(element.classList)
            // eslint-disable-next-line no-unneeded-ternary
            .includes('service-wrapper_hide') ? false : true,
        ).classList.add('service-wrapper_hide')
        this.clickElement.classList.remove('body-noscroll')
      }
    }
  }

  onClick(event) {
    if (Array.from(event.target.classList).includes('service-wrapper')) {
      event.target.classList.add('service-wrapper_hide')
      this.clickElement.classList.remove('body-noscroll')
    }
  }
}
