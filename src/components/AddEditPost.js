import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import serializeForm from 'form-serialize'
import{
  Grid,
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap/lib'

class AddEditPost extends Component{
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
    this.getCurrPostFromId(this.props)
  }

  // This method is used to keep data on the page even on refresh
  componentWillReceiveProps(newProps){
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
    const {categories} = this.props

    return(
      <Grid>
        <p> <Link to="/"><Button bsStyle="primary"> Back </Button></Link> </p>
        {this.props.match.params.postid && !this.state.id ?
          <h1>No post found to be edited...</h1>
        :
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>Title</ControlLabel>
            <FormControl type="text" name="title"
             placeholder="Post Title" value={this.state.title}
             pattern="^\S.*$" required title="Title is required"
             onChange={(e) => (this.setState({title : e.target.value}))}/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Author</ControlLabel>
            <FormControl type="text" name="author"
              placeholder="Post Author" value={this.state.author}
              pattern="^\S.*$" required title="Author is required"
              onChange={(e) => (this.setState({author : e.target.value}))}/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Post Contents</ControlLabel>
            <FormControl componentClass="textarea" name="body" rows="20"
              placeholder="Post Contents" value={this.state.body} required
              onChange={(e) => (this.setState({body : e.target.value}))}/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Category</ControlLabel>
            <FormControl componentClass="select" name="category" required
             value={this.state.category} lg={10}
             onChange={(e) => (this.setState({category : e.target.value}))}>
              <option value="">Select Category</option>
              {categories.map((category, i) =>
                <option key={i} value={category.name}>{category.name}</option>
              )}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <Button type="submit" bsStyle="primary">Submit</Button>
          </FormGroup>
        </Form>}
      </Grid>
    )
  }
}

function mapStateToProps({posts, categories}){
  return {
    posts,
    categories
  }
}

export default withRouter(connect(mapStateToProps)(AddEditPost))
