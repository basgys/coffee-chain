import { useEffect, useState } from 'react';
import { useAccount } from 'hooks/useAccount';
import { useContract } from 'hooks/useContract';
import SupplyChain from "contracts/SupplyChain.json";
import Coffee from 'models/coffee';
import { NotFoundError } from 'libs/errors';
import { useWeb3 } from './useWeb3';

interface State {
  coffee: Coffee
  error?: Error
}

export const useCoffee = (upc: number): [Coffee, boolean, Error?] => {
  const web3 = useWeb3();
  const account = useAccount();
  const supplyChain = useContract(SupplyChain);
  const [state, setState] = useState<State>({
    coffee: new Coffee(),
  });
  const { coffee, error } = state;
  const loading = (coffee.sku === undefined || coffee.upc === undefined)

  useEffect(() => {
    if (!account) return

    supplyChain.instance?.methods.fetchItemBufferOne(upc).call((err: any, data: any) => {
      if (err) {
        // TODO: Handle errors
        console.log("Buffer one error", err)
        return
      }

      setState((state: State) => {
        const c = new Coffee()
        c.sku = parseInt(data.itemSKU)
        c.ownerID = data.ownerID
        if (web3.utils.hexToNumberString(data.originFarmerID) !== "0") {
          c.originFarmerID = data.originFarmerID
        }
        c.originFarmName = data.originFarmName
        c.originFarmInformation = data.originFarmInformation
        c.originFarmLatitude = parseFloat(data.originFarmLatitude)
        c.originFarmLongitude = parseFloat(data.originFarmLongitude)
        c.upc = state.coffee.upc
        c.productID = state.coffee.productID
        c.productNotes = state.coffee.productNotes
        c.productPrice = state.coffee.productPrice
        c.state = state.coffee.state
        c.distributorID = state.coffee.distributorID
        c.retailerID = state.coffee.retailerID
        c.consumerID = state.coffee.consumerID
        return {
          ...state,
          coffee: c,
        }
      })
    })
    supplyChain.instance?.methods.fetchItemBufferTwo(upc).call((err: any, data: any) => {
      if (err) {
        // TODO: Handle errors
        return
      }

      setState((state: State) => {
        const c = new Coffee()
        c.sku = state.coffee.sku
        c.ownerID = state.coffee.ownerID
        c.originFarmerID = state.coffee.originFarmerID
        c.originFarmName = state.coffee.originFarmName
        c.originFarmInformation = state.coffee.originFarmInformation
        c.originFarmLatitude = state.coffee.originFarmLatitude
        c.originFarmLongitude = state.coffee.originFarmLongitude
        c.upc = parseInt(data.itemUPC)
        c.productID = data.productID
        c.productNotes = data.productNotes
        c.productPrice = data.productPrice
        c.state = parseInt(data.itemState)
        if (web3.utils.hexToNumberString(data.distributorID) !== "0") {
          c.distributorID = data.distributorID
        }
        if (web3.utils.hexToNumberString(data.retailerID) !== "0") {
          c.retailerID = data.retailerID
        }
        if (web3.utils.hexToNumberString(data.consumerID) !== "0") {
          c.consumerID = data.consumerID
        }
        return {
          ...state,
          coffee: c,
        }
      })
    })
  }, [account, supplyChain]);

  useEffect(() => {
    if (!loading && coffee.upc === 0) {
      setState(s => ({
        ...s,
        error: new NotFoundError(`Coffee with upc ${upc} does not exist`)
      }))
    } else {
      setState(s => ({
        ...s,
        error: undefined
      }))
    }
  }, [loading, coffee.upc])

  return [coffee, loading, error]
}