import axios from "axios";

const http = axios.create({
    baseURL: "https://jpcms.herokuapp.com/"
})

http.interceptors.request.use(request => {
    let accessToken = localStorage.getItem("JPtechSolutionAccessToken");
    if(accessToken) request.headers.authorization = `Bearer ${accessToken}`
    return request
})
http.interceptors.response.use(response => {
    let accessToken = response.headers['authorization'];
    if (accessToken) localStorage.setItem("JPtechSolutionAccessToken", accessToken.split(" ")[1])
    return response
})

export default http;