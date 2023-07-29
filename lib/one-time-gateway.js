const network = require('./utilities/network.js')


module.exports = class OneTimeGateway {

  static askForPowerUsage(totalPower, partnerName, returnURL, partnerDisplayName, description, gatewayAccessToken) {
    this.totalPower = totalPower;
    this.partnerName = partnerName;
    this.returnURL = returnURL;
    this.partnerDisplayName = partnerDisplayName;
    this.description = description;
    this.gatewayAccessToken = gatewayAccessToken;

    let urlEncodedGatewayAccessToken
    let urlEncodedPartnerDisplayName
    let urlEncodedDescription

    try {
      urlEncodedGatewayAccessToken = encodeURIComponent(gatewayAccessToken)
      urlEncodedPartnerDisplayName = encodeURIComponent(partnerDisplayName)
      urlEncodedDescription = encodeURIComponent(description)
    } catch (e) {
      console.log(e, "Error: parameters must be url encodable");
      throw e;
    }

    let urlString = `https://www.plnet9.com/spend?partnerName=${partnerName}&totalPower=${totalPower}&partnerDisplayName=${urlEncodedPartnerDisplayName}&description=${urlEncodedDescription}&gatewayurl=${returnURL}&handoff=true`;
    return urlString;
  }

  static async submitPowerUsage(returnedURL) {
    let queryString = returnedURL.split('?')[1];
    if(!queryString) {
      return {};
    }
    let params = queryString.split('&');
    let paramsObject = {};
    params.forEach(function(param) {
      let splits = param.split('=');
      paramsObject[splits[0]] = splits[1];
    });
    let powerUsage = {
      totalPower: this.totalPower,
      partnerName: this.partnerName,
      gatewayAccessToken: this.gatewayAccessToken,
      userUUID: paramsObject.userUUID,
      signature: paramsObject.signature,
      partnerDisplayName: this.partnerDisplayName,
      description: this.description,
      timestamp: paramsObject.timestamp
    }
    return await network.usePowerAtOneTimeGateway(powerUsage)
  }
}
