import{
  RECEIVE_POSTS
} from '../actions'

const initialPostsState = {
  posts : []
}

function listPosts(state = initialPostsState, action) {
  console.log('reducer listPosts invoked')
  const { posts } = action

  switch (action.type) {
    case RECEIVE_POSTS :
      return {
        ...state,
        posts : posts
      }
    default :
      return state
  }
}

export default listPosts
