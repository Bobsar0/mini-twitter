import { RECEIVE_USERS } from "../actions/users";

// users reducer which modifies the state of the users object based on a dispatched action
// returns a new state
export default function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
      default:
        return state
  }
}