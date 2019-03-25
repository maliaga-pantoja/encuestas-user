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
      host: '0.0.0.0',
      routes: {
        cors: {
          origin: ['*'],
          headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
          additionalHeaders: ['Device'],
          exposedHeaders: ['WWW-Authenticate', 'Server-Authorization'],
          additionalExposedHeaders:['App-Name'],
          credentials: false
        },
        validate: {
          failAction: (request, h, err: any) => {
            if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
              const invalidItem = err.details[0];
              return h.response({
                message: `Data Validation Error. Schema violation. <${invalidItem.path}>`,
                details: err.details
              })
                .code(400)
                .takeover();
            }
            return h.response(err)
                .takeover()
          }
        }
      },
    })
    
  }
  async Start() {
    try {
      await this.useCase.Connect()
      this.router = new Router(this.useCase).list
      this.server.route(this.router)
      await this.server.register([
        require('inert'),
        require('vision'),
        {
          plugin: require('hapi-swagger'),
          options: {
            info: {
              title: 'user api',
              version: '1.0.0',
            },
          }
        }
      ])
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