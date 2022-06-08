import axios from 'axios'

const instance = axios.create({
    // baseURL:"http://localhost:9000" //dev
    baseURL:"https://gchatapplication.herokuapp.com/" //production
})

export default instance;