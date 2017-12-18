import{
  getAllPosts,
  getCategories,
  updateVoteScore,
  addNew,
  editPost,
  deletePost
} from '../utils/api.js'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const UPDATE_POST = 'UPDATE_POST'
export const ADD_POST = 'ADD_POST'

function receivePosts({posts}){
  return{
    type : RECEIVE_POSTS,
    posts
  }
}

function receiveCategories({categories}){
  return{
    type : RECEIVE_CATEGORIES,
    categories
  }
}

export function updatePost({post}){
  return{
    type : UPDATE_POST,
    post
  }
}

function createPost({post}){
  return{
    type : ADD_POST,
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
  updateVoteScore('posts', id, option).then(post => dispatch(updatePost({post})))
)

export const addNewPost = (postContents) => dispatch => (
  addNew("posts", postContents).then(post => dispatch(createPost({post})))
)

export const editAPost = (id, postContents) => dispatch => (
  editPost(id, postContents).then(post => dispatch(updatePost({post})))
)

export const deleteAPost = (id) => dispatch => (
  deletePost(id).then(post => dispatch(updatePost({post})))
)
