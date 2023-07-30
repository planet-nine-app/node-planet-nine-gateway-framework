const superagent = require('superagent')

const baseURL = 'https://api.plnet9.com';

async function put(path, payload) {
  try {
    const res = await superagent.put(baseURL + path).send(payload).set('Content-Type', 'application/json').timeout(120000);
    return res.body;
  } catch(err) {
    throw err;
  }
}

async function get(path) {
  try {
    const res = await superagent.get(baseURL + path).timeout(120000);
    return res.body;
  } catch(err) {
    throw err;
  }
}

module.exports = {
  getUserByUserUUID: async function (userUUID, gatewayAccessToken, signature, timestamp) {
    const path = `/gateway/gatewayAccessToken/${gatewayAccessToken}/userUUID/${userUUID}/signature/${signature}/timestamp/${timestamp}`
    try {
      const res = await get(path)
      return res;
    } catch(err) {
      throw err;
    }
  },

  usePowerAtOneTimeGateway: async function(usePowerObject) { 
    const path = `/gateway/power`;
    try {
      const res = await put(path, usePowerObject);
      return res;
    } catch(err) {
      throw err;
    }
  },

  usePowerAtOngoingGateway: async function (usePowerAtOngoingGatewayObject) {
    const path = `/gateway/gatewayAccessToken/${usePowerAtOngoingGatewayObject.gatewayAccessToken}/ongoing/power`;
    try { 
      const res = await put(path, usePowerAtOngoingGatewayObject);
      return res;
    } catch(err) {
      throw err;
    }
  },

}
