import { useContext } from 'react';
import { Web3Context } from 'contexts/web3';

export const useWeb3 = () => {
  return useContext(Web3Context)
}