import { Role } from "hooks/useRole"

export enum CoffeeState {
  Unknown, // 0
  Harvested,
  Processed,
  Packed,
  ForSale,
  Sold,
  Shipped,
  Received,
  Purchased
}

export const stateName = (s: CoffeeState): string => {
  switch (s) {
    case CoffeeState.Harvested:
      return "Harvested"
    case CoffeeState.Processed:
      return "Processed"
    case CoffeeState.Packed:
      return "Packed"
    case CoffeeState.ForSale:
      return "For sale"
    case CoffeeState.Sold:
      return "Sold"
    case CoffeeState.Shipped:
      return "Shipped"
    case CoffeeState.Received:
      return "Received"
    case CoffeeState.Purchased:
      return "Purchased"
  }
  return "Unknown"
}

export enum CoffeeAction {
  Harvest,
  Process,
  Pack,
  Sell,
  Buy,
  Ship,
  Receive,
  Purchase
}

export const actionName = (s: CoffeeAction): string => {
  switch (s) {
    case CoffeeAction.Harvest:
      return "Harvest"
    case CoffeeAction.Process:
      return "Process"
    case CoffeeAction.Pack:
      return "Pack"
    case CoffeeAction.Sell:
      return "Sell"
    case CoffeeAction.Buy:
      return "Buy"
    case CoffeeAction.Ship:
      return "Ship"
    case CoffeeAction.Receive:
      return "Receive"
    case CoffeeAction.Purchase:
      return "Purchase"
  }
}

export const actionsAvailable = (coffee: Coffee, role: Role): CoffeeAction[] => {
  switch (coffee.state) {
    case CoffeeState.Unknown:
      if (role.farmer) {
        return [CoffeeAction.Harvest]
      }
      return []
    case CoffeeState.Harvested:
      if (role.farmer) {
        return [CoffeeAction.Process]
      }
      return []
    case CoffeeState.Processed:
      if (role.farmer) {
        return [CoffeeAction.Pack]
      }
      return []
    case CoffeeState.Packed:
      if (role.farmer) {
        return [CoffeeAction.Sell]
      }
      return []
    case CoffeeState.ForSale:
      if (role.distributor) {
        return [CoffeeAction.Buy]
      }
      return []
    case CoffeeState.Sold:
      if (role.distributor) {
        return [CoffeeAction.Ship]
      }
      return []
    case CoffeeState.Shipped:
      if (role.retailer) {
        return [CoffeeAction.Receive]
      }
      return []
    case CoffeeState.Received:
      return [CoffeeAction.Purchase]
    case CoffeeState.Purchased:
      return []
  }
}

export default class Coffee {

  constructor() {
    this.state = CoffeeState.Unknown
  }

  // Stock Keeping Unit (SKU)
  sku?: number
  // Universal Product Code (UPC), generated by the Farmer, goes on the package, can be verified by the Consumer
  upc?: number
  // Metamask-Ethereum address of the current owner as the product moves through 8 stages
  ownerID?: string
  // Metamask-Ethereum address of the Farmer
  originFarmerID?: string
  // Farmer Name
  originFarmName?: string
  // Farmer Information
  originFarmInformation?: string
  // Farm Latitude
  originFarmLatitude?: number
  // Farm Longitude
  originFarmLongitude?: number
  // Product ID potentially a combination of upc + sku
  productID?: string
  // Product Notes
  productNotes?: string
  // Product Price
  productPrice?: string
  // Product State as represented in the enum above
  state: CoffeeState
  // Metamask-Ethereum address of the Distributor
  distributorID?: string
  // Metamask-Ethereum address of the Retailer
  retailerID?: string
  // Metamask-Ethereum address of the Consumer
  consumerID?: string
}