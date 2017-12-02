import uuid from 'node-uuid'
const api = "http://localhost:3001"

const headers = {
  'Authorization': 'what-ever',
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export function getAllPosts(){
  console.log('api call to getAllPosts')
  return fetch(`${api}/posts`, { headers })
           .then(res => res.json())
}

export function getCategories(){
  console.log('api call to getCategories')
  return fetch(`${api}/categories`, { headers })
           .then(res => res.json())
           .then(data => data.categories)
}

/**
 * API call to update VoteScore for a post/comment
 * params:
 *   data        : string - posts/comments
 *   id          : string - post/comment id
 *   optionValue : string - upVote/downVote
 * return: object - updated post/comment
*/
export function updateVoteScore(data, id, optionValue){
  console.log('api call to updateVoteScore')
  const url = api + "/" + data + "/" + id;
  console.log('url : ' + url + 'option : ' + optionValue)
  const body = JSON.stringify({option : optionValue});

  console.log('post body: ' + body)
  return fetch(`${url}`, {
           headers,
           method : 'POST',
           body   : `${body}`
         })
         .then(res => res.json())
         .catch(err => console.log(err))
}

export function addPost(postContents){
  console.log('api call to addPost')
  let postBody = JSON.stringify({...postContents, 'id': uuid.v4(), 'timestamp' : Date.now()})
  console.log('post body: ' + postBody)
  return fetch(`${api}/posts`, {
           headers,
           method : 'POST',
           body   : `${postBody}`
         })
         .then(res => res.json())
         .catch(err => console.log(err))
}

export function editPost(id, postContents){
  console.log('api call to editPost')
  let postBody = JSON.stringify(postContents)
  console.log('post body: ' + postBody)
  return fetch(`${api}/posts/${id}`, {
           headers,
           method : 'PUT',
           body   : `${postBody}`
         })
         .then(res => res.json())
         .catch(err => console.log(err))
}

export function deletePost(id){
  console.log('api call to deletePost')
  return fetch(`${api}/posts/${id}`, {
           headers,
           method : 'DELETE'
         })
         .then(res => res.json())
         .catch(err => console.log(err))
}

export function getComments(postId){
  console.log('api call to getComments')
  return fetch(`${api}/posts/${postId}/comments`, {
           headers,
         })
         .then(res => res.json())
         .catch(err => console.log(err))
}
