import { useEffect, useState } from 'react';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { useWeb3 } from 'hooks/useWeb3';

export interface Contract {
  loading: boolean
  error?: Error
  instance?: Web3Contract
}

export const useContract = (c: any): Contract => {
  const [state, setState] = useState<Contract>({
    loading: true,
  })
  const web3 = useWeb3();

  const updateInstance = () => {
    web3.eth.net.getId().then((networkId) => {
      const deployedNetwork = c.networks[networkId];
      if (!deployedNetwork) {
        setState((s) => ({
          ...s,
          loading: false,
          error: new Error("contract has not been deployed on this network"),
        }))
        return
      }

      const instance = new web3.eth.Contract(c.abi, deployedNetwork.address);
      setState((s) => ({
        ...s,
        loading: false,
        error: undefined,
        instance: instance,
      }))
    });
  }

  useEffect(() => {
    updateInstance()
  }, [web3]);

  useEffect(() => {
    if (!state.instance) return

    // When a contract emits an event, we refresh the instance to trigger
    // a UI update.
    // This is possibly inneficient, but it is a good start to ensure
    const sub = state.instance.events.allEvents({}, (err: any, logs: any) => {
      if (err) return
      updateInstance()
    })
    return () => {
      sub.unsubscribe()
    }
  }, [state.instance])

  return state
}