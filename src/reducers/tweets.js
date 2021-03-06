import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from "../actions/tweets";

// tweets reducer which modifies the state of the tweets object based on a dispatched action
export default function tweets (state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      }
    case TOGGLE_TWEET:
      return {
        ...state,
        //get tweet with the id of whatever we're passing into action id to be a new object
        [action.id]: {
          ...state[action.id],
          // add or remove username based on whether they have liked the tweet
          likes: action.hasLiked === true
          ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
          : state[action.id].likes.concat([action.authedUser])
        }
      }
    case ADD_TWEET:
      const { tweet } = action

      let replyingTo = {}
      if (tweet.replyingTo !== null) {
        replyingTo = {
          [tweet.replyingTo]: {
            ...state[tweet.replyingTo],
            replies: state[tweet.replyingTo].replies.concat([tweet.id])
          }
        }
      }

      return {
        ...state,
        [action.tweet.id] : action.tweet,
        ...replyingTo
      }
      default:
        return state
  }
}