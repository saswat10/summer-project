import axios from 'axios'

const customFetch = axios.create({
  baseURL: '/api/v1'
})

//axios instance
export default customFetch