import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';
import {fetchAllPosts, fetchCategories} from '../actions'
import ListPosts from './ListPosts'

class App extends Component {
  componentDidMount(){
    console.log('App Component componenetDidMount')
    this.props.dispatch(fetchAllPosts())
    this.props.dispatch(fetchCategories())
  }

  render() {
    console.log('App Component render')
    return (
      <div>
        <div className="App-header">
          <h1> Readable </h1>
        </div>
        <ListPosts/>
      </div>
    );
  }
}

export default connect()(App)
