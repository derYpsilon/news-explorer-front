import Component from './component'
// eslint-disable-next-line import/prefer-default-export
export const modalOperator = new Component(
  document.body,
  {
    click: (event) => {
      if (Array.from(event.target.classList).includes('auth-form__wrapper')) {
        event.target.classList.add('auth-form__wrapper_hide')
        document.body.classList.remove('body-noscroll')
      }
    },
    keydown: (event) => {
      if (Array.from(event.target.classList).includes('body-noscroll')) {
        if (event.code === 'Escape') {
          const modals = Array.from(event.target.querySelectorAll('.auth-form__wrapper'))
          modals.find(
            // eslint-disable-next-line no-confusing-arrow
            (element) => Array.from(element.classList)
              // eslint-disable-next-line no-unneeded-ternary
              .includes('auth-form__wrapper_hide') ? false : true,
          ).classList.add('auth-form__wrapper_hide')
          document.body.classList.remove('body-noscroll')
        }
      }
    },
  },
)
