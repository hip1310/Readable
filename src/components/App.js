import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';
import {fetchAllPosts} from '../actions'

class App extends Component {
  componentDidMount(){
    console.log('App Component componenetDidMount')
    this.props.dispatch(fetchAllPosts())
  }

  render() {
    console.log('App Component render')
    return (
      <div className="App">

      </div>
    );
  }
}

export default connect()(App)
