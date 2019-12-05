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
    Array.from(Object.keys(this.stats)).forEach((item) => {
      if (!(this.stats[item] in theKeys)) {
        theKeys[this.stats[item]] = 1
      } else {
        theKeys[this.stats[item]] += 1
      }
    })
    const findMax = Array.from(Object.keys(theKeys))
    const max = {
      firstKey: findMax[0],
      secondKey: '',
      thirdKey: '',
      value: 0,
    }
    console.log(theKeys)
    for (let i = 0; i < findMax.length; i += 1) {
      if (theKeys[findMax[i]] > max.value) {
        max.value = theKeys[findMax[i]]
        max.thirdKey = max.secondKey
        max.secondKey = max.firstKey
        max.firstKey = findMax[i]
      }
    }
    return {
      firstKey: max.firstKey,
      secondKey: max.secondKey,
      thirdKey: max.thirdKey,
      total: findMax.length,
    }
  }

  updateStatistics() {
    this.articlesQty.textContent = `${Array.from(Object.keys(this.stats)).length} сохраненных статей`
    const keywords = this.keywordCount()
    console.log(keywords)
    document.querySelector(config.words.first).textContent = keywords.firstKey
    let tagLine = ''
    if (keywords.total === 3) {
      tagLine = `, ${keywords.secondKey}, ${keywords.thirdKey}`
    } else {
      tagLine = `, ${keywords.secondKey}`
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
