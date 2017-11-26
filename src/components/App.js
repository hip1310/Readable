import React, { Component } from 'react'
import {connect} from 'react-redux'
import './App.css';
import {fetchAllPosts, fetchCategories, addNewPost} from '../actions'
import ListPosts from './ListPosts'
import AddPost from './AddPost'
import {Route, withRouter, Switch} from 'react-router-dom'

class App extends Component {
  componentDidMount(){
    console.log('App Component componenetDidMount')
    this.props.dispatch(fetchAllPosts())
    this.props.dispatch(fetchCategories())
  }

  createPost(postContents){
    this.props.dispatch(addNewPost(postContents))
    console.log('post added')
  }

  render() {
    console.log('App Component render')
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ListPosts}/>
          <Route path="/addpost" render={({history}) => (
            <AddPost
              onCreatePost={(postContents) => {
                this.createPost(postContents)
                history.push('/')
            }}/>
          )}/>
          <Route path="/:category" component={ListPosts}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect()(App))
