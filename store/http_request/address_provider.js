import HttpRequest from './http_request'

class AddressProvider extends HttpRequest {
  constructor () {
    // api api
    super('web')
  }
  async getProvinces () {
    const {data} = await this.get(`/get_provinces`)
    return data
  }
  async getDistricts (province) {
    const {data} = await this.get(`/get_districts`,{province})
    return data
  }
  async getSubDistricts (district) {
    const {data} = await this.get(`/get_sub_districts`,{district})
    return data
  }
  async getAddresses (key) {
    const {data} = await this.get(`/get_addresses`,{key})
    return data
  }
}

export default AddressProvider