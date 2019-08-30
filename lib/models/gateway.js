module.exports = class Gateway {
  constructor(opts) {
    this.totalPower = opts.totalPower
    this.partnerName = opts.partnerName
    this.gatewayName = opts.gatewayName
    this.gatewayURL = opts.gatewayURL
    this.partnerDisplayName = opts.partnerDisplayName
    this.description = opts.description
  }

  addSignatureToGatewayKey(gatewayKeyObject, signature) {
    let gatewayKeyObjectWithSignature = {
      gatewayName: gatewayKeyObject.gatewayName,
      publicKey: gatewayKeyObject.publicKey,
      timestamp: gatewayKeyObject.timestamp,
      signature: signature,
    }
    return gatewayKeyObjectWithSignature
  }
}
