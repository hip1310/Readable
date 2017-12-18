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
import {getDateString} from '../utils/utils'
import{
  Grid,
  Row,
  ListGroup,
  ListGroupItem,
  Glyphicon,
  Button,
  Form,
  FormGroup,
  FormControl
} from 'react-bootstrap/lib'

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
      else{
        this.setState((state) => ({post : currPost, comments : []}))
      }
    }
  }

  updateCommentVote(id, option){
    updateVoteScore('comments', id, option).then(updatedComment =>
      this.setState(state => ({
        comments : state.comments.map(comment => (comment.id === updatedComment.id) ? comment = updatedComment : comment)
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
      <Grid>
        <Row>
        <Link to="/"><Button bsStyle="primary"> Back </Button></Link>
        </Row>
        {post ?
        <Row>
        <h1 className="mt-4">{post.title}</h1>
        <div className="bottom-line my-4 lead">
          <div className="my-4-1">by {post.author} </div>
          <div className="my-4-2">Category: {post.category} </div>
        </div>
        <div className="bottom-line">
          <div className="my-4 pb-5">
            <div className="my-4-1">
              {getDateString(post.timestamp)}
            </div>
            <div className="my-4-2">
              <span className="mr-20">
                <button onClick={() => updateVote(post.id, 'upVote')}>
                  <Glyphicon glyph="thumbs-up"/>
                </button>
                <span className="fixspan">{post.voteScore}</span>
                <button onClick={() => updateVote(post.id, 'downVote')}>
                  <Glyphicon glyph="thumbs-down"/>
                </button>
              </span>
              <span>
                <Link className="mr-10" to={`/post/${post.id}`}>
                  <Glyphicon glyph="edit"/>
                </Link>
                <button onClick={() => onDeletePost(post.id)}>
                  <Glyphicon glyph="trash"/>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 bottom-line">
          {post.body && post.body.split('\n').map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        </div>
        <div className="card mt-4 width-fix">
          <h5 className="card-header">Leave a comment:</h5>
          <div className="card-body">
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <FormControl componentClass="textarea" name="body"
                 rows="5" placeholder="Write a comment..." required/>
              </FormGroup>
              <FormGroup>
                <FormControl type="text" name="author"
                 placeholder="Comment Author" required
                 pattern="^\S.*$" title="Author is required"/>
              </FormGroup>
              <Button type="submit" bsStyle="primary">Submit</Button>
            </Form>
          </div>
        </div>
        <label className="mt-4"><p>Comments ({post.commentCount})</p></label>
        <ListGroup className="media-list width-fix">
          {filteredComments && filteredComments.map(comment =>
            editComment && editComment === comment.id ?
            <ListGroupItem key={comment.id} className="media mt-4">
              <p>
                <textarea className="round-border" name="body" rows="3"
                 placeholder="Edit Comment" defaultValue={comment.body}
                 required ref={(input) => this.editBox = input}/>
              </p>
              <p>
                <Button bsStyle="primary" className="mr-5" onClick={() => this.editAComment(comment.id)}>
                  Save
                </Button>
                <Button onClick={() => this.setState(state => ({editComment : ''}))}>
                  Cancel
                </Button>
              </p>
            </ListGroupItem>
            :
            <ListGroupItem key={comment.id} className="media mt-4">
              <div>
                <div className="media-left">
                  <p>
                    <Button bsStyle="primary" onClick={() => this.updateCommentVote(comment.id, 'upVote')}>
                      <Glyphicon glyph="triangle-top"/>
                    </Button>
                  </p>
                  <p className="comment-score">{comment.voteScore}</p>
                  <p>
                    <Button bsStyle="primary" onClick={() => this.updateCommentVote(comment.id, 'downVote')}>
                      <Glyphicon glyph="triangle-bottom"/>
                    </Button>
                  </p>
                </div>
                <div className="media-body">
                  <p>{comment.body}</p>
                </div>
              </div>
              <div className="media-footer">
                <div className="my-4-1">
                  Posted on {getDateString(comment.timestamp)} by {comment.author}
                </div>
                <div className="my-4-2">
                  <button className="mr-5" onClick={() => this.setState(state => ({editComment : `${comment.id}`}))}>
                    <Glyphicon glyph="edit"/>
                  </button>
                  <button onClick={() => this.deleteAComment(comment.id)}>
                    <Glyphicon glyph="trash"/>
                  </button>
                </div>
              </div>
            </ListGroupItem>
          )}
        </ListGroup>
        </Row>
        : <h1>Post not found...</h1>}
      </Grid>
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
