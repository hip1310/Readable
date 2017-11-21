import {getAllPosts} from '../utils/api.js'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function receivePosts({posts}){
  console.log('action receivePosts invoked')
  return{
    type : RECEIVE_POSTS,
    posts
  }
}

export const fetchAllPosts = () => dispatch => (
  getAllPosts().then(posts => dispatch(receivePosts({posts})))
)
