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

  ongoingGateway(opts) {
    this.ongoing = new OngoingGateway(opts)
  }

  healthcheck(callback) {
    if (callback === undefined) {
      return new Promise((resolve, reject) => {
        this.askForOngoingGatewayUsage(userId, (err, result) => {
          err ? reject(err) : resolve(result)
        })
      })
    }
    network.healthcheck((err, resp) => {
      if (err) {
        callback(err)
      }
      callback(null, resp)
    }) 
  }

  askForOngoingGatewayUsage(userId, callback) {
    if (callback === undefined) {
      return new Promise((resolve, reject) => {
        this.askForOngoingGatewayUsage(userId, (err, result) => {
          err ? reject(err) : resolve(result)
        })
      })
    }

    if (!this.ongoing) {
      return callback(new Error(`Must initialize ongoingGateway before asking for usage`))
    }

    this.ongoing.askForOngoingGatewayUsage(userId, callback)
  }

  signinWithApple(gatewayName, appleId, callback) {
    if (callback === undefined) {
      return new Promise((resolve, reject) => {
        this.signinWithApple(gatewayName, appleId, (err, result) => {
          err ? reject(err) : resolve(result);
        });
      });
    }

    if(!this.ongoing) {
      return callback(new Error('Must initialize ongoingGateway before asking for usage'));
    } 

    this.ongoing.signinWithApple(gatewayName, appleId, callback);
  }

  usePowerAtOngoingGateway(opts, callback) {
    if (callback === undefined) {
      return new Promise((resolve, reject) => {
        this.usePowerAtOngoingGateway(opts, (err, result) => {
          err ? reject(err) : resolve(result)
        })
      })
    }

    if (!this.ongoing) {
      return callback(new Error(`Must initialize ongoingGateway before using power`))
    }

    this.ongoing.usePowerAtOngoingGateway(opts, callback)
  }

  getUserIdByUsername(username, callback) {
    if (callback === undefined) {
      return new Promise((resolve, reject) => {
        this.getUserIdByUsername(username, (err, result) => {
          err ? reject(err) : resolve(result)
        })
      })
    }

    network.getUserIdByUsername(username, (err, user) => {
      if (err) {
        callback(err)
      }
      const userId = user.userId
      callback(null, userId)
    })
  }

  getUser(userId, callback) {
    if (callback === undefined) {
      return new Promise((resolve, reject) => {
        this.getUser(userId, (err, result) => {
          err ? reject(err) : resolve(result)
        })
      })
    }

    if (!this.ongoing) {
      return callback(new Error(`Must initialize ongoingGateway before getting user`))
    }

    const opts = {
      gatewayName: this.ongoing.gatewayName,
      userId: userId,
    }
    PlanetNineUser.getUser(opts, callback)
  }

  requestTransfer(opts, callback) {
    if (callback === undefined) {
      return new Promise((resolve, reject) => {
        this.requestTransfer(opts, (err, result) => {
          err ? reject(err) : resolve(result)
        })
      })
    }

    if (!this.ongoing) {
      return console.log(`Must initialize ongoingGateway before requestingTransfer`)
    }

    this.ongoing.requestTransfer(opts, callback)
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
