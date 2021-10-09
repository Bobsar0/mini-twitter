import { saveLikeToggle , saveTweet} from "../utils/api"
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

// action creator
function addTweet(tweet) {
  // the action
  return {
    type: ADD_TWEET,
    tweet,
  }
}

// async action creator
export function handleAddTweet(text, replyingTo) {
  // the action
  return async (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    const tweet = await saveTweet({
      text,
      author: authedUser,
      replyingTo
    })
    dispatch(addTweet(tweet))
    return dispatch(hideLoading())
  }
}

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