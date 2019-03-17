import * as Mysql from 'mysql'
import { datasource } from '../../interfaces/datasource';

interface operation {
  query: string
}
interface find extends operation {
  params: Array<any>
}
interface insert extends operation {
  data: Array<any>
}

class MysqlDatasource implements datasource {
  private Client: Mysql.Pool
  async Connect () {
    try {
      this.Client = await Mysql.createPool({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'J0h4n4',
        insecureAuth: true
      })
    } catch (e) {
      throw e
    }
  }
  async Find (mapper: find) {
    try {
     return new Promise((resolve, reject) => {
      this.Client.query(mapper.query, mapper.params, 
        (e, rows, fields ) => {
        if (e) {
          reject(e)
        } else {
          resolve(rows)
        }
      })
     })
    } catch (e) {
      throw e
    }
  }
  async Create (mapper: insert) {
    try {
      return new Promise((resolve, reject) => {
        this.Client.query(mapper.query, mapper.data, 
          (e , rows, fields) => {
          if (e) {
            reject(e)
          } else {
            resolve(rows)
          }
        })
       })
    } catch (e) {
      throw e
    }
  }
  async Disconnect() {
    try {
      return new Promise((resolve, reject) => {
        this.Client.end((e) => {
          if (e) {
            reject(e)
          } else {
            resolve()
          }
        })
       })
    } catch (e) {
      throw e
    }
  }
}
export default MysqlDatasource