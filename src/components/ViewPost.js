import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {postVoteScore} from '../actions'

class ViewPost extends Component{
  state = {
  	post : {}
  }

  componentWillMount(){
    console.log('ViewPost componentWillMount')
    this.getCurrPostFromId(this.props)
  }

  // This method is used to keep data on the page even on refresh
  componentWillReceiveProps(newProps){
    console.log('ViewPost componentWillReceiveProps')
    this.getCurrPostFromId(newProps)
  }

  getCurrPostFromId(props){
    const id = props.match.params.postid ?
                   props.match.params.postid : null
    console.log('ViewPost: postid ' + id)
    if(id !== null){
      const currPost = props.posts.find(function(post)
                       { return post.id === id })
      console.log('ViewPost: currPost ' + currPost)
      if(currPost) {this.setState((state) => ({
        post : currPost
      }))}
    }
  }
  
  render(){
  	console.log('ViewPost render()')
  	const post = this.state.post
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
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewPost))
