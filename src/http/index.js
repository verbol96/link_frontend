import axios from "axios"

export const $host = axios.create({
   // withCredentials: true,
    //baseURL: 'http://localhost:8001/' //для local
    baseURL: 'http://94.228.126.26:8001/' // для server
})