import UseCase from '../use-case/app'
class App {
  private useCase: UseCase
  constructor () {
    this.useCase = new UseCase()
  }
  async Start() {
    try {
      await this.useCase.Connect()
      const places = await this.useCase.Find('a')
      await this.useCase.Disconnect()
      return places
    } catch (err) {
      throw err
    }
  }

}
const app = new App()
app.Start()
.then(r => {
  console.log(r)
})
.catch(e => {
  console.log(e)
})