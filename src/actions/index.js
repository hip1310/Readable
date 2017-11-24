import{
  getAllPosts,
  getCategories,
  updateVoteScore
} from '../utils/api.js'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const UPDATE_POST = 'UPDATE_POST'

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

export function updatePost({post}){
  console.log('action updatePost invoked')
  return{
    type : UPDATE_POST,
    post
  }
}

export const fetchAllPosts = () => dispatch => (
  getAllPosts().then(posts => dispatch(receivePosts({posts})))
)

export const fetchCategories = () => dispatch => (
  getCategories().then(categories => dispatch(receiveCategories({categories})))
)

export const postVoteScore = (id, option) => dispatch => (
  updateVoteScore(id, option).then(post => dispatch(updatePost({post})))
)
