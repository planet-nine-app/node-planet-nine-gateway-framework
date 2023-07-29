const network = require('./utilities/network.js')
const crypto = require('planet-nine-crypto')
const moment = require('moment')


module.exports = class PlanetNineUser {
  static async getUser(opts) {
    const timestamp = moment().valueOf().toString()
    const authObj = {
      gatewayAccessToken: opts.gatewayAccessToken,
      timestamp: timestamp
    }
    const signature = crypto.signMessage(JSON.stringify(authObj));
    try {
      const user = await network.getUserByUserUUID({userUUID: opts.userUUID, gatewayName: opts.gatewayName, signature: signature, timestamp: timestamp});
      return this.filterUserResp(user);
    } catch(err) {
      throw err;
    }

  }

  static filterUserResp(userResp) {
    var user = {
      userId: userResp.userId || 0,
      name: userResp.name || "",
      powerOrdinal: userResp.powerOrdinal || 0,
      currentPower: userResp.currentPower,
      powerRegenerationRate: +userResp.powerRegenerationRate || 1.0,
      globalRegenerationRate: userResp.regenerationRate || 1.666667,
      publicKey: userResp.publicKey || "",
      nineum: userResp.nineum || [],
    };
    return user;
  }
} 

