import {combineReducers} from 'redux'
import{
  RECEIVE_POSTS,
  RECEIVE_CATEGORIES,
  UPDATE_POST
} from '../actions'

function posts(state = [], action) {
  console.log('reducer posts invoked')

  switch (action.type) {
    case RECEIVE_POSTS :
      return action.posts
    case UPDATE_POST :
      return state.filter(post => (post.id !== action.post.id)).concat([action.post])
    default :
      return state
  }
}

function categories(state = [], action) {
  console.log('reducer categories invoked')
  const { categories } = action
  console.log('action: categories' + categories)

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
