import axios from 'axios'

const customFetch = axios.create({
  baseURL: 'http://localhost:5000/api/v1'
})

//axios instance
export default customFetch