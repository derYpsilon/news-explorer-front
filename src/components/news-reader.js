/* eslint-disable class-methods-use-this */
import config from './config'

export default class NewsReader {
  constructor() {
    this.news = []
    this.cardTemplate = document.querySelector('#card-sample').content
  }

  getNews() {
    const dateNow = new Date()
    const dateWeekAgo = new Date(dateNow - 7 * 24 * 3600 * 1000)
    const dateTo = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`
    const dateFrom = `${dateWeekAgo.getFullYear()}-${dateWeekAgo.getMonth() + 1}-${dateWeekAgo.getDate()}`
    const q = 'турция'
    const url = `${config.newsFeed}&q=${q}&from=${dateFrom}&to=${dateTo}`
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Can not read news feed')
        return res.json()
      })
      .then((data) => {
        for (let i = 0; i < data.articles.length; i += 1) {
          this.news.push({
            source: data.articles[i].source.name,
            title: data.articles[i].title,
            date: new Date(Date.parse(data.articles[i].publishedAt)),
            description: data.articles[i].description,
            img: data.articles[i].urlToImage,
            url: data.articles[i].url,
          })
        }
        this.renderCard(this.news[0])
        this.renderCard(this.news[1])
        this.renderCard(this.news[2])
        this.renderCard(this.news[3])
        this.renderCard(this.news[4])
      })
      .catch((err) => {
        console.log(err.message)
      })
    // console.log(this.news)
  }

  buildCard(data) {
    const container = this.cardTemplate.cloneNode(true)
    container.querySelector('.card').href = data.url
    container.querySelector('.card__pic').style.backgroundImage = `url(${data.img})`
    container.querySelector('.card__date')
      .textContent = `${data.date.getDate()} ${config.month[data.date.getMonth()]} ${data.date.getFullYear()}`
    container.querySelector('.card__title').textContent = data.title
    container.querySelector('.card__text').textContent = data.description
    container.querySelector('.card__src').textContent = data.source
    return container
  }

  renderCard(data) {
    const container = document.createDocumentFragment()
    container.appendChild(this.buildCard(data))
    document.querySelector('.results__news').appendChild(container)
  }
}
