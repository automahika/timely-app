import axios from 'axios'

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('api_token')

    config.headers.Authorization = `Bearer ${token}`

    return config
})

export default axios
