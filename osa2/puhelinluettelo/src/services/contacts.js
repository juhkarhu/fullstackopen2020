import axios from 'axios'
// const baseUrl = 'http://localhost:3001/persons'
const baseUrl = 'api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  console.log(newObject)
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject)
//   return request.then(response => response.data)
// }

const remove = (id) => {
  const request = axios.delete(baseUrl + `/${id}`)
  return request.then(response => response.data)
}

const put = (person) => {
  // console.log('puttia koittamassa')
  // console.log('saadut tiedot, newNumber tietue:', person, 'person.id', person.id)

  // const request = axios.put(baseUrl + `/${id[0].id}`, {name: id[0].name, number: newNumber, id: id[0].id})
  const request = axios.put(baseUrl + `/${person.id}`, {person})
  return request.then(response => response.data)
}

export default { getAll, create, remove, put }