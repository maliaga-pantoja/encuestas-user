import Driver from "../datasource/drivers/mysql-driver";
import Base from './base'
import Uuid from 'node-uuid'
import * as UserInterface from '../interfaces/user'
class Place extends Base{
  private driver: Driver
  private tableName: string
  constructor(driver: Driver) {
    super()
    this.driver = driver
    this.tableName = 'users'
  }
  public async Create (user: UserInterface.model) {
    try {
      user.id = Uuid.v4()
      user.createdAt = new Date()
      console.log(user)
      let inserted = await this.driver.Create({
        query: 'insert into users (id, fullname, documentNumber, birthday, phoneNumber, status,dataVerified, createdAt) values (?, ?, ?, ?, ?, ?, ?, ?);',
        data: [
                user.id, user.fullname, user.documentNumber,
                user.birthday, user.phoneNumber, user.status, user.dataVerified,
                user.createdAt
              ]
      })
      return inserted
    } catch (error) {
      throw error
    }
  }
  public async FindById (userId: string) {
    try {
      
      let user = await this.driver.Find({
        query: `select * from users where id = ?;`,
        params: [userId]
      })
      return user
    } catch (error) {
      throw error
    }
  }
}
export default Place