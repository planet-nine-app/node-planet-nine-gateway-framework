const PlanetNineGateway = require('./planet-nine-gateway.js')
const crypto = require('planet-nine-crypto')

const keys = crypto.generateKeys('asdf123456')

crypto.getKeys = function() {
  return keys
}

let gateway = new PlanetNineGateway()

gateway.ongoingGateway({gatewayName: 'npm-plugin-test-gateway3', publicKey: keys.publicKey})

// gateway.getUserIdByUsername('testuser12', (err, userId) => {
//   if (err) {
//     console.log(err)
//   }
//   gateway.askForOngoingGatewayUsage(userId, (erro, resp) => {
//     if (erro) {
//       return console.log(erro);
//     }
//     console.log('resp', resp);
//   })
// })  

gateway.getUser({userId: 157, gatewayName: 'npm-plugin-test-gateway3'}, (err, user) => {
  if (err) console.log(err)
  console.log('user', user)
}) 

// gateway.getUser({userId: 157, gatewayName: 'npm-plugin-test-gateway3'}, (err, user) => {
//   if (err) {
//     console.log(err)
//   }

//   const usePowerOpts = {
//     totalPower: 200,
//     partnerName: "whirl-five-cool",
//     userId: user.userId,
//     ordinal: user.powerOrdinal + 1,
//   }  
//   gateway.usePowerAtOngoingGateway(usePowerOpts, (err, user) => {
//     if (err) {
//       console.log(err)
//     }
//     console.log('user', user)
//   })
// })

gateway.getUser({userId: 157, gatewayName: 'npm-plugin-test-gateway3'}, (err, user) => {
  if (err) {
    console.log(err)
  }

  const requestTransferObj = {
    userId: user.userId,
    sourceUserId: user.userId,
    destinationUserId: 40,
    nineumUniqueIds: ['01000000010101010505010100000001'],
    price: 0,
    currencyName: "USD",
    ordinal: user.powerOrdinal + 1,
}  
  gateway.requestTransfer(requestTransferObj, (err, user) => {
    if (err) {
      console.log(err)
    }
    console.log('user', user)
  })
})
