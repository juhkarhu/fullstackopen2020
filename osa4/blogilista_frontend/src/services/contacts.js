import axios from 'axios'
// const baseUrl = 'http://localhost:3001/persons'
const baseUrl = 'api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token},
  }

  // vanhat:
  // console.log(newObject)
  // const request = axios.post(baseUrl, newObject)
  // return request.then(response => response.data)
  
  //uusi:
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject)
//   return request.then(response => response.data)
// }

const remove = async (id) => {
  console.log('tassa', id)
  const config = {
    headers: { Authorization: token},
  }

  // Old method I guess, check
  // const request = axios.delete(baseUrl + `/${id}`)
  // return request.then(response => response.data)

  const response = await axios.delete(baseUrl + `/${id}`, config)
  return response.data
}

const put = (id, blog) => {
//   console.log('puttia koittamassa')
//   console.log('putissa saatu id:', id, 'ja blog:', blog)

  const request = axios.put(baseUrl + `/${id}`, blog)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove, put, setToken }