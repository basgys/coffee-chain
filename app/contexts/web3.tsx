import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum: any
  }
}

export const Web3Context = React.createContext<Web3>(undefined!);

interface Props {
  endpoint: string
  children: React.ReactNode
}

export const Web3Provider = (props: Props) => {
  const [instance, setInstance] = useState<Web3 | undefined>(undefined);

  useEffect(() => {
    let web3: Web3
    if (process.browser && typeof window.ethereum !== 'undefined') {
      // Client-side-only code. Use injected instance
      // Wrap current provider into a new Web3 instance to ensure we have
      // a compatible API version.
      web3 = new Web3(window.ethereum);
      console.log("web3: Load injected instance", web3.version);
    } else {
      // Custom instance
      web3 = new Web3(loadProvider(props.endpoint));
      console.log("web3: Initialise custom instance", web3.version);
    }

    setInstance(web3);
  }, [props.endpoint])

  // Metamask specific?
  useEffect(() => {
    if (typeof window.ethereum === 'undefined') return
    console.log("web3: Attach listeners to window.ethereum");

    // MetaMask will soon stop reloading pages on network change.
    // For more information, see:
    // https://docs.metamask.io/guide/ethereum-provider.html#ethereum-autorefreshonnetworkchange
    window.ethereum.autoRefreshOnNetworkChange = false

    // When metamask network or accounts changes, the web3 instance needs
    // to change to update dependencies (e.g. requestAccounts)
    const updateInstance = () => {
      setInstance(new Web3(window.ethereum));
    }
    const connect = () => {
      // TODO: Implement
    }
    const disconnect = () => {
      // TODO: Implement
    }

    window.ethereum.on('accountsChanged', updateInstance);
    window.ethereum.on('chainChanged', updateInstance);
    window.ethereum.on('connect', connect);
    window.ethereum.on('disconnect', disconnect);
    return () => {
      window.ethereum.off('accountsChanged', updateInstance);
      window.ethereum.off('chainChanged', updateInstance);
      window.ethereum.off('connect', connect);
      window.ethereum.off('disconnect', disconnect);
    }
  }, [process.browser && window.ethereum])

  if (!instance) {
    return null
  }

  return (
    <Web3Context.Provider value={instance}>
      {props.children}
    </Web3Context.Provider>
  );
}

const loadProvider = (endpoint: string) => {
  return new Web3.providers.HttpProvider(endpoint);
}