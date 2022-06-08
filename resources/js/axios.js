import axios from 'axios'

const venodrAxios = axios.create({
    baseURL:"http://localhost:8000/api/vendor" //dev
})

const AdminAxios = axios.create({
    baseURL:"http://localhost:8000/api/appAdmin" //dev
})

export {venodrAxios, AdminAxios};
