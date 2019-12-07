export default class CommitsLoader {
  constructor(url, maxGitCommits = 5) {
    this._commits = []
    this._gitURL = url
    this._maxGitCommits = maxGitCommits
  }

  getCommits() {
    return fetch(this._gitURL)
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка чтения из Git -- ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const total = Array.from(Object.keys(data)).length
        const commitsQty = total < this._maxGitCommits ? total : this._maxGitCommits
        for (let key = 0; key < commitsQty; key += 1) {
          this._commits.push({
            name: data[key].commit.committer.name,
            email: data[key].commit.committer.email,
            date: new Date(Date.parse(data[key].commit.committer.date)),
            message: data[key].commit.message,
            avatar: data[key].author.avatar_url,
          })
        }
        return this._commits
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }
}
