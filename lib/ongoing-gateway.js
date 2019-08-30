const network = require('./utilities/network.js')
const crypto = require('planet-nine-crypto')
const moment = require('moment')
const PlanetNineUser = require('./planet-nine-user.js')

module.exports = class OngoingGateway {
  constructor(opts) {
    this.gatewayName = opts.gatewayName
    this.publicKey = opts.publicKey
  }

  askForOngoingGatewayUsage(userId, callback) {
    console.log('Asking for ongoing gateway usage')
    let ongoingGatewayRequest = {
      gatewayName: this.gatewayName,
      publicKey: this.publicKey,
      timestamp: moment().valueOf().toString(),
    }
    ongoingGatewayRequest.gatewaySignature = crypto.signMessage(JSON.stringify(ongoingGatewayRequest))
    network.requestOngoingGatewayUsage(userId, ongoingGatewayRequest, (err, resp) => {
      if (err && err.message === 'ESOCKETTIMEDOUT') {
        return callback(new Error('Ongoing gateway usage request expired'))
      }
      if (err) {
        return callback(err)
      }
      const user = PlanetNineUser.filterUserResp(resp.body)
      callback(null, user)
    })
  }

  usePowerAtOngoingGateway(opts, callback) {
    let usePowerAtOngoingGatewayObject = {
      totalPower: opts.totalPower,
      partnerName: opts.partnerName,
      gatewayName: this.gatewayName,
      userId: opts.userId,
      publicKey: this.publicKey,
      ordinal: opts.ordinal,
      timestamp: moment().valueOf().toString(),
    }
    usePowerAtOngoingGatewayObject.signature = crypto.signMessage(JSON.stringify(usePowerAtOngoingGatewayObject))
    network.usePowerAtOngoingGateway(usePowerAtOngoingGatewayObject, (err, resp) => {
      if (err) {
        return callback(err)
      }
      const user = PlanetNineUser.filterUserResp(resp.body)
      callback(null, user)
    })
  }
  //TODO: move to Gateway class -> subclass OngoingGateway and OneTimeGateway from Gateway??
  requestTransfer(opts, callback) {
    const requestTransferObject = {
      userId: opts.userId,
      sourceUserId: opts.sourceUserId,
      destinationUserId: opts.destinationUserId,
      nineumUniqueIds: opts.nineumUniqueIds,
      price: opts.price || 0,
      currencyName: "USD",
      ordinal: opts.ordinal,
      timestamp: moment().valueOf().toString(),
    }
    requestTransferObject.signature = crypto.signMessage(JSON.stringify(requestTransferObject))
    network.requestTransfer(this.gatewayName, requestTransferObject, (err, resp) => {
      if (err) return callback(err)
//TODO: format nineum transfer response
      // const nineumTransferRequest = NineumTransferRequest.filterRequestResp(resp.body)
      // callback(null, nineumTransferRequest)
      callback(null, {'Success': true})
    })
  }

}