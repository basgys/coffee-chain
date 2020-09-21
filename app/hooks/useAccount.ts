import { useEffect, useState } from 'react';
import { useWeb3 } from 'hooks/useWeb3';

export const useAccount = (): string | undefined => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const web3 = useWeb3();

  // TODO: Handle errors
  // TODO: Allow to choose account instead of default index?
  useEffect(() => {
    web3.eth.requestAccounts((_, accounts) => {
      setAccounts(accounts);
    });
  }, [web3]);

  return (accounts && accounts.length > 0) ? accounts[0] : undefined
}