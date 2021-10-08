import { RECEIVE_TWEETS } from "../actions/tweets";

// tweets reducer which modifies the state of the tweetss object based on a dispatched action
export default function tweets (state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      }
      default:
        return state
  }
}