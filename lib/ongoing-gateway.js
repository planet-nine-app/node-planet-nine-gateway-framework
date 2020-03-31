const network = require('./utilities/network.js')
const crypto = require('planet-nine-crypto')
const moment = require('moment')
const PlanetNineUser = require('./planet-nine-user.js')

module.exports = class OngoingGateway {
  constructor(opts) {
    this.gatewayName = opts.gatewayName
    this.publicKey = opts.publicKey
  }

  signinWithApple(gatewayName, appleId, callback) {
    let signinObject = {
      appName: gatewayName,
      appleId: appleId,
      appPublicKey: this.publicKey,
      timestamp: moment().valueOf().toString()
    }
    signinObject.signature = crypto.signMessage(JSON.stringify(signinObject));
    network.signinWithApple(signinObject, (err, resp) => {
      if (err) return callback(err)
      const user = PlanetNineUser.filterUserResp(resp.body);
      callback(null, user);
    });
  }

  askForOngoingGatewayUsage(userId, callback) {
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
      if (err) return callback(err)
      const user = PlanetNineUser.filterUserResp(resp.body)
      callback(null, user)
    })
  }

  usePowerAtOngoingGateway(opts, callback) {
    let usePowerAtOngoingGatewayObject = {
      totalPower: opts.totalPower,
      partnerName: opts.partnerName,
      gatewayName: this.gatewayName,
      userId: opts.user.userId,
      publicKey: this.publicKey,
      ordinal: opts.user.powerOrdinal + 1,
      timestamp: moment().valueOf().toString(),
    }
    usePowerAtOngoingGatewayObject.signature = crypto.signMessage(JSON.stringify(usePowerAtOngoingGatewayObject))
    network.usePowerAtOngoingGateway(usePowerAtOngoingGatewayObject, (err, resp) => {
      if (err) return callback(err)
      const user = PlanetNineUser.filterUserResp(resp.body)
      callback(null, user)
    })
  }

  requestTransfer(opts, callback) {
    const requestTransferObject = {
      userId: opts.sourceUser.userId,
      sourceUserId: opts.sourceUser.userId,
      destinationUserId: opts.destinationUserId,
      nineumUniqueIds: opts.nineumUniqueIds,
      price: opts.price || 0,
      currencyName: "USD",
      ordinal: opts.sourceUser.powerOrdinal + 1,
      timestamp: moment().valueOf().toString(),
    }
    requestTransferObject.signature = crypto.signMessage(JSON.stringify(requestTransferObject))
    network.requestTransfer(this.gatewayName, requestTransferObject, (err, resp) => {
      if (err) return callback(err)
      const nineumTransferRequest = resp.body
      callback(null, nineumTransferRequest)
    })
  }

  mintNineum(opts, callback) {
    const mintNineumRequest = {
      partnerUUID: opts.partnerUUID,
      flavors: opts.flavors,
      ordinal: opts.ordinal,
      timestamp: moment().valueOf().toString()
    };

    mintNineumRequest.signature = crypto.signMessage(JSON.stringify(mintNineumRequest));
    network.mintNineum(mintNineumRequest, (err, resp) => {
      if (err) return callback(err);
      const nineum = resp.body;
      callback(null, nineum);
    });
  }

}
