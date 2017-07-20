import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends Component {
  constructor () {
    super()
    this.state = {
      comments: []
    }
  }

  componentWillMount () {
    this._loadComments()
  }

  _loadComments () {
    let comments = localStorage.getItem('comments')
    if (comments) {
      comments = JSON.parse(comments)
      this.setState({ comments })
    }
  }

  _saveComments (comments) {
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  handleSubmitComment (comment) {
    if (!comment) return
    if (!comment.username) return alert('Please enter your username')
    if (!comment.content) return alert('Please enter your comment')
    const comments = this.state.comments
    comments.push(comment)
    this.setState({ comments })
    this._saveComments(comments)
  }

  handleDeleteComment (index) {
    const comments = this.state.comments
    comments.splice(index, 1)
    this.setState({ comments })
    this._saveComments(comments)
  }

  render() {
    return (
      <div>
        <Header />
        <div className='wrapper'>
          <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
          <CommentList
            comments={this.state.comments}
            onDeleteComment={this.handleDeleteComment.bind(this)} />
        </div>
        <Footer />
      </div>
    )
  }
}

export default CommentApp