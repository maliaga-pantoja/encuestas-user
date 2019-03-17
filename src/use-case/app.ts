import Driver from "../datasource/drivers/mysql-driver";
import UserController from '../controller/user'
import  * as UserInterface from '../interfaces/user'
class App {
  private driver: Driver
  private placeController: UserController
  constructor () {
    this.driver = new Driver()
    this.placeController = new UserController(this.driver)
  }
  public async Connect () {
    try {
      await this.driver.Connect()
    } catch (e) {
      throw e
    }
  }
  public async Disconnect () {
    try {
      await this.driver.Disconnect()
    } catch (e) {
      throw e
    }
  }
  public async Create (user: UserInterface.model) {
    try {
      const saved = await this.placeController.Create(user)
      return saved
    } catch (e) {
      throw e
    }
  }
  public async Find (userId: string) {
    try {
      const places = await this.placeController.FindById(userId)
      return places
    } catch (e) {
      throw e
    }
  }
}
export default App