import Hapi from 'hapi'
import UseCase from '../use-case/app'
import {model} from '../interfaces/user'
import {userCreate, userFindById} from './schema/user'
import Uuid from 'node-uuid'

class Router {
  public list: Array<Hapi.ServerRoute>
  private useCase: UseCase
  constructor (useCase: UseCase){
    this.useCase = useCase
    this.list = [
      {
        path: `/user`,
        method: 'POST',
        options: {
          handler: async (req: any, h) => {
            try {
              let user: model = {
                birthday: req.payload.birthday,
                createdAt: new Date(),
                dataVerified: req.payload.dataVerified,
                documentNumber: req.payload.documentNumber,
                fullname: req.payload.fullname,
                id: Uuid.v1(),
                phoneNumber: req.payload.phoneNumber,
                status: 0,
              }
              await this.useCase.Create(user)
              return user
            } catch (e) {
              console.log(e)
              throw e
            }
          },
          validate: {
            payload: userCreate
          },
          notes: 'id and createdAt are set inside handler. birthday format: YYYY/MM/DD',
          description: 'Public endpoint to create new users',
          tags: ['api', 'user']
        }
      },
      {
        path: `/user`,
        method: 'GET',
        options: {
          handler: async (req: any, res) => {
            try {
              const user = await this.useCase.Find(req.query.id)
              return user
            } catch (e) {
              throw e
            }
          },
          validate: {
            query: userFindById
          },
          notes: 'id is required and must be generated using uuid v1',
          description: 'Public endpoint to create find user by id',
          tags: ['api', 'user']
        }
      }
    ]
  }
}
export default Router