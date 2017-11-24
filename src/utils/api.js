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

export function updateVoteScore(id, optionValue){
  console.log('api call to updateVoteScore' + optionValue)
  const body = JSON.stringify({option : optionValue})

  console.log('post body: ' + body)
  return fetch(`${api}/posts/${id}`, {
           headers,
           method : 'POST',
           body   : `${body}`
         })
         .then(res => res.json())
         .catch(err => console.log(err))
}
