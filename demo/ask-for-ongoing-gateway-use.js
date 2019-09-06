const PlanetNineGateway = require('./planet-nine-gateway.js')
const crypto = require('planet-nine-crypto')

let gateway = new PlanetNineGateway()

const keys = crypto.generateKeys('testSeed')

crypto.getKeys = function() {
  return keys
}

gateway.ongoingGateway({gatewayName: 'testGateway', publicKey: keys.publicKey})

gateway.getUserIdByUsername('testuser12', (err, userId) => {
  if (err) return console.log(err)
  gateway.askForOngoingGatewayUsage(userId, (erro, user) => {
    if (erro) return console.log(erro)
    console.log('user', user)
  })
})  