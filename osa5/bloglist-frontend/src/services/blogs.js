import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {

  const response = await axios.get(baseUrl)
  return response.data
}

const create = async blogObject => {
  const config = {
    headers: { Authorization: token}
  }

  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const remove = async (id) => {

  const config = {
    headers: { Authorization: token},
  }

  const response = await axios.delete(baseUrl + `/${id}`, config)
  return response.data
}

const put = async (id, blog) => {

  const config = {
    headers: { Authorization: token},
  }

  const response = await axios.put(baseUrl + `/${id}`, blog, config)
  return response.data

  // const request = axios.put(baseUrl + `/${id}`, blog)
  // return request.then(response => response.data)
}

const exportedObjects = { getAll, setToken, create, put, remove }

export default exportedObjects