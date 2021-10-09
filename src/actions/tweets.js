import { saveLikeToggle } from "../utils/api"

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'

// action creator
export function receiveTweets(tweets) {
  // the action
  return {
    type: RECEIVE_TWEETS,
    tweets,
  }
}

// action creator
function toggleTweet({ id, authedUser, hasLiked}) {
  // the action
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  }
}

// async action creator responsible for invoking saveLikeToggle function
export function handleToggleTweet(info) {
  // we're returning a function so we can dispatch whenever we would like (async)
  return (dispatch) => {
    // use optimistic update where the action is performed on the ui and only reversed when there's an issue saving to the database
    dispatch(toggleTweet(info))

    return saveLikeToggle(info)
    .catch((e) => {
      console.warn('Error in handleToggleTweet: ', e)
      dispatch(toggleTweet(info))
      alert('There was an error in liking the tweet. Try again')
    })
  }
}