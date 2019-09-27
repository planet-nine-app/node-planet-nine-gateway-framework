# Planet Nine Gateway
A node framework for embedding gateways in your apps and interacting with the Planet Nine ecosystem. 

* For the Planet Nine Gateway Node framework look no further than right here. Just scroll on down.

* [Demo code for the Planet Nine Gateway Node framework](https://github.com/planet-nine-app/node-planet-nine-gateway-framework-demo)

* [For the Planet Nine iOS Cocopod](https://github.com/planet-nine-app/iOS-PlanetNineGateway-Framework)

* [For the game demo The Ballad of Lorbert](https://github.com/planet-nine-app/theballadoflorbert)

* [For the web](https://github.com/planet-nine-app/web-power-gateway) 

## [Quick Reference](https://github.com/planet-nine-app/node-planet-nine-gateway-framework#quick-reference-guide)

## Setup

### npm Package

Install with [npm](http://npmjs.com) by running the following in the root directory of your node project:

```
npm i planet-nine-gateway-framework
```




### Cryptography

In order to handle ongoing gateways or Nineum transfer requests, your app will need to generate, store, and retrieve a public/private key pair for the gateway. Storing cryptographic keys has repercussions for storing information in your app and how to do so is outside of the scope of the Planet Nine Gateway framework and this documentation. (To learn more about the cryptography necessary for Planet Nine please check out [here](https://github.com/planet-nine-app/secp256k1-libraries#storing-keys).) This README assumes that you've already implemented a way to store keys securely. To allow the Planet Nine framework to use your key pair to sign messages to our backend, you need to override the `getKeys()` method with a function that returns your securely stored keys:

```javascript
const PlanetNineGateway = require('planet-nine-gateway-framework')

const randomSeed = //Generate cryptographicaly secure random seed here

const keys = PlanetNineGateway.generateKeys(randomSeed)
//Store keys securely here

crypto.getKeys = function() {
  //Retrieve keys from secure storage here
  return keys
}
```

### Ongoing Gateways

An ongoing gateway is used when you want to utilize a user's information, typically their Nineum, and/or you want to make Power expenditures on their behalf. Once a user has connected their account to your app you'll see their user information and be able to perform Power transactions. A user can revoke this connection at any time so be sure to handle that situation in your app. 

#### Initializing an Ongoing Gateway

Before using an ongoing gateway, you must first initialize it with a gateway name and a public key:

```javascript
const PlanetNineGateway = require('planet-nine-gateway-framework')
const crypto = require('planet-nine-crypto')

const keys = crypto.getKeys()

let gateway = new PlanetNineGateway()
gateway.ongoingGateway({gatewayName: 'test-gateway', publicKey: keys.publicKey})
```

#### Authorizing an Ongoing Gateway

Once an ongoing gateway is initialized, each user much authorize the gateway to make transactions on their account. One ongoing gateway can have multiple user accounts authorized through it.

A typical implementation involves prompting a user for their username and then looking up that user's userId with their username:

```javascript
gateway.getUserIdByUsername('test-user', (err, userId) => {
  gateway.askForOngoingGatewayUsage(userId, (erro, user) => {
    if (erro && erro === 'Ongoing gateway usage request expired') {
      //Handle rejection or timeout
    }
    console.log('user', user);
  })
})  
```

Invoking `askForOngoingGatewayUsage` will prompt the user to authorize your ongoing gateway in the Planet Nine app. It may be helpful to prompt the user to open the Planet Nine app on their mobile device. `askForOngoingGatewayUsage` will either return the user object if authorization is successful or it will return a `Ongoing gateway usage request expired` error if the request times out or is rejected. 

Once a user has approved your ongoing gateway you can retrieve their user object and make Power transactions and Nineum transfer request on their behalf.

#### Getting users

If a user has authorized your ongoing gateway, you can retrieve their user object from the Planet Nine backend:

```javascript
let userId = 157; //set to whatever your desired userId is
gateway.getUser(userId, (err, user) => {
  console.log('user', user)
}) 
```

This user object will have all the relevant user information including the user's Nineum. For an example of working with a user's Nineum check out this blogpost about making an inventory system (TODO: Link to inventory system blog post).

Planet Nine user objects have the following structure: 

```js
user { userId: 157,
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

```js
const opts = {
  totalPower: 200,
  partnerName: "tray-whirl-whirl",
  user: user, //retrieve locally cached user or call gateway.getUser()
}  
gateway.usePowerAtOngoingGateway(usePowerOpts, (err, user) => {
  if (err) {
    console.log(err)
  }
  console.log('user', user)
})
```

Remember to be responsible with user's Power, if you spend it when you shouldn't they'll revoke their connection and your reputation will suffer. 

#### Transferring Nineum

Transferring Nineum is a two-step process. First a request for a transfer is made, then the sending user must approve the transfer in the Planet Nine app. This is because third-parties are not given permission to exchange a user's Nineum. To initiate a transfer request:

```js
const requestTransferObj = {
  sourceUser: user, //retrieve locally cached user or call gateway.getUser()
  destinationUserId: 1, //call gateway.getUserIdByUsername() if needed to lookup the receiving user's userId
  nineumUniqueIds: ['01000000010204030802020100000002'], //Array of 1 or more Nineum
}  
gateway.requestTransfer(requestTransferObj, (err, trasnferRequest) => {
  console.log('trasnferRequest', trasnferRequest)
})
```

### Nineum
Once a user has connected their account you will be able to see their Nineum (by calling `getUser`) and use it in your application. Nineum has a variety of properties that you can make use of to do interesting stuff in your implementation. A Nineum is represented by a 128-bit integer represented as a hex string, and a user's Nineum is an array of those hex strings. 

Nineum have the following structure: 

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

## Quick Reference Guide

### ongoingGateway

```js
planetNineGateway.ongoingGateway(options)
```

Initializes an ongoing gateway with options specified in the opts object. 

#### Parameters

1. `options`  

 ongoingGateway() takes an options object with the following properties:

 | Property      | Description | Type  |
 | --------------|---------------| ------|
 | gatewayName      | Name of the gateway | String |
 | publicKey      | Public key for gateway      |   String |

### getUserIdByUsername

```js
planetNineGateway.getUserIdByUsername(username, callback)
```

Looks up a user's user ID by username.

#### Parameters

1. `username`  
	
 The username of the user whose user ID you want to look up
  
2. `callback`(optional)

 Optional callback function

### askForOngoingGatewayUsage

```js
planetNineGateway.askForOngoingGatewayUsage(userId, callback)
```

Prompts users to authorize the ongoing gateway. 

#### Parameters

1. `userId`  
	
 User ID of the user whose authorization you are requesting
 
2. `callback`(optional)

 Optional callback function 
 
### getUser

```js
planetNineGateway.getUser(userId, callback)
```

Gets the user object for the user with the specified user ID. 

Note: Returns an `Error: Authentication error` if the user has not authorized the gateway.

#### Parameters

1. `userId`  
	
 The user ID of the user whose you want to get
  
2. `callback`(optional)

 Optional callback function

### usePowerAtOngoingGateway

```js
planetNineGateway.usePowerAtOngoingGateway(options, callback)
```

Spends a user's Power at the gateway. 

Note: Returns an `Error: Authentication error` if the user has not authorized the gateway.

#### Parameters

1. `options`  
	
 ongoingGateway() takes an options object with the following properties:

 | Property      | Description | Type  |
 | --------------|---------------| ------|
 | totalPower      | Amount of Power user will spend at your gateway | Int |
 | partnerName      | Name of account that will receive partner Nineum      |   String |
  | user      | User object retrieved from getUser() for the user whose Power will be spent at the gateway      |   Object |

 
2. `callback`(optional)

 Optional callback function
 
### requestTransfer

```js
planetNineGateway.requestTransfer(opts, callback)
```

Initiates a Nineum transfer between users. Once the transfer has been initiated the source user must authorize the transfer

Note: Returns an `Error: Authentication error` if the user has not authorized the gateway.

#### Parameters

1. `options`  
	
 ongoingGateway() takes an options object with the following properties:

 | Property      | Description | Type  |
 | --------------|---------------| ------|
 | sourceUser    | User object retrieved from getUser() for the user from whom the Nineum will be transferred | Object |
 | destinationUserId      | User ID of the user who will receive the Nineum      |   Int |
  | nineumUniqueIds      | Array of Nineum unique IDs of the Nineum that will be transferred      |   Array\<String> |

 
2. `callback`(optional)

 Optional callback function

## Conclusion

Thank you for checking out the Planet Nine Gateway framework. Hopefully this README has been helpful. We look forward to seeing what you create!


