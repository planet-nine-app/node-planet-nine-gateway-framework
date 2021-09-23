const superagent = require('superagent')

const baseURL = 'https://api.plnet9.com';

async function put(path, payload) {
  try {
    const res = await superagent.put(path).send(payload).set('Content-Type', 'application/json').timeout(120000);
    return res.body;
  } catch(err) {
    throw err;
  }
}

async function get(path) {
  try {
    const res = await superagent.get(path).timeout(120000);
    return res.body;
  } catch(err) {
    throw err;
  }
}

module.exports = {
  getUserByUserUUID: async function (opts) {
    const path = `/user/userUUID/${opts.userUUID}/gateway/${opts.gatewayName}/signature/${opts.signature}/timestamp/${opts.timestamp}`
    try {
      const res = await get(path)
      return res.body;
    } catch(err) {
      throw err;
    }
  },

  signinWithApple: async function(signinObject) {
    const path = `/apple/signin`
    try {
      const res = await put(path, signinObject);
      return res.body;
    } catch(err) {
      throw err;
    }
  },

  signInWithGoogle: async function(signinObject) {
    const path = `/google/signin`
    try {
      const res = await put(path, signinObject);
      return res.body;
    } catch(err) {
      throw err;
    }
  },

  usePowerAtOneTimeGateway: async function(usePowerObject) { 
    const path = `/gateway/${usePowerObject.gatewayName}/power`;
    try {
      const res = await put(path, usePowerObject);
      return res.body;
    } catch(err) {
      throw err;
    }
  },

  usePowerAtOngoingGateway: async function (usePowerAtOngoingGatewayObject) {
    const path = `/gateway/${usePowerAtOngoingGatewayObject.gatewayName}/ongoing/power`;
    try { 
      const res = await put(path, usePowerAtOngoingGatewayObject);
      return res.body;
    } catch(err) {
      throw err;
    }
  },

  getUserUUIDByUsername: async function (username) {
    const path = `/user/name/${username}/userUUID`
    try { 
      const res = await get(path, callback);
      return res.body;
    } catch(err) {
      throw err;
    }
  },

  requestTransfer: async function(transferRequestWithSignatureObject) {
    const path = `/transfer/gateway/request`;
    try {
      const res = await put(path, transferRequestWithSignatureObject);
      return res.body;
    } catch(err) {
      throw err;
    }
  },

  requestOngoingGatewayUsage: async function(requestOngoingGatewayUsageObject) {
    const path = `/gateway/ongoing/request`;
    try { 
      const res = await put(path, requestOngoingGatewayUsageObject);
      return res.body;
    } catch(err) {
      throw err;
    }
  },

  registerToMintNineum: function(registerToMintNineum, callback) {
    const path = '/partner/register';
    put({path: path, payload: registerToMintNineum}, callback);
  },
  
  mintNineum: function(mintNineumRequestObjectWithSignature, callback) {
    const path = '/partner/nineum/mint';
    put({path: path, payload: mintNineumRequestObjectWithSignature}, callback);
  },

}
