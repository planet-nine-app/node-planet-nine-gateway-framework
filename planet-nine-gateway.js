const Nineum = require('./lib/nineum.js')
const network = require('./lib/utilities/network.js')
const OneTimeGateway = require('./lib/one-time-gateway.js')
const OngoingGateway = require('./lib/ongoing-gateway.js')
const PlanetNineUser = require('./lib/planet-nine-user.js')
const crypto = require('planet-nine-crypto')

class PlanetNineGateway {

  get keys() {
    return crypto.getKeys()
  }

  set getKeys(getKeysFunc) {
    crypto.getKeys = getKeysFunc
  }

  generateKeys(seed) {
    return crypto.generateKeys(seed)
  }
 
  urlForOneTimePowerUsage(totalPower, partnerName, returnURL, partnerDisplayName, description) {
    if(!this.gatewayAccessToken) { throw new Error('Must initialize gatewayAccessToken before asking for url'); }
    const url = OneTimeGateway.askForPowerUsage(totalPower, partnerName, returnURL, partnerDisplayName, description, this.gatewayAccessToken);
    return url;
  }

  async submitPowerUsage(returnedURL, callback) {
    if(!this.gatewayAccessToken) { throw new Error('Must initialize gatewayAccessToken before asking for usage'); }
    let res = await OneTimeGateway.submitPowerUsage(returnedURL, callback);
    return res;
  }

  urlToLinkWithPlanetNineApp(returnURL) {
    if(!this.gatewayAccessToken) {
      throw new Error(`Must initialize gatewayAccessToken before asking for usage`);
    }
    const url = OngoingGateway.urlToLinkWithPlanetNineApp(returnURL, this.gatewayAccessToken);
    return url;
  }

  async usePowerAtOngoingGateway(user, partnerName, totalPower) {
    if(!this.gatewayAccessToken) { throw new Error('Must initialize gatewayAccessToken before signing in'); }
    try {
      const user = await OngoingGateway.usePowerAtOngoingGateway(user.userUUID, partnerName, totalPower, user.powerOrdinal + 1, this.gatewayAccessToken)
      return user;
    } catch(err) {
      throw err;
    }
  }

  async getUser(userUUID) {
    if (!this.gatewayAccessToken) {
      throw new Error(`Must initialize gatewayAccessToken before getting user`);
    }
    const user = await PlanetNineUser.getUser(userUUID, this.gatewayAccessToken)
    return user;
  }

  getNineumArrayForNineumHexStrings(hexStrings) {
    const nineumArray = Nineum.getNineumArrayForNineumHexStrings(hexStrings)
    return nineumArray
  }
  
  getNineumFromHexString(hexString) {
    const nineum = Nineum.getNineumFromHexString(hexString)
    return nineum
  }

}

module.exports = new PlanetNineGateway();
