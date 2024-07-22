import axios from "axios";

const httpClient = axios.create({
    baseURL: 'http://localhost:8081'
})

class ApiService{

    constructor(apiurl){
        this.apiurl=apiurl;
    }

    post(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.post(requestUrl, objeto);
    }

    put(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.put(requestUrl, objeto)
    }

    delete(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.delete(requestUrl)
    }

    get(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.get(requestUrl)
    }

    getObterSaldo(url){
        const requestUrl = `/api/lancamentos${url}`
        return httpClient.get(requestUrl)
    }
}
export default ApiService;