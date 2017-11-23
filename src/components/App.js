import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';
import {fetchAllPosts, fetchCategories} from '../actions'
import ListPosts from './ListPosts'
import {Route, withRouter} from 'react-router-dom'

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
        <Route exact path="/" component={ListPosts}/>
        <Route path="/:category" component={ListPosts}/>
      </div>
    );
  }
}

export default withRouter(connect()(App))
