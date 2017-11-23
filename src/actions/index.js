import {getAllPosts, getCategories} from '../utils/api.js'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export function receivePosts({posts}){
  console.log('action receivePosts invoked')
  return{
    type : RECEIVE_POSTS,
    posts
  }
}

export function receiveCategories({categories}){
  console.log('action receiveCategories invoked')
  return{
    type : RECEIVE_CATEGORIES,
    categories
  }
}

export const fetchAllPosts = () => dispatch => (
  getAllPosts().then(posts => dispatch(receivePosts({posts})))
)

export const fetchCategories = () => dispatch => (
  getCategories().then(categories => dispatch(receiveCategories({categories})))
)
