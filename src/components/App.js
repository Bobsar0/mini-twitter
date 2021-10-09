import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
import LoadingBar from 'react-redux-loading-bar'

class App extends Component {
  componentDidMount() {
    // dispatch the invocation of the handleInitialData action creator
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loading === true ? null : <TweetPage match={{params: {id: '1zf0y6ziyjabvozdd253ne'}}} />}
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

// add connect to have access to dispatch
export default connect(mapStateToProps)(App)