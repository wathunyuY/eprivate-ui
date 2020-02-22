import HttpRequest from './http_request'

class AccountProvider extends HttpRequest {
  constructor () {
    // api api
    super('web')
  }
  async register (body) {
    const {data} = await this.create('/register',body)
    return data
  }
  async login (body) {
    const {data} = await this.create('/login',body)
    return data
  }
  async addPerson (body) {
    const {data} = await this.create('/add_person',body)
    return data
  }
  async editPerson (id,body) {
    const {data} = await this.update(`/edit/persons/${id}`,body)
    return data
  }
  async getPersons (params) {
    const {data} = await this.get(`/get_persons`,params)
    return data
  }

  async getPerson (id) {
    const {data} = await this.get(`/get_person`,{id})
    return data
  }

  async removePerson (id) {
    const {data} = await this.delete(`/remove_person`,{id})
    return data
  }
}

export default AccountProvider