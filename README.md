# Coffee Chain

## ⚠️ Note ⚠️
Unfortunately I was not able to get ETH on the Rinkeby network from any faucets. https://www.rinkeby.io/#faucet requires to have a social network account, which I don't have. And metamask faucet does not send coins on Rinkeby for some reasons.

Therefore I had to deploy on Ropsten instead of Rinkeby.

## Dependencies

1. Ganache GUI (development environment)

## Config

.secret

```
<Wallet mnemonic>
```

app/.env

```
WEB3_ENDPOINT=http://127.0.0.1:7545 # Default to ganache UI
MAP_API_KEY=<key> # Google map key (optional)
```

## Setup

```shell
# Start ganache GUI

# Initialise truffle project and deploy contracts on development env
$ yarn && truffle migrate --reset

# Initialise web app and start development server
$ cd app && yarn && yarn link-contracts && yarn dev

# Open app
$ open http://localhost:3000
```

## Evaluation

### Extra libraries used

  * openzeppelin - Provides robust contracts for Ownerships and ACLs
  * truffle/hdwallet-provider - Allows to load wallet to deploy contracts on main and test nets
  * truffle-assertions - Allows to tests events emitted by contracts

### Contract

I used Open Zeppelin Owner/Access contracts to simplify and secure the app instead of all the roles contracts. The contracts where, in my opinion, unnecessary.

The expected behaviour was sometimes unclear, so I deferred to my common sense. For example, when a distributor buys coffee from a farmer, the distributor has to pay the farmer and it tranfers the ownership. It is the same for both retailers and consumers.

Also, I thought it would be better to not send the farmer name and coordinates everytime he harvests coffee. There is now a Farm entity. I made a data model to reflect this change in the `/uml` folder.

The productID field design was broken. Using the sum of `sku` and `upc` does not guarantee its uniqueness (e.g. 1 + 2 and 2 + 1). To solve that problem, I decided to use a string instead and concat both fields (`e.g. "1:2" and "2:1")

### Testing

The given template did not work, especially the event handling part. Therefore, I took the liberty to change the structure.

### Frontend

Just like on the previous project, I built a responsive frontend with Next.js and React for fun. It is not necessary to review all files, but I wanted to keep exploring what is possible to build with JS and Ethereum.

There are screenshots available on the `screenshots` folder.

### Actions available

  * Register farmers [Admin]
  * Register distributors [Admin]
  * Register retailers [Admin]
  * Harvest [Farmer]
  * Process [Farmer]
  * Pack [Farmer]
  * Sell [Farmer]
  * Buy [Distributor]
  * Ship [Distributor]
  * Receive [Retailer]
  * Purchase [*]

## Improvements

  * Use IPFS [frontend]
  * Revoke access to farmers, distributors, retailers [frontend]
  * Customise selling price [frontend]
  * Form validations (e.g. address) [frontend]
  * Long loading / async tasks (similar to offline-first apps) [frontend]
  * Overall contract error handling [frontend]