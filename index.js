require('dotenv').load()

const Twit = require('twit')
const Tweet = require('./lib/tweet')
const Twitter = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

const stream = Twitter.stream('statuses/filter', {track: 'word'})

stream.on('tweet', (tweetData) => {
  let tweet = new Tweet(tweetData)
  process.stdout.write('.')
  if (tweet.isAboutNonWords) {
    tweet.save()
  }
})
