// logger is assigned to a function that takes the store as its argument.
// The function returns another function, which is passed next(the next middleware in line or the dispatch function)
// That other function then returns a third funtion which is passed an action. Once inside that third function, we have access to store, next and action

// The value of the next parameter function will be determined by the applyMiddleware function as all middleware will be called in the order it is listed in that function. 

const logger = (store) => (next) => (action) => {
  console.group(action.type)
    console.log('The action: ', action)
    const returnValue = next(action)
    console.log('The new state: ', store.getState())
  console.groupEnd()
  return returnValue
}

export default logger