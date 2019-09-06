const PlanetNineGateway = require('./planet-nine-gateway.js')
const crypto = require('planet-nine-crypto')

let gateway = new PlanetNineGateway()

const keys = crypto.generateKeys('testSeed')

crypto.getKeys = function() {
  return keys
}

gateway.ongoingGateway({gatewayName: 'testGateway', publicKey: keys.publicKey})

gateway.getUser({userId: 157, gatewayName: gatewayName}, (err, user) => {
  if (err) console.log(err)
  const requestTransferObj = {
    user: user,
    destinationUserId: 203,
    nineumUniqueIds: ['01000000010204030802020100000002'],
  }  
  gateway.requestTransfer(requestTransferObj, (err, trasnferRequest) => {
    if (err) console.log(err)
    console.log('trasnferRequest', trasnferRequest)
  })
})