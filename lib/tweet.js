require('sugar')

class TweetWrapper {
  constructor (tweet) {
    Object.assign(this, tweet)
  }

  isRetweet () {
    this.text.startsWith("RT")
  }

  isReply () {
    this.text.startsWith("@")
  }

  containsMentions () {
    this.entities.user_mentions.length > 0
  }


  containsLinks () {
    this.entities.urls.length > 0
  }
}

module.exports = TweetWrapper
