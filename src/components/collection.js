/* eslint-disable class-methods-use-this */
import config from './config'
import ShowError from '../blocks/common/error/error'

export default class Collection {
  constructor(isLogged, getAllArticles, deleteArticle, userName) {
    this.isLogged = isLogged
    this.getAllArticles = getAllArticles
    this.deleteArticle = deleteArticle
    this.userName = userName
    this.cardTemplate = document.querySelector(config.cardSample).content
    this.collectionContainer = document.querySelector(config.collectionContainer)
    this.articlesQty = document.querySelector(config.articlesQty)
    this.articlesHeader = document.querySelector(config.articlesHeader)
    this.showError = new ShowError()
    this.stats = {}

    this.collectionContainer.addEventListener('click', (event) => this.handleArticle(event))
    this.render()
  }

  render() {
    if (!this.isLogged) return
    this.getAllArticles()
      .then((res) => {
        this.articlesHeader.insertAdjacentText('afterbegin', this.userName)
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
    container.querySelector(config.card.node).href = data.link
    container.querySelector(config.card.img).style.backgroundImage = `url(${data.image})`
    container.querySelector(config.card.date)
      .textContent = `${data.date.getDate()} ${config.month[data.date.getMonth()]} ${data.date.getFullYear()}`
    container.querySelector(config.card.title).textContent = data.title
    container.querySelector(config.card.text).textContent = data.text
    container.querySelector(config.card.src).textContent = data.source
    container.querySelector(config.card.keyword).textContent = data.keyword
    container.querySelector(config.card.icon.node).setAttribute('UID', data._id)
    return container
  }

  keywordCount() {
    const theKeys = {}
    const sortedKeys = {}
    Array.from(Object.keys(this.stats)).forEach((item) => {
      if (!(this.stats[item] in theKeys)) {
        theKeys[this.stats[item]] = 1
      } else {
        theKeys[this.stats[item]] += 1
      }
    })
    Array.from(Object.keys(theKeys)).forEach((item) => {
      sortedKeys[theKeys[item]] = item
    })
    const fromMaxToMin = Array.from(Object.keys(sortedKeys))
    fromMaxToMin.sort((a, b) => b - a)

    return {
      firstKey: sortedKeys[fromMaxToMin[0]],
      secondKey: sortedKeys[fromMaxToMin[1]],
      thirdKey: sortedKeys[fromMaxToMin[2]],
      total: Array.from(Object.keys(theKeys)).length,
    }
  }

  updateStatistics() {
    this.articlesQty.textContent = `${Array.from(Object.keys(this.stats)).length} сохраненных статей`
    const keywords = this.keywordCount()

    document.querySelector(config.words.first).textContent = keywords.firstKey
    let tagLine = ''
    if (keywords.total === 3) {
      tagLine = `, ${keywords.secondKey}, ${keywords.thirdKey}`
    } else {
      tagLine = keywords.total === 1 ? '' : `, ${keywords.secondKey}`
    }
    document.querySelector(config.words.second).textContent = tagLine
    document.querySelector(config.words.tail).style.display = keywords.total > 3 ? 'auto' : 'none'
    document.querySelector(config.words.more).textContent = keywords.total - 2
  }

  handleArticle(event) {
    const iconClass = config.card.icon.node.slice(1, config.card.icon.node.length)
    if (event.target.className.includes(iconClass)) {
      event.preventDefault()
      this.deleteArticle(event.target.getAttribute('UID'))
        .then(() => {
          delete this.stats[event.target.getAttribute('UID')]
          this.collectionContainer.removeChild(event.target.closest(config.card.node))
          this.updateStatistics()
        })
        .catch((err) => {
          this.showError.show(err.message)
        })
    }
  }
}
