const request = require('request')

const baseURL = 'https://www.plnet9.com'

function put(opts, callback) {
  let options = {
    url: baseURL + opts.path,
    method: 'PUT',
    body: opts.payload,
    json: true,
    headers: {"content-type": "application/json"} 
  }
  if (opts.timeout) {
    options.timeout = opts.timeout
  }
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
          break
        case 404:
          return callback (new Error('Page not found'), resp)
          break
       default:
          return callback (new Error('Could not reach server 1234'), resp)
          break
      } 
    }
    callback(null, resp)
  })
}

function get(path, callback) {
  let options = {
    url: baseURL + path,
    method: 'GET',
    json: true,
    headers: {"content-type": "application/json"}
  }
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
          break
        case 404:
          return callback (new Error('Page not found'), resp)
          break
       default:
          return callback (new Error('Could not reach server'), resp)
          break
      } 
    }
    callback(null, resp.body)
  })
}

module.exports = {
  
  getUserById: function(opts, callback) {
    const path = `/user/userId/${opts.userId}/gateway/${opts.gatewayName}/signature/${opts.signature}/timestamp/${opts.timestamp}`
    get(path, callback)
  },

  usePowerAtOneTimeGateway: function(usePowerObject, callback) { 
    const path = `/user/userId/${usePowerObject.userid}/power/gateway/${usePowerObject.gatewayName}`
    put({path: path, payload: usePowerObject}, callback)
  },

  usePowerAtOngoingGateway: function(usePowerAtOngoingGatewayObject, callback) {
    const path = `/user/userId/${usePowerAtOngoingGatewayObject.userId}/power/gateway/${usePowerAtOngoingGatewayObject.gatewayName}/ongoing`
    put({path: path, payload: usePowerAtOngoingGatewayObject}, callback)
  },

  getUserIdByUsername: function(username, callback) {
    const path = `/user/name/${username}/userId`
    get(path, callback)
  },

  requestTransfer: function(gatewayName, transferRequestWithSignatureObject, callback) {
    const path = `/user/userId/${transferRequestWithSignatureObject.userId}/gateway/${gatewayName}/transfer/request`
    put({path: path, payload: transferRequestWithSignatureObject}, callback)
  },

  requestOngoingGatewayUsage: function(userId, requestOngoingGatewayUsageObject, callback) {
    const path = `/user/userId/${userId}/ongoing/request`
    put({path: path, payload: requestOngoingGatewayUsageObject, timeout: 120000}, callback)
  },
  
}
