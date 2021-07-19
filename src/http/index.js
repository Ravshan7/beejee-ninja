import axios from "axios";

const $userName = process.env.REACT_APP_API_USERNAME


const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})





export {$host, $userName}