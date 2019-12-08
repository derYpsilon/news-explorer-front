/* eslint-disable class-methods-use-this */
export default class Collection {
  constructor(getAllArticles, deleteArticle,
    {
      cardSample, collection, card, month,
    }, showError) {
    this._cfg = collection
    this._month = month
    this._card = card
    this.getAllArticles = getAllArticles
    this.deleteArticle = deleteArticle
    this.cardTemplate = document.querySelector(cardSample).content
    this.collectionContainer = document.querySelector(this._cfg.collectionContainer)
    this.articlesQty = document.querySelector(this._cfg.articlesQty)
    this.articlesHeader = document.querySelector(this._cfg.articlesHeader)
    this.showError = showError
    this.stats = {}

    this.collectionContainer.addEventListener('click', (event) => this.handleArticle(event))
    this.render()
  }

  isLogged() {
    return Boolean(this.userName())
  }

  userName() {
    return localStorage.getItem('user')
  }

  render() {
    if (!this.isLogged) return
    this.getAllArticles()
      .then((res) => {
        this.articlesHeader.insertAdjacentText('afterbegin', this.userName())
        Array.from(res).forEach((item) => {
          this.stats[item._id] = item.keyword
          // eslint-disable-next-line no-param-reassign
          item.date = new Date(Date.parse(item.date))
          this.collectionContainer.appendChild(this.buildCard(item))
        })
        this.updateStatistics()
      })
      .catch((err) => this.showError.show(err.message))
  }

  buildCard(data) {
    const container = this.cardTemplate.cloneNode(true)
    container.querySelector(this._card.node).href = data.link
    container.querySelector(this._card.img).style.backgroundImage = `url(${data.image})`
    container.querySelector(this._card.date)
      .textContent = `${data.date.getDate()} ${this._month[data.date.getMonth()]} ${data.date.getFullYear()}`
    container.querySelector(this._card.title).textContent = data.title
    container.querySelector(this._card.text).textContent = data.text
    container.querySelector(this._card.src).textContent = data.source
    container.querySelector(this._card.keyword).textContent = data.keyword
    container.querySelector(this._card.icon.node).setAttribute('UID', data._id)
    return container
  }

  keywordCount() {
    const theKeys = {}
    const popular = { words: [], key: '', max: 0 }
    Array.from(Object.keys(this.stats)).forEach((item) => {
      if (!(this.stats[item] in theKeys)) {
        theKeys[this.stats[item]] = 1
      } else {
        theKeys[this.stats[item]] += 1
      }
    })
    const total = Array.from(Object.keys(theKeys)).length
    const turns = total >= 3 ? 3 : total
    for (let i = 0; i < turns; i += 1) {
      Array.from(Object.keys(theKeys)).forEach((item) => {
        if (popular.max < theKeys[item]) {
          popular.max = theKeys[item]
          popular.key = item
        }
      })
      delete theKeys[popular.key]
      popular.words.push(popular.key)
      popular.max = 0
      popular.key = ''
    }

    return {
      popular: popular.words,
      total,
    }
  }

  updateStatistics() {
    this.articlesQty.textContent = `${Array.from(Object.keys(this.stats)).length} сохраненных статей`
    const keywords = this.keywordCount()

    document.querySelector(this._cfg.words.first).textContent = keywords.total >= 1 ? keywords.popular.shift() : ''
    let tagLine = ''
    if (keywords.total === 3) {
      tagLine = `, ${keywords.popular.shift()}, ${keywords.popular.shift()}`
    } else {
      tagLine = keywords.total <= 1 ? '' : `, ${keywords.popular.shift()}`
    }
    document.querySelector(this._cfg.words.second).textContent = tagLine
    document.querySelector(this._cfg.words.tail).style.display = keywords.total > 3 ? 'auto' : 'none'
    document.querySelector(this._cfg.words.more).textContent = keywords.total - 2
  }

  handleArticle(event) {
    const iconClass = this._card.icon.node.slice(1, this._card.icon.node.length)
    if (event.target.className.includes(iconClass)) {
      event.preventDefault()
      this.deleteArticle(event.target.getAttribute('UID'))
        .then(() => {
          delete this.stats[event.target.getAttribute('UID')]
          this.collectionContainer.removeChild(event.target.closest(this._card.node))
          this.updateStatistics()
        })
        .catch((err) => {
          this.showError.show(err.message)
        })
    }
  }
}
