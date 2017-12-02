import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {postVoteScore} from '../actions'
import {getComments, updateVoteScore} from '../utils/api.js'

class ViewPost extends Component{
  state = {
    post : {},
    comments : []
  }

  // This method is used to keep data on the page even on refresh
  componentWillReceiveProps(newProps){
    console.log('ViewPost componentWillReceiveProps')
    this.getCurrPostAndComments(newProps)
  }

  componentDidMount(){
    console.log('ViewPost componentDidMount')
    this.getCurrPostAndComments(this.props)
  }

  getCurrPostAndComments(props){
    const id = props.match.params.postid ?
                   props.match.params.postid : null
    console.log('ViewPost: postid ' + id)
    let currPost = null
    if(id !== null){
      currPost = props.posts.find(function(post)
                       { return post.id === id })
      console.log('ViewPost: currPost ' + currPost)
      if(currPost) {this.setState((state) => ({
        post : currPost
      }))}

      if(currPost && currPost.commentCount > 0){ getComments(currPost.id).then(comments =>
        this.setState(state => ({comments})))}
    }
  }

  updateCommentVote(id, option){
    updateVoteScore('comments', id, option).then(updatedComment =>
      this.setState(state => ({
        comments : state.comments.filter(comment => comment.id !== updatedComment.id).concat([updatedComment])
    })))
  }

  render(){
  	console.log('ViewPost render()')
    const {post, comments} = this.state
  	const {updateVote, onDeletePost} = this.props

    return(
      <div>
        <p> <Link to="/"> Back </Link> </p>
        <p>{post.category}</p>
        <p>{post.title}  -  {post.author}</p>
        <p>{post.body}</p>
        <p>
          --------------------- Votes {post.voteScore}
          &nbsp;<button onClick={() => updateVote(post.id, 'upVote')}>Up</button>
          &nbsp;<button onClick={() => updateVote(post.id, 'downVote')}>Down</button>
        </p>
        <p>
          <Link to={`/post/${post.id}`}>Edit</Link> &nbsp;
          <button onClick={() => onDeletePost(post.id)}>Delete</button>
        </p>
        <p>Comments ({post.commentCount})</p>
        <ul>
          {comments && comments.map(comment =>
            <li key={comment.id}>
              <p> {comment.body} - {comment.author} </p>
              <p>
                ---------------- Score {comment.voteScore}
                &nbsp;<button onClick={() => this.updateCommentVote(comment.id, 'upVote')}>Up</button>
                &nbsp;<button onClick={() => this.updateCommentVote(comment.id, 'downVote')}>Down</button>
              </p>
            </li>
          )}
        </ul>
      </div>
  	)
  }
}

function mapStateToProps({posts}){
  return {
    posts
  }
}

function mapDispatchToProps(dispatch){
  return{
    updateVote : (id, option) => dispatch(postVoteScore(id, option))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewPost))
