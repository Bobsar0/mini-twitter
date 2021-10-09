import React, { Component } from 'react';
import { connect } from 'react-redux'
import {formatTweet, formatDate} from '../utils/helpers'
import { IoArrowUndoOutline, IoHeart, IoHeartOutline }from 'react-icons/io5'
import { handleToggleTweet } from '../actions/tweets'

class Tweet extends Component {
  handleLike = (e) => {
    e.preventDefault()
    
    const {dispatch, tweet, authedUser } = this.props
    dispatch(handleToggleTweet({
      id: tweet.id,
      hasLiked: tweet.hasLiked,
      authedUser
    }))
  }

  toParent = (e, id) => {
    e.preventDefault()
    //todo: redirect to parent tweet
  }

  render() {
    const { tweet } = this.props

    if(tweet === null) {
      return <p>This Tweet doesn't exist</p>
    }
    const {
      name, avatar, timestamp, text, hasLiked, likes, replies, parent
    } = tweet

    return (
      <div className='tweet'>
        <img src={avatar} alt={`Avatar of {name}`} className='avatar'/>
        <div className='tweet-info'>
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className='tweet-icons'>
            <IoArrowUndoOutline className='tweet-icon'/>
            <span>{replies !== 0 && replies}</span>
            <button className='heart-button' onClick={this.handleLike}>
              {hasLiked === true 
              ? <IoHeart color='#e0245e' className='tweet-icon' />
              : <IoHeartOutline className='tweet-icon' />}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>

        
      </div>
    )
  }
}

// state {authedUser, users, tweets} is coming from redux store
// id is a prop to be passed to the Tweet component whenever it's called
function mapStateToProps({authedUser, users, tweets}, {id}) {
  const tweet = tweets[id]
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null

  return {
    authedUser,
    tweet: tweet 
    ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) 
    : null
  }
}

// connect Component to Redux state
export default connect(mapStateToProps)(Tweet)