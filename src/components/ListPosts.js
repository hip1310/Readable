import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';
import {Link, withRouter} from 'react-router-dom'
import {postVoteScore, deleteAPost} from '../actions'
import sortBy from 'sort-by'

class ListPosts extends Component {
  state = {
    selectedCategory : '',
    sortBy : ''
  }

  componentWillReceiveProps(newProps){
    this.getSelectedCategory(newProps)
  }

  // This method is used to keep data on the page even on refresh
  componentWillMount(){
    this.getSelectedCategory(this.props)
  }

  getSelectedCategory(props){
    const selectedCategory = props.match.params.category ?
                             props.match.params.category : ''
    this.setState((state) => ({selectedCategory}))
  }

  render() {
    console.log('ListPosts Component render')

    const {posts, categories, updateVote, deletePost} = this.props
    let filteredPosts = posts.filter((post) => (!post.deleted))

    if(this.state.selectedCategory !== ''){
      filteredPosts = filteredPosts.filter((post) => (
                        post.category === this.state.selectedCategory)
                      )
    }

    filteredPosts.sort(sortBy(this.state.sortBy))

    return (
      <div>
      <div className="App-header">
        <h1> Readable </h1>
      </div>
      <div className='container'>
        <Link to="/addpost">Add Post</Link> &nbsp;
        <select name="sortBy"
         value={this.state.sortBy}
         onChange={(e) => (this.setState({sortBy : e.target.value}))}>
          <option value="timestamp">Oldest</option>
          <option value="-timestamp">Newest</option>
          <option value="voteScore">Vote Score (low to high)</option>
          <option value="-voteScore">Vote Score (high to low)</option>
          <option value="title">Title</option>
        </select>
        <div className='posts'>
          <ul>
            {filteredPosts.map(post => (
              <li key={post.id}>
                <Link to={`/${post.category}/${post.id}`}>
                {post.title} - {post.author}
                </Link>
                <p>
                  ------ Comments {post.commentCount} Score {post.voteScore}
                  &nbsp;<button onClick={() => updateVote(post.id, 'upVote')}>Up</button>
                  &nbsp;<button onClick={() => updateVote(post.id, 'downVote')}>Down</button>
                </p>
                <p>
                  <Link to={`/post/${post.id}`}>Edit</Link> &nbsp;
                  <button onClick={() => deletePost(post.id)}>Delete</button>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className='categories'>
          <ul>
            <li><Link to="/">All</Link></li>
            {categories.map((category, i) => (
              <li key={i}>
                <Link to={category.path}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    );
  }
}

function mapStateToProps({posts, categories}){
  return {
    posts,
    categories
  }
}

function mapDispatchToProps(dispatch){
  return{
    updateVote : (id, option) => dispatch(postVoteScore(id, option)),
    deletePost : (id) => dispatch(deleteAPost(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts))
