import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { Redirect } from 'react-router-dom'

// controlled component
// react is going to be in control of the text of the input field because we'll be updating the submit button based on the current state of the input field
class NewTweet extends Component{
  state = {
    text: '',
    toHome: false,
  }

  handleChange = (e) => {
    const text = e.target.value

    this.setState(() => ({
      text
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { text } = this.state
    const {dispatch, id } = this.props
    //add tweet to store
    dispatch(handleAddTweet(text, id))
    
    this.setState(() => ({
      text: '',
      toHome: id ? false : true // go to home page only when we're composing new tweet. id is valid only when we're replying to a tweet
    }))
  }

  render() {
    const { text, toHome } = this.state
    // todo: redirect to homeView if submitted

    if(toHome === true) {
      return <Redirect to='/' />
    }

    const maxLength = 280
    const tweetLeft = maxLength - text.length

    return (
      <div>
        <h3 className='center'>Compose new tweet</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={maxLength}
          />
          {tweetLeft <= 100 && (
            <div className='tweet-length'>
              {tweetLeft}
            </div>
          )}
          <button
            className='btn'
            type='submit'
            disabled={text===''}
          >Submit</button>
        </form>
      </div>
    )
  }
}

export default connect()(NewTweet)