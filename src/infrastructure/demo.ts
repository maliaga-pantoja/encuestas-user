const Client = require('cloud-config-client')
Client.load({
  endpoint: process.env.CS_ENDPOINT,
  name: process.env.CS_NAME,
})
.then((profile:any) => {
  console.log(profile)
})
.catch((e:any) => {
  console.log(e)
})