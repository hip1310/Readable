import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';

class ListPosts extends Component {
  componentDidMount(){

  }

  render() {
    console.log('ListPosts Component render')
    const {posts} = this.props
    return (
      <div>
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({posts}){
  return {
    posts : posts
  }
}

export default connect(mapStateToProps)(ListPosts)
