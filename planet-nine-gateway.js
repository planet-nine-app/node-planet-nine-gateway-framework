const Nineum = require('./lib/models/nineum.js')
const network = require('./lib/utilities/network.js')
const OneTimeGateway = require('./lib/one-time-gateway.js')
const OngoingGateway = require('./lib/ongoing-gateway.js')
const crypto = require('planet-nine-crypto')
const PlanetNineUser = require('./lib/planet-nine-user.js')

const keys = crypto.generateKeys('asdf123456')

crypto.getKeys = function() {
  return keys
}


module.exports = class PlanetNineGateway {

  // oneTimeGateway(opts) {
  //   this.oneTime = new OneTimeGateway(opts)
  // }

  // askForPowerUsage() {
  //   if (!this.oneTime) {
  //     return console.log(`Must initialize oneTimeGateway before asking for power usage`)
  //   }
  //   oneTime.askForPowerUsage() 
  // }

  // submitPowerUsage(opts, callback) {
  //   if (!this.oneTime) {
  //     return console.log(`Must initialize oneTimeGateway before submitting power usage`)
  //   }
  //   oneTime.submitPowerUsage(opts, callback)
  // }

  ongoingGateway(opts) {
    this.ongoing = new OngoingGateway(opts)
  }

  askForOngoingGatewayUsage(userId, callback) {
    if (!this.ongoing) {
      return console.log(`Must initialize ongoingGateway before asking for usage`)
    }
    this.ongoing.askForOngoingGatewayUsage(userId, callback)
  }

  usePowerAtOngoingGateway(opts, callback) {
    if (!this.ongoing) {
      return console.log(`Must initialize ongoingGateway before using power`)
    }
    this.ongoing.usePowerAtOngoingGateway(opts, callback)
  }

  getUserIdByUsername(username, callback) {
    network.getUserIdByUsername(username, (err, user) => {
      if (err) {
        callback(err)
      }
      const userId = user.userId
      callback(null, userId)
    })
  }

  getUser(opts, callback) {
    PlanetNineUser.getUser(opts, callback)
  }

  requestTransfer(opts, callback) {
    if (!this.ongoing) {
      return console.log(`Must initialize ongoingGateway before requestingTransfer`)
    }
    this.ongoing.requestTransfer(opts, callback)
  }
}