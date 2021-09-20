const Nineum = require('./lib/nineum.js')
const network = require('./lib/utilities/network.js')
const OneTimeGateway = require('./lib/one-time-gateway.js')
const OngoingGateway = require('./lib/ongoing-gateway.js')
const PlanetNineUser = require('./lib/planet-nine-user.js')
const crypto = require('planet-nine-crypto')

module.exports = class PlanetNineGateway {

  get keys() {
    return crypto.getKeys()
  }

  set getKeys(getKeysFunc) {
    crypto.getKeys = getKeysFunc
  }

  static generateKeys(seed) {
    return crypto.generateKeys(seed)
  }

  ongoingGateway(gatewayName) {
    const publicKey = crypto.getKeys().publicKey;
    this.ongoing = new OngoingGateway(gatewayName, publicKey);
    return this.ongoing
  }

  async askForOngoingGatewayUsage() {
    if(!this.ongoing) {
      throw new Error(`Must initialize ongoingGateway before asking for usage`);
    }
    try {
      const res = await this.askForOngoingGatewayUsage();
      return res;
    } catch(err) {
      throw err;
    }
  }

  async urlToLinkWithPlanetNineApp(returnURL) {
    if(!this.ongoing) {
      throw new Error(`Must initialize ongoingGateway before asking for usage`);
    }
    const url = await this.ongoing.urlToLinkWithPlanetNineApp(returnURL);
    return url;
  }

  async signinWithApple(gatewayName, appleId) {
    if(!this.ongoing) { throw new Error('Must initialize ongoingGateway before signing in'); }
    try { 
      const user = await this.ongoing.signinWithApple(gatewayName, appleId);
      return user;
    } catch(err) {
      throw err;
    }
  }

  async signInWithGoogle(googleIdToken) {
    if(!this.ongoing) { throw new Error('Must initialize ongoingGateway before signing in'); }
    try { 
      const user = await this.ongoing.signinWithGoogle(gatewayName, googleIdToken);
      return user;
    } catch(err) {
      throw err;
    }
  }

  async usePowerAtOngoingGateway(user, partnerName, totalPower) {
    if(!this.ongoing) { throw new Error('Must initialize ongoingGateway before signing in'); }
    try {
      const user = await this.ongoing.usePowerAtOngoingGateway(user.userUUID, partnerName, totalPower, user.powerOrdinal + 1)
      return user;
    } catch(err) {
      throw err;
    }
  }

  async getUserIdByUsername(username) {
    try {
      const userUUID = await network.getUserUUIDByUsername(username);
      return userUUID;
    } catch(err) {
      throw err;
    }
  }

  async getUser(userUUID) {
    if (!this.ongoing) {
      throw new Error(`Must initialize ongoingGateway before getting user`);
    }
    const opts = {
      gatewayName: this.ongoing.gatewayName,
      userUUID: userUUID
    }
    PlanetNineUser.getUser(opts, callback)
  }

  async requestTransfer(requestingUser, destinationUserUUID, nineumUniqueIds, price) {
    if (!this.ongoing) {
      throw new Error(`Must initialize ongoingGateway before requestingTransfer`);
    }
    try {
      const nineumTransferRequest = await this.ongoing.requestTransfer(opts);
      return nineumTransferRequest;
    } catch(err) {
      throw err;
    }
  }

  static getNineumArrayForNineumHexStrings(hexStrings) {
    const nineumArray = Nineum.getNineumArrayForNineumHexStrings(hexStrings)
    return nineumArray
  }
  
  static getNineumFromHexString(hexString) {
    const nineum = Nineum.getNineumFromHexString(hexString)
    return nineum
  }
}
