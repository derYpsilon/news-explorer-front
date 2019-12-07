export default class CommitsRender {
  constructor(swiper, getCommits, { month, maxGitCommits, slider }) {
    this._getCommits = getCommits
    this._slider = slider
    this._month = month
    this._maxGitCommits = maxGitCommits
    this._swiperUpdate = swiper
    this._cardTemplate = document.querySelector(this._slider.template).content
  }

  init() {
    this._getCommits()
      .then((data) => {
        this.renderCommits(data)
      })
      .catch((err) => {
        console.log(err.message)
        // Если коммиты не получены, скрываем весь блок с коммитами совсем
        document.querySelector(this._slider.node).style.display = 'none'
      })
  }

  buildCommit(data) {
    const container = this._cardTemplate.cloneNode(true)

    container.querySelector(this._slider.commitDate)
      .textContent = `${data.date.getDate()} ${this._month[data.date.getMonth()]} ${data.date.getFullYear()}`
    container.querySelector(this._slider.commitImage).src = data.avatar
    container.querySelector(this._slider.commitName).textContent = data.name
    container.querySelector(this._slider.commitEmail).textContent = data.email
    container.querySelector(this._slider.commitText).textContent = data.message
    return container
  }

  renderCommits(data) {
    const container = document.createDocumentFragment()
    data.forEach((item) => {
      container.appendChild(this.buildCommit(item))
    })
    document.querySelector(this._slider.swiperWrap).appendChild(container)
    this._swiperUpdate()
  }
}
