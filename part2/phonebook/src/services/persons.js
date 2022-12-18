import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)

  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}


const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data);

}

const deletePerson = id => {
  return axios.delete(baseUrl + '/' + id, {}).then(() => {
    console.log("deleted person id ", id)
  });
}

export default { getAll, create, update, deletePerson }