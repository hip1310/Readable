import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';
import {Link, withRouter} from 'react-router-dom'
import {postVoteScore, deleteAPost} from '../actions'
import sortBy from 'sort-by'
import {getDateString} from '../utils/utils'
import {
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Glyphicon
} from 'react-bootstrap/lib'

class ListPosts extends Component {
  state = {
    selectedCategory : '',
    sortBy : ''
  }

  // This method is used to keep data on the page even on refresh
  componentWillReceiveProps(newProps){
    this.getSelectedCategory(newProps)
  }

  componentWillMount(){
    this.getSelectedCategory(this.props)
  }

  getSelectedCategory(props){
    const selectedCategory = props.match.params.category ?
                             props.match.params.category : ''
    this.setState((state) => ({selectedCategory}))
  }

  render() {
    const {posts, categories, updateVote, deletePost} = this.props
    let filteredPosts = posts.filter((post) => (!post.deleted))

    if(this.state.selectedCategory !== ''){
      filteredPosts = filteredPosts.filter((post) => (
                        post.category === this.state.selectedCategory)
                      )
    }

    if(this.state.sortBy !== '') filteredPosts.sort(sortBy(this.state.sortBy))

    return (
      <Grid>
        <Row>
          <Col lg={8} md={8}>
            <div className="my-4">
              <div className="my-4-1">
                <Link to="/addpost">
                  <Button bsStyle="primary">
                    <Glyphicon className="mr-5" glyph="plus"/>Add Post
                  </Button>
                </Link>
              </div>
              <div className="my-4-2">
                <label> <strong> Sort-by </strong> </label>
                <select className="round-border" name="sortBy" value={this.state.sortBy}
                 onChange={(e) => (this.setState({sortBy : e.target.value}))}>
                  <option value="timestamp">Oldest</option>
                  <option value="-timestamp">Newest</option>
                  <option value="title">Title</option>
                  <option value="voteScore">Vote Score (low to high)</option>
                  <option value="-voteScore">Vote Score (high to low)</option>
                </select>
              </div>
            </div>
            <div>
                {filteredPosts.length > 0 ? filteredPosts.map(post => (
                  <div className="card mt-4" key={post.id}>
                    <div className="card-body">
                      <Link to={`/${post.category}/${post.id}`}>
                        <h2 className="card-title">{post.title}</h2>
                      </Link>
                      <p className="card-text">
                        {post.body.split('\n')[0].slice(0,200) + '...'}
                      </p>
                      <p className="card-utils">
                        <span className="mr-10"><Glyphicon glyph="comment"/>
                          <span className="fixspan">{post.commentCount}</span>
                        </span>
                        <span>
                          <button onClick={() => updateVote(post.id, 'upVote')}>
                            <Glyphicon glyph="thumbs-up"/>
                          </button>
                          <span className="fixspan">{post.voteScore}</span>
                          <button onClick={() => updateVote(post.id, 'downVote')}>
                            <Glyphicon glyph="thumbs-down"/>
                          </button>
                        </span>
                      </p>
                    </div>
                    <div className="card-footer">
                      <div className="my-4-1">
                        Posted on {getDateString(post.timestamp)} by {post.author}
                      </div>
                      <div className="my-4-2">
                        <Link className="mr-10" to={`/post/${post.id}`}>
                          <Glyphicon glyph="edit"/>
                        </Link>
                        <button onClick={() => deletePost(post.id)}>
                          <Glyphicon glyph="trash"/>
                        </button>
                      </div>
                    </div>
                  </div>
                )) :
                <h1> No posts </h1>}
            </div>
          </Col>
          <Col lg={4} md={4}>
              <ListGroup className="list-unstyled">
                  <ListGroupItem className="card-header">
                    <h5>Categories</h5>
                  </ListGroupItem>
                  <ListGroupItem><Link to="/">All</Link></ListGroupItem>
                  {categories.map((category, i) => (
                    <ListGroupItem key={i}>
                      <Link to={category.path}>{category.name}</Link>
                    </ListGroupItem>
                  ))}
              </ListGroup>
          </Col>
        </Row>
      </Grid>
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
