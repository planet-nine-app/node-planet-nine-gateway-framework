const axios = require('axios')

const baseURL = 'https://www.plnet9.com'

function put(opts, callback) {
  let options = {
    url: `${baseURL}${opts.path}`,
    method: 'PUT',
    data: opts.payload,
    headers: { "content-type": "application/json" }
  }
  if (opts.timeout) {
    options.timeout = opts.timeout
  }
  axios(options)
    .then((resp) => {
      if (!resp) {
        return callback(new Error('No response received from server'))
      }
      if (resp.status !== 200) {
        switch (resp.status) {
          case 401:
            return callback(new Error('Authentication error'), resp)
            break
          case 404:
            return callback(new Error('Page not found'), resp)
            break
          default:
            return callback(new Error(`Could not reach server. Status code: ${resp.status}`), resp)
            break
        }
      }
      callback(null, resp.data)
    })
    .catch(err => callback(err))
}

function get(path, callback) {
  let options = {
    method: 'GET',
    url: `${baseURL}${path}`,
    headers: { "content-type": "application/json" }
  }
  axios(options)
    .then(resp => {
      if (!resp) {
        return callback(new Error('No response received from server'))
      }
      if (resp.status !== 200) {
        switch (resp.status) {
          case 401:
            return callback(new Error('Authentication error'), resp)
            break
          case 404:
            return callback(new Error('Page not found'), resp)
            break
          default:
            return callback(new Error(`Could not reach server. Status code: ${resp.status}`), resp)
            break
        }
      }
      callback(null, resp.data)
    })
    .catch(err => {
      callback(err)
    })
}

module.exports = {
  getUserById: function (opts, callback) {
    const path = `/user/userId/${opts.userId}/gateway/${opts.gatewayName}/signature/${opts.signature}/timestamp/${opts.timestamp}`
    get(path, callback)
  },

  signinWithApple: function(signinObject, callback) {
    const path = `/applesso/signin`
    put({path: path, payload: signinObject}, callback);
  },

  usePowerAtOneTimeGateway: function(usePowerObject, callback) { 
    const path = `/user/userId/${usePowerObject.userid}/power/gateway/${usePowerObject.gatewayName}`
    put({ path: path, payload: usePowerObject }, callback)
  },

  usePowerAtOngoingGateway: function (usePowerAtOngoingGatewayObject, callback) {
    const path = `/user/userId/${usePowerAtOngoingGatewayObject.userId}/power/gateway/${usePowerAtOngoingGatewayObject.gatewayName}/ongoing`
    put({ path: path, payload: usePowerAtOngoingGatewayObject }, callback)
  },

  getUserIdByUsername: function (username, callback) {
    const path = `/user/name/${username}/userId`
    get(path, callback)
  },

  requestTransfer: function (gatewayName, transferRequestWithSignatureObject, callback) {
    const path = `/user/userId/${transferRequestWithSignatureObject.userId}/gateway/${gatewayName}/transfer/request`
    put({ path: path, payload: transferRequestWithSignatureObject }, callback)
  },

  requestOngoingGatewayUsage: function (userId, requestOngoingGatewayUsageObject, callback) {
    const path = `/user/userId/${userId}/ongoing/request`
    put({ path: path, payload: requestOngoingGatewayUsageObject, timeout: 120000 }, callback)
  },
}
