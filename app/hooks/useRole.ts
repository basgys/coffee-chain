import { useEffect, useState } from 'react';
import { useAccount } from 'hooks/useAccount';
import { useContract } from 'hooks/useContract';
import SupplyChain from "contracts/SupplyChain.json";

export interface Role {
  admin: boolean
  farmer: boolean
  distributor: boolean
  retailer: boolean
}

export const useRole = (): [Role, boolean] => {
  const account = useAccount();
  const supplyChain = useContract(SupplyChain);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<Role>({
    admin: false,
    farmer: false,
    distributor: false,
    retailer: false,
  });

  useEffect(() => {
    if (!account) return

    // console.log("Calling roles", supplyChain.instance?.methods.roles)
    supplyChain.instance?.methods.roles(account).call((err: any, roles: any) => {
      if (err) {
        // TODO: Handle errors
        console.log("Role error", err)
        return
      }

      setRole((r) => ({
        ...r,
        admin: roles.admin,
        farmer: roles.farmer,
        distributor: roles.distributor,
        retailer: roles.retailer,
      }))
      setLoading((s) => false)
    })
  }, [account, supplyChain]);

  return [role, loading]
}