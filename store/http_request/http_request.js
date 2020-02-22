import axios from 'axios'

class HttpRequest {
  constructor (url ='') {
    // this.axios = axios
    this.axiosInstance = axios.create({
      // baseURL: `${process.env.API_HOST}/${url}`,
      // baseURL: `http://eprivate.engrdept.com/api/index.php/${url}`,
      baseURL: `http://localhost:8070/eprivate/index.php/${url}`,
      timeout: 120000,
      headers:{
        Token:'VHByo4Yj2lfyo0CTt9vk6O2DVhjzQsTe52txyNG4UM2O1uzZu9aS5lzTLhQ32PunWX6PBQSInZCgpIf0cV1nnBQlmR2agjztL0Ao3oQEEiRoat3t81J65fxDwuWZdPDOBaDEk4o2oxH4id46skJ0sOl6lO0gmzQErIcJ6MWT90h92IG6jiRXwOTR9onjnHM5bpdsGwIy7BDGKmcYEn9wi5IRoNBP1qbyDmH6cI2Y56RVDpsxR9xcndlONzQwnKiS'
      }
    })

    this.axiosInstance.interceptors.request.use(function (config) {
      // Do something before request is sent
      return config
    }, function (error) {
      // Do something with request error
      return Promise.reject(error)
    })

    // Add a response interceptor
    this.axiosInstance.interceptors.response.use(function (response) {
      // Do something with response data
      return response
    }, function (error) {
      // Do something with response error
      return Promise.reject(error)
    })
  }

  setHeader (header) {
    // this.axiosInstance.defaults.headers.common[header.key] = header.value
    this.axiosInstance.defaults.headers.common = header
    this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  get (methodName, data) {
    return this.axiosInstance.get(methodName, {
      params: data
    })
  }

  create (methodName, data) {
    return this.axiosInstance.post(methodName, data)
  }

  update (methodName, data) {
    return this.axiosInstance.put(methodName, data)
  }

  delete (methodName, param, data) {
    return this.axiosInstance.delete(methodName, {
      params: param,
      data: data
    })
  }

  request (type, url, data) {
    let promise = null
    switch (type) {
      case 'GET': promise = axios.get(url, { params: data }); break
      case 'POST': promise = axios.post(url, data); break
      case 'PUT': promise = axios.put(url, data); break
      case 'DELETE': promise = axios.delete(url, data); break
      default : promise = axios.get(url, { params: data }); break
    }
    return promise
  }
}

export default HttpRequest