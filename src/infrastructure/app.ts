import UseCase from '../use-case/app'
class App {
  private useCase: UseCase
  constructor () {
    this.useCase = new UseCase()
  }
  async Start() {
    try {
      await this.useCase.Connect()
      const user = await this.useCase.Find('a')
      const created = await this.useCase.Create({
        id: 'xadiqwnfioqnfowq',
        fullname: 'miguel',
        documentNumber: '09090909',
        birthday: new Date(),
        phoneNumber: '090909099',
        status: 0,
        dataVerified: true
      })
      await this.useCase.Disconnect()
      return user
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