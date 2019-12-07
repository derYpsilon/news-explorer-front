export default class NewsRender {
  constructor(
    getNews, isLogged, saveArticle, deleteArticle, showError,
    {
      cardSample, results, card, month,
    },
  ) {
    this.getNews = getNews
    this.isLogged = isLogged
    this.saveArticle = saveArticle
    this.deleteArticle = deleteArticle
    this.showError = showError
    this._news = []
    this._cardTemplate = document.querySelector(cardSample).content
    this._resultsField = document.querySelector(results.resultsField)
    this._submit = document.querySelector(results.newsForm)
    this._searchString = document.querySelector(results.newsFormSearchField)
    this._showMore = document.querySelector(results.showMore.node)
    this._preloader = document.querySelector(results.preloader.node)
    this._notFound = document.querySelector(results.notFound.node)
    this._serverError = document.querySelector(results.serverError.node)
    this._resultsSection = document.querySelector(results.resultsSection.node)
    this._cfg = results
    this._cfg.month = month
    this._card = card
    this._currentPos = 0

    this._submit.addEventListener('submit', (event) => this.search(event))
    this._showMore.addEventListener('click', () => this.renderCards())
    this._resultsField.addEventListener('click', (event) => this.cardHandler(event))
    document.addEventListener('updateView', () => this.patchRender())
  }

  buildCard(data) {
    const container = this._cardTemplate.cloneNode(true)
    container.querySelector(this._card.node).href = data.link
    container.querySelector(this._card.img).style.backgroundImage = `url(${data.image})`
    container.querySelector(this._card.date)
      .textContent = `${data.date.getDate()} ${this._cfg.month[data.date.getMonth()]} ${data.date.getFullYear()}`
    container.querySelector(this._card.title).textContent = data.title
    container.querySelector(this._card.text).textContent = data.text
    container.querySelector(this._card.src).textContent = data.source
    // eslint-disable-next-line max-len
    if (this.isLogged()) container.querySelector(this._card.icon.node).classList.add(this._card.icon.logged)
    container.querySelector(this._card.icon.node).setAttribute('cardID', this._currentPos)
    return container
  }

  renderCards() {
    const container = document.createDocumentFragment()
    const delta = this._news.length - this._currentPos
    const qty = (delta) < this._cfg.showStep ? delta : this._cfg.showStep
    if (delta <= this._cfg.showStep) this._showMore.classList.add(this._cfg.showMore.hide)
    for (let i = 0; i < qty; i += 1) {
      container.appendChild(this.buildCard(this._news[this._currentPos]))
      this._currentPos += 1
    }
    this._resultsField.appendChild(container)
  }

  clearResultsList() {
    this._currentPos = 0
    this._news.splice(0, this._news.length)
    while (this._resultsField.firstChild) {
      this._resultsField.removeChild(this._resultsField.firstChild)
    }
  }

  search(event) {
    event.preventDefault()
    const key = this._searchString.value.replace(/^\s+/, '')
    if (key.length === 0) {
      this.showError.show('Поле запроса не может быть пустым')
      return
    }
    this._serverError.classList.add(this._cfg.serverError.hide)
    this._resultsSection.classList.add(this._cfg.resultsSection.hide)
    this._notFound.classList.add(this._cfg.notFound.hide)
    this._preloader.classList.remove(this._cfg.preloader.hide)
    this._showMore.classList.remove(this._cfg.showMore.hide)
    if (this._news.length !== 0) {
      this.clearResultsList()
    }
    this.getNews(key)
      .then((data) => {
        this._news = data
        this._preloader.classList.add(this._cfg.preloader.hide)
        if (data.length === 0) {
          this._notFound.classList.remove(this._cfg.notFound.hide)
        } else {
          this.renderCards()
          this._resultsSection.classList.remove(this._cfg.resultsSection.hide)
        }
        this.patchRender()
      })
      .catch((err) => {
        console.log(err.message)
        this._notFound.classList.add(this._cfg.notFound.hide)
        this._preloader.classList.add(this._cfg.notFound.hide)
        this._serverError.classList.remove(this._cfg.serverError.hide)
        this.showError.show(err.message)
      })
  }

  patchRender() {
    Array.from(this._resultsField.querySelectorAll(this._card.node)).forEach(
      (item) => {
        if (this.isLogged()) {
          item.querySelector(this._card.icon.node).classList.add(this._card.icon.logged)
        } else {
          item.querySelector(this._card.icon.node).classList.remove(this._card.icon.logged)
        }
        item.querySelector(this._card.icon.node).classList.remove(this._card.icon.marked)
      },
    )
  }

  cardHandler(event) {
    const iconClass = this._card.icon.node.slice(1, this._card.icon.node.length)
    if (event.target.className.includes(iconClass)) {
      event.preventDefault()
      if (this.isLogged()) {
        if (event.target.className.includes(this._card.icon.marked)) {
          this.deleteArticle(event.target.getAttribute('UID'))
            .then(() => {
              event.target.classList.remove(this._card.icon.marked)
              event.target.removeAttribute('UID')
            })
            .catch((err) => {
              this.showError.show(err.message)
            })
          event.target.classList.remove(this._card.icon.marked)
        } else {
          this.saveArticle(this._news[event.target.getAttribute('cardID')])
            .then((res) => {
              event.target.classList.add(this._card.icon.marked)
              event.target.setAttribute('UID', res)
            })
            .catch((err) => {
              this.showError.show(err.message)
            })
        }
      }
    }
  }
}
