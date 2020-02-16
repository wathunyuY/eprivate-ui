import HttpRequest from './http_request'

class FileProvider extends HttpRequest {
  constructor () {
    // api api
    super('web')
  }

  async upload (form) {
    const {data} = await this.create('/uploadfile',form)
    return data
  }

  async base64 (filename) {
    const {data} = await this.get(`/base64/${filename}`)
    return data
  }
}

export default FileProvider