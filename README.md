# Planet Nine Gateway
A node framework for embedding gateways in your apps and webpages, and interacting with the Planet Nine ecosystem. 

* For the Planet Nine Gateway Node framework look no further than right here. Just scroll on down.

* Examples can be found in the example dir in this repo

* [For the Planet Nine iOS Cocopod](https://github.com/planet-nine-app/iOS-PlanetNineGateway-Framework)

* [For the game demo The Ballad of Lorbert](https://github.com/planet-nine-app/theballadoflorbert)

* [If all you want is a one-time gateway on your webpage, click here.](https://github.com/planet-nine-app/web-power-gateway) 

## [Quick Reference](https://github.com/planet-nine-app/node-planet-nine-gateway-framework#quick-reference-guide)

## Setup

### npm Package

Install with [npm](http://npmjs.com) by running the following in the root directory of your node project:

```
npm i planet-nine-gateway-framework
```




### Keys

In order to handle ongoing gateways or Nineum transfer requests, your app will need to generate, store, and retrieve a public/private key pair for the gateway. Storing cryptographic keys has repercussions for storing information in your app and how to do so is outside of the scope of the Planet Nine Gateway framework and this documentation. (To learn more about the cryptography necessary for Planet Nine please check out [here](https://github.com/planet-nine-app/secp256k1-libraries#storing-keys).) This README assumes that you've already implemented a way to store keys securely. To allow the Planet Nine framework to use your key pair to sign messages to our backend, you need to override the `getKeys()` method with a function that returns your securely stored keys:

```javascript
const PlanetNineGateway = require('planet-nine-gateway-framework')

const randomSeed = //Generate cryptographicaly secure random seed here

const keys = PlanetNineGateway.generateKeys(randomSeed)
//Store keys securely here

PlanetNineGateway.getKeys = function() {
  //Retrieve keys from secure storage here
  return keys
}
```

### Ongoing Gateways

An ongoing gateway is used when you want to utilize a user's information, typically their Nineum, and/or you want to make Power expenditures on their behalf. Once a user has connected their account to your app you'll see their user information and be able to perform Power transactions. A user can revoke this connection at any time so be sure to handle that situation in your app. 

#### Initiating a key association

First a user must authorize your app. To do so, the Planet Nine Platform associates the public key you designate for the user with your gateway. To do so your app will issue a request to the Planet Nine app. If the user accepts the association, they will perform the association, and then return their userUUID to you. Once you have the userUUID you can make authenticated requests on their behalf. To get the url for the request you call `urlToLinkWithPlanetNineApp` with the url that will return the user to your app.

```javascript
let askURL = PlanetNine.urlToLinkWithPlanetNineApp(window.location.href);
// open URL
window.location.href = askURL;
```

#### Getting users

If a user has authorized your ongoing gateway, you can retrieve their user object from the Planet Nine backend:

```javascript
let user = await PlanetNine.getUser(userUUID);
```

This user object will have all the relevant user information including the user's Nineum. For an example of working with a user's Nineum check out this blogpost about making an inventory system (TODO: Link to inventory system blog post).

Planet Nine user objects have the following structure: 

```js
user { userUUID: '38370B11-F5B8-44F4-BA63-C8262C8C35A1',
  name: 'testuser12',
  powerOrdinal: 1,
  currentPower: 1000,
  powerRegenerationRate: 1.6666984999999996,
  globalRegenerationRate: 1.666667,
  publicKey: '0367fab3d8b194f2557d75a20b2b5d7f181eaf82d6e2705b3012545efe1730b45c',
  nineum:
   [ '01000000010105010203030100000001',
     '01000000010106090407070100000001',
     '01000000010204030802020100000002' ] }
```

#### Spending Power

You can make Power expenditures on behalf of users who have authorized your gateway. To do this you will need to call `usePowerAtOngoingGateway` like so:

```javascript
let user = JSON.parse(localStorage.getItem('user'));
let updatedUser = await PlanetNine.usePowerAtOngoingGateway(user, 'lazer', 400); // lazer is the name of the user to spend power with, and 400 is the total power of the transaction
```

Remember to be responsible with user's Power, if you spend it when you shouldn't they'll revoke their connection and your reputation will suffer. 

### Nineum
Once a user has connected their account you will be able to see their Nineum (by calling `getUser`) and use it in your application. Nineum has a variety of properties that you can make use of to do interesting stuff in your implementation. A Nineum is represented by a 128-bit integer represented as a hex string, and a user's Nineum is an array of those hex strings. 

The Planet Nine Gateway framework provides methods for constructing Nineum from their hexstrings. Nineum then have the following structure: 

```js
Nineum {
  universe: 'The Universe',
  address: 'Planet Nine',
  charge: 'Positive',
  direction: 'West',
  rarity: 'Nine',
  size: 'Huge',
  texture: 'Gritty',
  shape: 'Cone',
  year: 'Year One',
  ordinal: 1,
  uniqueId: '01000000010104090805070100000001', 
}
```

The Planet Nine Gateway framework includes some utility functions to help parse Nineum objects from Nineum hex strings. These functions can be used without initializing an ongoing gateway or receiving user authorization for a gateway. 

Call `getNineumFromHexString` to parse a single Nineum hex string:

```js
const PlanetNineGateway = require('planet-nine-gateway-framework')

const NineumHexString = '01000000010104090805070100000001'
const nineum = PlanetNineGateway.getNineumFromHexString(NineumHexString)
console.log(nineum)
```

Or call `getNineumArrayForNineumHexStrings` to parse an array of Nineum hex strings into an array of Nineum:

```js
const PlanetNineGateway = require('planet-nine-gateway-framework')

const nineumHexStringArray = [
  '01000000010105010203030100000001',
  '01000000010203090506080100000001',
  '01000000010203090308020100000001',
]
const nineumArray = PlanetNineGateway.getNineumArrayForNineumHexStrings(nineumHexStringArray) 
console.log(nineumArray)
```

## One Time Gateway

If all you want to do is process a single power transaction, then a one time gateway is for you. Similar to associating an ongoing gateway, you first get a url to request authorization from the user in the Planet Nine app. Then you submit their signed request to the Planet Nine backend. To start, ask for the url:

```js
let askURL = PlanetNine.urlForOneTimePowerUsage(400, 'lazer', window.location.href, 'Testing', 'Testing one time gateways');
window.location.href = askURL;
```

Then, when the user returns to your app, submit the request via the return url.

```js
let res = await PlanetNine.submitPowerUsage(window.location.href, 400, 'lazer');
// do something cool for the user
```

## Quick Reference Guide

### ongoingGateway

### askForOngoingGatewayUsage

```js
planetNineGateway.urlToLinkWithPlanetNineApp(returnURL)
```

Gets the URL to prompt user for association in the Planet Nine app

#### Parameters

1. `returnURL`
	
 The URL that will bring a user back to your app. On success this url will be concatenated with query params including the userUUID. You can then use that userUUID to get the user.
 
### getUser

```js
planetNineGateway.getUser(userUUID)
```

Gets the user object for the user with the specified user UUID. 

Note: Returns an `Error: Authentication error` if the user has not authorized the gateway.

#### Parameters

1. `userUUID`  
	
 The userUUID of the user whose info you want to get

### usePowerAtOngoingGateway

```js
planetNineGateway.usePowerAtOngoingGateway(user, partnerName, totalPower)
```

Spends a user's Power at the gateway. 

Note: Returns an `Error: Authentication error` if the user has not authorized the gateway.

#### Parameters

1. `user`  
	
  The user you want to spend the power
 
2. `partnerName`

 the name of the user to spend the power with

3. `totalPower`

  the amount of power to spend
 
## Conclusion

Thank you for checking out the Planet Nine Gateway framework. Hopefully this README has been helpful. We look forward to seeing what you create!


