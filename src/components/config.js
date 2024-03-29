const config = {
  url: 'https://api.tsitskun.tk',
  login: 'https://api.tsitskun.tk/signin',
  signup: 'https://api.tsitskun.tk/signup',
  logout: 'https://api.tsitskun.tk/logout',
  getUser: 'https://api.tsitskun.tk/users/me',
  articles: 'https://api.tsitskun.tk/articles',
  git: 'https://api.github.com/repos/derYpsilon/news-explorer-front/commits',
  maxGitCommits: 15,
  month: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа',
    'сентября', 'октября', 'ноября', 'декабря'],
  newsFeed: 'https://newsapi.org/v2/everything?sortBy=popularity&apiKey=61e9a15929844de49c00be490b903f34&language=ru&pageSize=100',
  results: {
    showStep: 3,
    showMore: { node: '#show-more', hide: 'results__button_hide' },
    resultsField: '.results__news',
    newsForm: '.header__form',
    newsFormSearchField: '.header__form-input',
    newsFormButton: '#search-the-news',
    preloader: { node: '#preloader-searching', hide: 'preloader__message_hide' },
    notFound: { node: '#preloader-not-found', hide: 'preloader__message_hide' },
    serverError: { node: '#preloader-server-error', hide: 'preloader__message_hide' },
    resultsSection: { node: '.results', hide: 'results_hide' },
  },
  cardSample: '#card-sample',
  card: {
    node: '.card',
    img: '.card__pic',
    date: '.card__date',
    title: '.card__title',
    text: '.card__text',
    src: '.card__src',
    warning: '.card__warning',
    keyword: '.card__keyword',
    icon: {
      node: '.card__icon',
      logged: 'card__icon_logged',
      marked: 'card__icon_marked',
      bin: 'card__icon_bin',
    },
  },
  collection: {
    collectionContainer: '.storage',
    articlesQty: '.articles-qty',
    articlesHeader: '.saved-title__header',
    words: {
      first: '.first-word',
      second: '.second-word',
      more: '.and-more',
      tail: '.word-tail',
    },
  },
  slider: {
    node: '.slider',
    commitDate: '.slider__commit-date',
    commitImage: '.slider__commit-image',
    commitName: '.slider__commit-name',
    commitEmail: '.slider__commit-email',
    commitText: '.slider__commit-text',
    template: '#commit-sample',
    swiperWrap: '.swiper-wrapper',
  },
}

export default config
