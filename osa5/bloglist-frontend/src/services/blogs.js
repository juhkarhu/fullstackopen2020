import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  console.log('front1')
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blogObject => {
  const config = {
    headers: { Authorization: token}
  }

  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const exportedObjects = { getAll, setToken, create }

export default exportedObjects