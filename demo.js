const PlanetNineGateway = require('./planet-nine-gateway.js')
const crypto = require('planet-nine-crypto')

const gatewayName = 'npm-plugin-test-gateway6'

const keys = crypto.generateKeys(gatewayName)
 
crypto.getKeys = function() {
  return keys
}

let gateway = new PlanetNineGateway()

gateway.ongoingGateway({gatewayName: gatewayName, publicKey: keys.publicKey})

// gateway.getUserIdByUsername('tray-whirl-whirl', (err, userId) => {
//   if (err) {
//     console.log(err)
//   }
//   gateway.askForOngoingGatewayUsage(157, (erro, user) => {
//     if (erro) {
//       return console.log(erro);
//     }
//     console.log('user', user);
//   })
// })  

gateway.getUser(157, (err, user) => {
  if (err) console.log(err)
  console.log('user', user)
}) 

// gateway.getUser(157, (err, user) => {
//   if (err) {
//     console.log(err)
//   }
//   console.log('user', user)
//   const usePowerOpts = {
//     totalPower: 200,
//     partnerName: "tray-whirl-whirl",
//     user: user,
//   }  
//   gateway.usePowerAtOngoingGateway(usePowerOpts, (err, user) => {
//     if (err) {
//       console.log(err)
//     }
//     console.log('user', user)
//   })
// })

// gateway.getUser(157, (err, user) => {
//   if (err) {
//     console.log(err)
//   }
//   const requestTransferObj = {
//     user: user,
//     destinationUserId: 203,
//     nineumUniqueIds: ['01000000010204030802020100000002'],
//   }  
//   gateway.requestTransfer(requestTransferObj, (err, trasnferRequest) => {
//     if (err) {
//       console.log(err)
//     }
//     console.log('trasnferRequest', trasnferRequest)
//   })
// })

const nineumHexStringArray = [
  '01000000010105010203030100000001',
  '01000000010203090506080100000001',
  '01000000010203090308020100000001',
]
const nineumArray = PlanetNineGateway.getNineumArrayForNineumHexStrings(nineumHexStringArray) 

console.log(typeof nineumArray[0])
