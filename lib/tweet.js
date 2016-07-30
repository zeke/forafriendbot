require('sugar')
const fs = require('fs')
const path = require('path')

class TweetWrapper {
  constructor (tweet) {
    Object.assign(this, tweet)
  }

  get isRetweet () {
    return this.text.startsWith("RT")
  }

  get isReply () {
    return this.text.startsWith("@")
  }

  get containsMentions () {
    return this.entities.user_mentions.length > 0
  }

  get containsLinks () {
    return this.entities.urls.length > 0
  }

  get isAboutNonWords () {
    const patterns = [
      'is not a word',
      'isn\'t a word',
      'ain\'t a word',
      'aint a word',
      'is not a real word',
      'isn\'t a real word',
      'ain\'t a real word',
      'aint a real word',
      'are not words',
      'are not real words',
      'ain\'t words',
      'aint words',
      'ain\'t real words',
      'aint real words'
    ]
    return !this.isRetweet
    && !this.isReply
    && !this.containsMentions
    && patterns.some(pattern => this.includes(pattern))
  }

  includes (string) {
    return !!this.text.toLowerCase().includes(string.toLowerCase())
  }

  save() {
    console.log('\n\n\n')
    console.log(this.id, this.text)
    fs.writeFileSync(
      path.join(__dirname, `../tweets/${this.id}.json`),
      JSON.stringify(this, null, 2)
    )
  }
}

module.exports = TweetWrapper
