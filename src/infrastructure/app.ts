import UseCase from '../use-case/app'
import Hapi from 'hapi'
import Router from './router'
class App {
  private useCase: UseCase
  private server: Hapi.Server
  private router: Hapi.ServerRoute[]
  constructor () {
    this.useCase = new UseCase()
    this.server = new Hapi.Server({
      port: process.env.PORT || 3000,
      host: '0.0.0.0'
    })
    
  }
  async Start() {
    try {
      await this.useCase.Connect()
      this.router = new Router(this.useCase).list
      this.server.route(this.router)
      await this.server.start()
    } catch (err) {
      throw err
    }
  }

}
const app = new App()
app.Start()
.then(() => {
  console.log(`
    app running at port ${process.env.PORT}
    in ${process.env.NODE_ENV} environment
  `)
})
.catch(e => {
  console.log(e)
})