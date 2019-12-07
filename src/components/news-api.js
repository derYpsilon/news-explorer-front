export default class NewsApi {
  constructor(newsFeed) {
    this._newsFeed = newsFeed
    this._news = []
  }

  getNews(query) {
    const dateNow = new Date()
    const sevenDays = 7 * 24 * 3600 * 1000
    const dateWeekAgo = new Date(dateNow - sevenDays)
    const dateTo = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`
    const dateFrom = `${dateWeekAgo.getFullYear()}-${dateWeekAgo.getMonth() + 1}-${dateWeekAgo.getDate()}`
    const url = `${this._newsFeed}&q=${query}&from=${dateFrom}&to=${dateTo}`
    return fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Can not read news feed')
        return res.json()
      })
      .then((data) => {
        for (let i = 0; i < data.articles.length; i += 1) {
          this._news.push({
            source: data.articles[i].source.name,
            title: data.articles[i].title,
            date: new Date(Date.parse(data.articles[i].publishedAt)),
            text: data.articles[i].description,
            image: data.articles[i].urlToImage,
            link: data.articles[i].url,
            keyword: query,
          })
        }
        return this._news
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }
}
