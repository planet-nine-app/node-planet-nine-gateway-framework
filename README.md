## Notice About planetninekit.com

www.planetninekit.com is currently under construction. Until it is up and running here are some helpful links.

* For the PlanetNineGateway Node framework look no further than right here. Just scroll on down.

* [For the Planet Nine iOS Cocopod](https://github.com/planet-nine-app/iOS-PlanetNineGateway-Framework)

* [For the game demo The Ballad of Lorbert](https://github.com/planet-nine-app/theballadoflorbert)

* [For the web](https://github.com/planet-nine-app/web-power-gateway) 

# node-planet-nine-gateway-framework
A node framework for embedding gateways in your apps and interacting with the Planet Nine ecosystem. 

## Getting Started

### npm Package

Install with [npm](http://npmjs.com) by running the following in the root directory of your node project:

```
npm i planet-nine-gateway
```

## Usage

### Cryptography

In order to handle ongoing gateways or Nineum transfer requests, your app will need to generate, store, and retreive a public/private key pair for the gateway. Storing cryptographic keys has repurcusions for storing information in your app and how to do so is outside of the scope of the Planet Nine Gateway framework and this documentation. (To learn more about the cryptography necessary for Planet Nine please check out [here](https://github.com/planet-nine-app/secp256k1-libraries#storing-keys).) This README assumes that you've already implemented a way to store keys securely. To allow the Planet Nine framework to use your key pair to sign messages to our backend, you need to override the `getKeys()` method with a function that returns your securely stored keys:

```javascript
const crypto = require('planet-nine-crypto')

const keys = crypto.generateKeys(randomSeed)
//Store keys securely here

crypto.getKeys = function() {
  //Retrieve keys from secure storeage here
  return keys
}
```

### Ongoing Gateways

An ongoing gateway is used when you want to utilize a user's information, typically their Nineum, and/or you want to make Power expenditures on their behalf. Once a user has connected their account to your app you'll see their user information and be able to perform Power transactions. A user can revoke this connection at any time so be sure to handle that situation in your app. 

#### Initializing an Ongoing Gateway

Before using an ongoing gateway, you must first initialize it with a gateway name and a public key:

```javascript
const PlanetNineGateway = require('planet-nine-gateway')
const crypto = require('planet-nine-crypto')

const keys = crypto.getKeys()

let gateway = new PlanetNineGateway()
gateway.ongoingGateway({gatewayName: 'test-gateway', publicKey: keys.publicKey})
```

#### Authorizing an Ongoing Gateway

Once an ongoing gateway is initialized, each user much authorize the gateway to make transactions on thier account. One ongoing gateway can have multiple user accounts authorized through it.

A typical implemtation involves prompting a user for thier username and then looking up that user's userId with their username:

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

Invoking `askForOngoingGatewayUsage` will prompt the user to authorize your ongoing gateway in the Planet Nine app. It may be helpful to prompt the user to open the Planet Nine app on thier mobile device. `askForOngoingGatewayUsage` will either return the user object if authorization is successful or it will return a `Ongoing gateway usage request expired` error if the request times out or is rejected. 

Once a user has approved your ongoing gateway you can retrieve thier user object and make power transactions and Nineum transfer requets on thier behalf.

#### Getting users

If a user has authorized your ongoign gateway, you can retrieve their user object from the Planet Nine backend:

```javascript
gateway.getUser({userId: 40, gatewayName: 'npm-plugin-test-gateway4'}, (err, user) => {
  console.log('user', user)
}) 
```

This user object will have all the relevant user information including the user's Nineum. For an example of working with a user's Nineum check out this blogpost about making an inventory system (TODO: Link to inventory system blog post).

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

Remember to be responsible with other users' Power, if you spend it when you shouldn't they'll revoke their connection and your reputation will suffer. 

#### Transfering Nineum

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

The Planet Nine Gateway framework includes some utiltiy functions to help parse Nineum objects from Nineum hex strings. These functions can be used without initializing an ongoing gateway or receiving user authorization for a gateway. 

Call `getNineumFromHexString` to parse a single Nineum hex string:

```js
const PlanetNineGateway = require('planet-nine-gateway')

const NineumHexString = '01000000010104090805070100000001'
const nineum = PlanetNineGateway.getNineumFromHexString(NineumHexString)
console.log(nineum) // => 
// Nineum {
  // universe: 'The Universe',
  // address: 'Planet Nine',
  // charge: 'Positive',
  // direction: 'West',
  // rarity: 'Nine',
  // size: 'Huge',
  // texture: 'Gritty',
  // shape: 'Cone',
  // year: 'Year One',
  // ordinal: 1,
  // uniqueId: '01000000010104090805070100000001' }
```

Or call `getNineumArrayForNineumHexStrings` to parse an arrary of Nineum hex strings into an array of Nineum:

```js
const PlanetNineGateway = require('planet-nine-gateway')

const nineumHexStringArray = [
  '01000000010105010203030100000001',
  '01000000010203090506080100000001',
  '01000000010203090308020100000001',
]
const nineumArray = PlanetNineGateway.getNineumArrayForNineumHexStrings(nineumHexStringArray) 
console.log(nineumArray)
```

## Conclusion

Thank you for checking out the Planet Nine Gateway framework. Hopefully this README has been helpful. We look forward to seeing what you create!

