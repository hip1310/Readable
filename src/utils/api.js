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

/**
 * API call to add a post / comment
 * params:
 *   endpoint        : string - "posts" / "comments"
 *   contents        : string - post / comment contents
 * return: object - added post / comment
*/
export function addNew(endpoint, contents){
  console.log('api call to addPost')
  const url = api + "/" + endpoint;
  const postBody = JSON.stringify({...contents, 'id': uuid.v4(), 'timestamp' : Date.now()})
  console.log('post body: ' + postBody)
  return fetch(`${url}`, {
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

export function deleteComment(id){
  console.log('api call to deleteComment')
  return fetch(`${api}/comments/${id}`, {
           headers,
           method : 'DELETE'
         })
         .then(res => res.json())
         .catch(err => console.log(err))
}

export function editComment(id, contents){
  console.log('api call to editComment')
  let postBody = JSON.stringify({'body' : contents, 'timestamp' : Date.now()})
  console.log('post body: ' + postBody)
  return fetch(`${api}/comments/${id}`, {
           headers,
           method : 'PUT',
           body   : `${postBody}`
         })
         .then(res => res.json())
         .catch(err => console.log(err))
}
