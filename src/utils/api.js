const api = "http://localhost:3001"

const headers = {
  'Authorization': 'what-ever'
}

export function getAllPosts(){
  console.log('api call to getAllPosts')
  return fetch(`${api}/posts`, { headers })
           .then(res => res.json())
}
