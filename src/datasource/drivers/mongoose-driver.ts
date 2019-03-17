import {MongoClient, MongoError, InsertOneWriteOpResult, Cursor} from 'mongodb'
import Mysql from 'mysql'
import { datasource } from '../../interfaces/datasource';
interface operation {
  collection: string
}
interface find extends operation {
    query: object,
    options?: object
}
interface insert extends operation {
  data: [object]
}

class MongooseDatasource implements datasource {
  private Client: MongoClient
  async Connect () {
    try {
      this.Client = await MongoClient.connect(
        process.env.MONGOOSE_URL || 'mongodb://localhost:27017',
        {
          useNewUrlParser: true
        }
      )
    } catch (e) {
      throw e
    }
  }
  async Find (mapper: find): Promise<Cursor> {
    try {
      return await this.Client.db(process.env.DB_NAME || 'amatista')
                      .collection(mapper.collection).find(mapper.query, mapper.options)
    } catch (e) {
      throw e
    }
  }
  async Create (mapper: insert): Promise<InsertOneWriteOpResult>{
    try {
      return await this.Client.db(process.env.DB_NAME || 'test')
                      .collection(mapper.collection).insert(mapper.data)
    } catch (e) {
      throw e
    }
  }
  async Disconnect () {
    try {
      return await this.Client.close(true)
    } catch (e) {
      throw e
    }
  }
}
export default MongooseDatasource