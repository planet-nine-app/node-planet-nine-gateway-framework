const network = require('./utilities/network.js')
const crypto = require('planet-nine-crypto')
const moment = require('moment')


module.exports = class PlanetNineUser {
  static getUser(opts, callback) {
    const timestamp = moment().valueOf().toString()
    const authObj = {
      gatewayName: opts.gatewayName,
      timestamp: timestamp
    }
    const signature = crypto.signMessage(JSON.stringify(authObj));
    network.getUserById({userId: opts.userId, gatewayName: opts.gatewayName, signature: signature, timestamp: timestamp}, (err, userResp) => {
      if (err) return callback(err)    
      const user = this.filterUserResp(userResp) 
      callback(null, user)
    })
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

