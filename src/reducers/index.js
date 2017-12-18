import {combineReducers} from 'redux'
import{
  RECEIVE_POSTS,
  RECEIVE_CATEGORIES,
  UPDATE_POST,
  ADD_POST
} from '../actions'

function posts(state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS :
      return action.posts
    case UPDATE_POST :
      const updatedPost = action.post
      return state.map(post => (post.id === updatedPost.id) ? post = updatedPost : post)
    case ADD_POST :
      return [...state, action.post]
    default :
      return state
  }
}

function categories(state = [], action) {
  const { categories } = action

  switch (action.type) {
    case RECEIVE_CATEGORIES :
      return categories
    default :
      return state
  }
}

export default combineReducers({
  posts      : posts,
  categories : categories
})
