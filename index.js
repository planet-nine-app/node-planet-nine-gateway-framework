let PlanetNine = require('./planet-nine-gateway');
PlanetNine.gatewayAccessToken = 'PUT YOUR GATEWAY ACCESS TOKEN HERE';

let keys = PlanetNine.generateKeys('Here is a seed phrase for demo purposes');

// This is just for demo purposes. Do not actually store keys in localStorage
localStorage.setItem('keys', JSON.stringify(keys));

PlanetNine.getKeys = () => {
  let keys = JSON.parse(localStorage.getItem('keys'));
  return keys;
};

onOneTimeClick = () => {
  let askURL = PlanetNine.urlForOneTimePowerUsage(400, 'lazer', 'http://192.168.0.30:8000', 'Testing', 'Testing one time gateways');
  window.location.href = askURL;
};

// Handle one time gateway success
if(window.location.href.indexOf('signature') !== -1) {
  (async () => {
    try {
      let res = await PlanetNine.submitPowerUsage(window.location.href);
      alert(res);
      console.log(res);
    } catch(err) {
      alert('Error submitting power');
      console.log(err);
    }
  })();
}

onOngoingClick = () => {
  let askURL = PlanetNine.urlToLinkWithPlanetNineApp('http://192.168.0.30:8000');
  indow.location.href = askURL;
};

// Handle ongoing gateway success
if(window.location.href.indexOf('success') !== -1) {
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
  if(!paramsObject.success) {
     // Handle failure here
     return;
  }
  localStorage.setItem('userUUID', paramsObject.userUUID);
  
  // Now you can get user
  (async () => {
    let user = await PlanetNine.getUser(paramsObject.userUUID);
    alert('User has ' + user.nineum.length + ' nineum!');
  })();  
 
  localStorage.setItem('user', JSON.stringify(user));
  div.getElementById('ongoingPowerButton').hidden = false;
}

onUsePowerAtOngoingGateway = async () => {
  let user = localStorage.getItem('user');
  let updatedUser = await PlanetNine.usePowerAtOngoingGateway(user, 'lazer', 400);
  alert('User now has ' + updatedUser.nineum.length + ' nineum');
};
