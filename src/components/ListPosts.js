import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';

class ListPosts extends Component {
  render() {
    console.log('ListPosts Component render')
    const {posts, categories} = this.props
    return (
      <div className='container'>
        <div className='posts'>
          <ul>
            {posts.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
        <div className='categories'>
          <ul>
            {categories.map((category, i) => (
              <li key={i}>{category.name}</li>
            ))}
          </ul>
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

export default connect(mapStateToProps)(ListPosts)
