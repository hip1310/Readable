import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import serializeForm from 'form-serialize'

class AddPost extends Component{
  state = {
    id       : null,
    title    : '',
    author   : '',
    body     : '',
    category : ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})
    if(this.props.onCreatePost) this.props.onCreatePost(values)
    if(this.state.id) this.props.onEditPost(this.state.id, values)
  }

  componentWillMount(){
    console.log('AddPost componentWillMount')
    this.getCurrPostFromId(this.props)
  }

  // This method is used to keep data on the page even on refresh
  componentWillReceiveProps(newProps){
    console.log('AddPost componentWillReceiveProps')
    this.getCurrPostFromId(newProps)
  }

  getCurrPostFromId(props){
    const id = props.match.params.postid ?
                   props.match.params.postid : null
    if(id !== null){
      const currPost = props.posts.find(function(post)
                       { return post.id === id })
      if(currPost) {this.setState((state) => ({
        id,
        title    : currPost.title,
        author   : currPost.author,
        body     : currPost.body,
        category : currPost.category
      }))}
    }
  }

  render(){
    console.log('AddPost render()')
    const {categories} = this.props

    return(
      <div>
        <p> <Link to="/"> Back </Link> </p>
        <p> Add New Post </p>
        <form onSubmit={this.handleSubmit}>
          <p> Title <br></br>
            <input type="text" name="title" placeholder="Post Title"
             value={this.state.title} required
             onChange={(e) => (this.setState({title : e.target.value}))}/>
          </p>
          <p> Author <br></br>
            <input type="text" name="author" placeholder="Post Author"
             value={this.state.author} required
             onChange={(e) => (this.setState({author : e.target.value}))}/>
          </p>
          <p>
            <textarea name="body" rows="10" cols="50" placeholder="Post Contents"
             value={this.state.body} required
             onChange={(e) => (this.setState({body : e.target.value}))}/>
          </p>
          <p> Category &nbsp;
            <select name="category" required
             value={this.state.category}
             onChange={(e) => (this.setState({category : e.target.value}))}>
              <option value="">Select Category</option>
              {categories.map((category, i) =>
                <option key={i} value={category.name}>{category.name}</option>
              )}
            </select>
          </p>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({posts, categories}){
  return {
    posts,
    categories
  }
}

export default withRouter(connect(mapStateToProps)(AddPost))
