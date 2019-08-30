const Gateway = require('./models/gateway.js')
const network = require('./utilities/network.js')


module.exports = class OneTimeGateway {
  constructor(opts) {
    this.gateway = new Gateway(opts)
    this.totalPower = opts.totalPower
    this.partnerName = opts.partnerName
    this.gatewayName = opts.gatewayName
    this.gatewayURL = opts.gatewayURL
    this.partnerDisplayName = opts.partnerDisplayName
    this.description = opts.description
  }

  //Q: How do we want to implement this not on iOS?
  askForPowerUsage() {
    console.log('asking for power usage');
    let urlEncodedGatewayName
    let urlEncodedPartnerDisplayName
    let urlEncodedDescription

    try {
      urlEncodedGatewayName = encodeURIComponent(gateway.gatewayName)
      urlEncodedPartnerDisplayName = encodeURIComponent(partnerDisplayName)
      urlEncodedDescription = encodeURIComponent(description)
    } catch (e) {
      console.log(e, "Error: parameters must be url encodable");
      
    }

    let urlString = `planetnine://gateway/details?gatewayname=${urlEncodedGatewayName}&partnerName=${gateway.partnerName}&gatewayurl=${gateway.gatewayURL}&totalPower=${gateway.totalPower}&partnerDisplayName=${urlEncodedPartnerDisplayName}&description=${urlEncodedDescription}`
    console.log(`trying to open ${urlString}`)
    //Q: Do we want to use universal links here? 
    
  }

  submitPowerUsage(opts, callback) {
    let powerUsage = {
      totalPower: gateway.totalPower,
      partnerName: gateway.partnerName,
      gatewayName: gateway.gatewayName,
      userId: opts.userId,
      signature: opts.signature,
      partnerDisplayName: this.partnerDisplayName,
      description: this.description,
      timestamp: opts.timestamp
    }
    network.usePowerAtOneTimeGateway(powerUsage, callback)
  }
}