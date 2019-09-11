const PlanetNineGateway = require('../planet-nine-gateway')
const crypto = require('planet-nine-crypto')

let gateway = new PlanetNineGateway()

const keys = crypto.generateKeys('testSeed')

crypto.getKeys = function() {
  return keys
}

gateway.ongoingGateway({gatewayName: 'testGateway', publicKey: keys.publicKey})

gateway.getUser(157, (err, user) => {
  if (err) return console.log(err)
  const requestTransferObj = {
    sourceUser: user,
    destinationUserId: 203,
    nineumUniqueIds: ['01000000010204030802020100000002'],
  }  
  gateway.requestTransfer(requestTransferObj, (err, trasnferRequest) => {
    if (err) console.log(err)
    console.log('trasnferRequest', trasnferRequest)
  })
})