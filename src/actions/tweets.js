export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'

// action creator
export function receiveTweets(tweets) {
  // the action
  return {
    type: RECEIVE_TWEETS,
    tweets,
  }
}