import {combineReducers} from 'redux'
import{
  RECEIVE_POSTS,
  RECEIVE_CATEGORIES
} from '../actions'

function posts(state = [], action) {
  console.log('reducer posts invoked')
  const { posts } = action

  switch (action.type) {
    case RECEIVE_POSTS :
      return posts
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
