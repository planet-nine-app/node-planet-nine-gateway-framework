const request = require('request');

const baseURL = 'https://www.plnet9.com';

function put(path, payload, callback) {
  let options = {
    url: baseURL + path,
    method: 'PUT',
    body: payload,
    json: true,
    headers: {"content-type": "application/json"} 
  };
  request(options, (err, resp, body) => {
    if (err) {
      return callback(err)
    }
    if (!resp) {
      return callback (new Error('No response received from server'))
    }
    if (resp.statusCode !== 200) {
      switch (resp.statusCode) {
        case 401:
          return callback (new Error('Authentication error'), resp)
          break;
        case 404:
          return callback (new Error('Page not found'), resp)
          break;
       default:
          return callback (new Error('Could not reach server'), resp)
          break;
      } 
    }
    callback(null, resp)
  });
};

function get(path, callback) {
  let options = {
    url: baseURL + path,
    method: 'GET',
    json: true,
    headers: {"content-type": "application/json"}
  };
  request(options, (err, resp, body) => {
    if (err) {
      return callback(err)
    }
    if (!resp) {
      return callback (new Error('No response received from server'))
    }
    if (resp.statusCode !== 200) {
      switch (resp.statusCode) {
        case 401:
          return callback (new Error('Authentication error'), resp)
          break;
        case 404:
          return callback (new Error('Page not found'), resp)
          break;
       default:
          return callback (new Error('Could not reach server'), resp)
          break;
      } 
    }
    callback(null, resp)
  });
}

module.exports = {
  
  getUserById: function(userId, gatewayName, timestamp, signature, callback) {
    const path = `/user/userId/${userId}/gateway/${gatewayName}/signature/${signature}/timestamp/${timestamp}`;
    get(path, callback);
  },

  usePowerAtOneTimeGateway(usePowerObject, callback) { 
    const path = `/user/userId/${usePowerObject.userid}/power/gateway/${usePowerObject.gatewayName}`;
    put(path, usePowerObject, callback);
  },

  usePowerAtOngoingGateway(usePowerAtOngoingGatewayObject, callback) {
    const path = `/user/userId/${usePowerAtOngoingGatewayObject.userid}/power/gateway/${usePowerAtOngoingGatewayObject.gatewayName}/ongoing`;
    put(path, usePowerAtOngoingGatewayObject, callback);
  },

  getUserIdByUsername(username, callback) {
    const path = `/user/name/${username}/userId`;
    get(path, callback);
  },

  requestTransfer(transferRequestWithSignatureObject, gatewayName, callback) {
    const path = `/user/userId/${transferRequestWithSignature.userId}/gateway/${gatewayName}/transfer/request`;
    put(path, transferRequestWithSignatureObject, callback);
  }

};
