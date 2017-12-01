import React, { Component } from 'react'
import {connect} from 'react-redux'
import './App.css';
import{
fetchAllPosts,
fetchCategories,
addNewPost,
editAPost,
deleteAPost
} from '../actions'
import ListPosts from './ListPosts'
import AddPost from './AddPost'
import ViewPost from './ViewPost'
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

  editPost(id, postContents){
    this.props.dispatch(editAPost(id, postContents))
    console.log('post edited')
  }

  deletePost(id){
    this.props.dispatch(deleteAPost(id))
    console.log('post deleted')
  }

  render() {
    console.log('App Component render')
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ListPosts}/>
          <Route exact path="/addpost" render={({history}) => (
            <AddPost
              onCreatePost={(postContents) => {
                this.createPost(postContents)
                history.push('/')
            }}/>
          )}/>
          <Route path="/post/:postid" render={({history}) => (
            <AddPost
              onEditPost={(id, postContents) => {
                this.editPost(id, postContents)
                history.push('/')
            }}/>
          )}/>
          <Route exact path="/:category" component={ListPosts}/>
          <Route path="/:category/:postid" render={({history}) => (
            <ViewPost
              onDeletePost={(id) => {
                this.deletePost(id)
                history.push('/')
            }}/>
          )}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect()(App))
