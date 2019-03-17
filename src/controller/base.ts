class Base {
  constructor () {

  }
  async Decode (token: string) {
    try {

      if (token === '1234') {
        return {user: 'Miguel'}
      } else {
        let e = new Error()
        e.message = 'token invalid'
        e.stack = 'INVALID_TOKEN'
        throw e
      }
    } catch (err) {
      throw err
    }
  }
}
export default Base