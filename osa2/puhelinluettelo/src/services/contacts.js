import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject)
//   return request.then(response => response.data)
// }

const remove = (id) => {
  // console.log(`olemme metodissa ja poistamassa id nro: ${id}`)
  const request = axios.delete(baseUrl + `/${id}`)
  return request.then(response => response.data)
}

const put = (newNumber, id) => {
  console.log('puttia koittamassa')
  // console.log('newNumber', newNumber)
  // console.log('id', id[0])
  // console.log('osoite', baseUrl + `/${id[0].id}`, {number: newNumber})
  const request = axios.put(baseUrl + `/${id[0].id}`, {name: id[0].name, number: newNumber, id: id[0].id})
  return request.then(response => response.data)
}

export default { getAll, create, remove, put }