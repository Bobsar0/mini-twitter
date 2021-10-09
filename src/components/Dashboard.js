import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>Your Timeline</h3>
        <ul className='dashboard-list'>
          {this.props.tweetIds.map((id) => (
            <li key={id}>
              <div>
                <Tweet id={id}/>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

// takes in the state of our store, sorts the tweets by timestamp and return an object that has the tweets property id on it
// uses destructuring to get only the needed tweets slice from the store
function mapStateToProps({ tweets }) {
  return {
    tweetIds: Object.keys(tweets)
    .sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)