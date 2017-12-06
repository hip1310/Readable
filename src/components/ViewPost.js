import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {postVoteScore, updatePost} from '../actions'
import{
getComments,
updateVoteScore,
deleteComment,
editComment,
addNew
} from '../utils/api.js'
import serializeForm from 'form-serialize'

class ViewPost extends Component{
  state = {
    post : {},
    comments : [],
    editComment : ''
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
      if(currPost) {
        if(currPost.commentCount > 0){
          getComments(currPost.id).then(comments =>
            this.setState(state => ({
              comments,
              post : currPost
          })))
        }
        else{
          this.setState((state) => ({post : currPost, comments : []}))
        }
      }
    }
  }

  updateCommentVote(id, option){
    updateVoteScore('comments', id, option).then(updatedComment =>
      this.setState(state => ({
        comments : state.comments.filter(comment => comment.id !== updatedComment.id).concat([updatedComment])
    })))
  }

  deleteAComment(id){
    let currPost = this.state.post
    currPost.commentCount = currPost.commentCount - 1
    deleteComment(id).then(comment => this.setState(state => ({
      comments : state.comments.filter(currComment => currComment.id !== comment.id),
      post : currPost
    })))
  }

  editAComment(id){
    if(!this.editBox.value) return

    editComment(id, this.editBox.value).then((updatedComment) =>
      this.setState(state => ({
        comments : state.comments.map(comment =>
          (comment.id === updatedComment.id) ? comment = updatedComment : comment),
        editComment : ''
    })))
  }

  // Handle submission of new comment
  handleSubmit = (e) => {
    e.preventDefault()
    let values = serializeForm(e.target, {hash: true})
    values.parentId = this.state.post.id
    e.target.reset()
    let currPost = this.state.post
    currPost.commentCount = currPost.commentCount + 1
    addNew("comments", values).then(comment => this.setState(state => ({
      comments : state.comments.concat([comment]),
      post : currPost
    })))
  }

  render(){
    console.log('ViewPost render()')
    const {post, comments, editComment} = this.state
    const {updateVote, onDeletePost} = this.props

    let filteredComments = comments.filter((comment) => (!comment.deleted))

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
          <form onSubmit={this.handleSubmit}>
          <p>
            <textarea name="body" rows="3" cols="50" placeholder="Write a comment..."
             required/>
          </p>
          <p>
            <input type="text" name="author" placeholder="Comment Author"
              required/>
          </p>
          <button>Submit</button>
          </form>
        <ul>
          {filteredComments && filteredComments.map(comment =>
            editComment && editComment === comment.id ?
            <li key={comment.id}>
              <p>
                <textarea name="body" rows="3" cols="50" placeholder="Edit Comment"
                 defaultValue={comment.body} required
                 ref={(input) => this.editBox = input}/>
              </p>
              <p>
                <button onClick={() => this.editAComment(comment.id)}>Save</button>
                <button onClick={() => this.setState(state => ({editComment : ''}))}>Cancel</button>
              </p>

            </li>
            :
            <li key={comment.id}>
              <p> {comment.body} - {comment.author} </p>
              <p>
                ---------------- Score {comment.voteScore}
                &nbsp;<button onClick={() => this.updateCommentVote(comment.id, 'upVote')}>Up</button>
                &nbsp;<button onClick={() => this.updateCommentVote(comment.id, 'downVote')}>Down</button>
              </p>
              <p>
                <button onClick={() => this.setState(state => ({editComment : `${comment.id}`}))}>Edit</button>
                &nbsp; <button onClick={() => this.deleteAComment(comment.id)}>Delete</button>
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
    updateVote : (id, option) => dispatch(postVoteScore(id, option)),
    updateCommentCount : (post) => dispatch(updatePost({post}))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewPost))
