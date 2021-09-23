const network = require('./utilities/network.js')
const crypto = require('planet-nine-crypto')
const moment = require('moment')
const PlanetNineUser = require('./planet-nine-user.js')

module.exports = class OngoingGateway {
  constructor(gatewayName, publicKey) {
    this.gatewayName = opts.gatewayName
    this.publicKey = opts.publicKey
  }

  async signinWithApple(gatewayName, appleId) {
    let signinObject = {
      appName: gatewayName,
      appleId: appleId,
      appPublicKey: this.publicKey,
      timestamp: moment().valueOf().toString()
    }
    signinObject.signature = crypto.signMessage(JSON.stringify(signinObject));
    try {
      const user = await network.signinWithApple(signinObject);
      return PlanetNineUser.filterUserResp(user);
    } catch(err) {
      throw err;
    }
  }

  async signInWithGoogle(googleIdToken, callback) {
    let signinObject = {
      googleIdToken: googleIdToken,
      appPublicKey: this.publicKey,
      timestamp: moment().valueOf().toString()
    }
    signinObject.signature = crypto.signMessage(JSON.stringify(signinObject));
    try {
      const user = await network.signInWithGoogle(signinObject);
      return PlanetNineUser.filterUserResp(user);
    } catch(err) {
      throw err;
    }
  }

  async askForOngoingGatewayUsage() {
    let ongoingGatewayRequest = {
      gatewayName: this.gatewayName,
      publicKey: this.publicKey,
      timestamp: moment().valueOf().toString(),
    }
    ongoingGatewayRequest.gatewaySignature = crypto.signMessage(JSON.stringify(ongoingGatewayRequest))
    try {
      const user = await network.requestOngoingGatewayUsage(ongoingGatewayRequest);
      return PlanetNineUser.filterUserResp(user);
    } catch(err) {
      throw err;
    }
  }

  async urlToLinkWithPlanetNineApp(returnURL) {
    let gatewayKey = { 
      gatewayName: this.gatewayName, 
      publicKey: crypto.getKeys().publicKey, 
      timestamp: moment().valueOf().toString()
    };
    gatewayKey.signature = crypto.signMessage(JSON.stringify(gatewayKey));
    const url = `planetnine://ongoing?gatewayname=${encodeURIComponent(this.gatewayName)}&publickey=${gatewayKey.publicKey}&gatewayurl=${returnURL}&timestamp=${gatewayKey.timestamp}`;
    return url;
  }

  async usePowerAtOngoingGateway(userUUID, partnerName, totalPower, ordinal) {
    let usePowerAtOngoingGatewayObject = {
      totalPower: totalPower,
      partnerName: partnerName,
      gatewayName: this.gatewayName,
      userUUID: userUUID,
      publicKey: this.publicKey,
      ordinal: ordinal,
      timestamp: moment().valueOf().toString(),
    }
    usePowerAtOngoingGatewayObject.signature = crypto.signMessage(JSON.stringify(usePowerAtOngoingGatewayObject))
    try { 
      const user = await network.usePowerAtOngoingGateway(usePowerAtOngoingGatewayObject);
      return PlanetNineUser.filterUserResp(user);
    } catch(err) {
      throw err;
    }
  }

  async requestTransfer(sourceUserUUID, destinationUserUUID, nineumUniqueIds, price, ordinal, callback) {
    const requestTransferObject = {
      userId: sourceUserUUID,
      sourceUserId: sourceUserUUID,
      destinationUserId: destinationUserUUID,
      nineumUniqueIds: nineumUniqueIds,
      price: price || 0,
      currencyName: "USD",
      ordinal: ordinal,
      timestamp: moment().valueOf().toString(),
    }
    requestTransferObject.signature = crypto.signMessage(JSON.stringify(requestTransferObject))
    try { 
      const nineumTransferRequest = await network.requestTransfer(this.gatewayName, requestTransferObject);
      return nineumTransferRequest;
    } catch(err) {
      throw err;
    }
  }

  registerToMintNineum(opts, callback) {
    const registerToMintNineumObject = {
      partnerUUID: opts.partnerUUID,
      address: opts.address,
      partnerKey: opts.partnerKey,
      ordinal: opts.ordinal,
      timestamp: moment().valueOf().toString()
    };
    registerToMintNineumObject.signature = crypto.signMessage(JSON.stringify(registerToMintNineumObject));
    network.registerToMintNineum(registerToMintNineumObject, (err, resp) => {
      if(err) return callback(err);
      const pnUser = PlanetNineUser.filterUserResp(resp.body)
      callback(null, pnUser);
    });
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
