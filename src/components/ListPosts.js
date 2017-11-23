import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';
import {Link, withRouter} from 'react-router-dom'

class ListPosts extends Component {
  state = {
    selectedCategory : ''
  }

  componentWillReceiveProps(newProps){
    const selectedCategory = newProps.match.params.category ?
                             newProps.match.params.category : ''
    this.setState((state) => ({selectedCategory}))
  }

  componentWillMount(){
    const selectedCategory = this.props.match.params.category ?
                             this.props.match.params.category : ''
    this.setState((state) => ({selectedCategory}))
  }

  render() {
    console.log('ListPosts Component render')

    const {posts, categories} = this.props
    let filteredPosts

    if(this.state.selectedCategory !== ''){
      filteredPosts = posts.filter((post) => (
                        post.category === this.state.selectedCategory)
                      )
    }
    else filteredPosts = posts

    return (
      <div>
      <div className="App-header">
        <h1> Readable </h1>
      </div>
      <div className='container'>
        <div className='posts'>
          <ul>
            {filteredPosts.map(post => (
              <li key={post.id}>{post.title}</li>
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

export default withRouter(connect(mapStateToProps)(ListPosts))
