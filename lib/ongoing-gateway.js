const network = require('./utilities/network.js')
const crypto = require('planet-nine-crypto')
const moment = require('moment')
const PlanetNineUser = require('./planet-nine-user.js')

module.exports = class OngoingGateway {
  
  static urlToLinkWithPlanetNineApp(returnURL, gatewayAccessToken) {
    let gatewayKey = { 
      gatewayAccessToken: gatewayAccessToken, 
      publicKey: crypto.getKeys().publicKey, 
      timestamp: moment().valueOf().toString()
    };
    gatewayKey.signature = crypto.signMessage(JSON.stringify(gatewayKey));
    const url = `https://www.plnet9.com/ongoing?gatewayAccessToken=${encodeURIComponent(gatewayAccessToken)}&publickey=${gatewayKey.publicKey}&gatewayurl=${returnURL}&gatewaySignature=${gatewayKey.signature}&timestamp=${gatewayKey.timestamp}`;
    return url;
  }

  static async usePowerAtOngoingGateway(userUUID, partnerName, totalPower, ordinal, gatewayAccessToken) {
    let usePowerAtOngoingGatewayObject = {
      totalPower: totalPower,
      partnerName: partnerName,
      gatewayAccessToken: gatewayAccessToken,
      userUUID: userUUID,
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

}
