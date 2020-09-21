import React from 'react'
import { useForm } from "react-hook-form";

import SupplyChain from "contracts/SupplyChain.json";
import { useContract } from 'hooks/useContract';
import { useAccount } from 'hooks/useAccount';
import Button from 'components/button';
import Field from 'layouts/field';
import Buttons from 'components/buttongroup';
import Input from 'components/input';

interface Props {
  onSuccess: (id: string) => void
  onSubmit: (id: string) => void
  // TODO: On error
}

const DistributorForm = (props: Props) => {
  const supplyChain = useContract(SupplyChain);
  const account = useAccount();
  const { handleSubmit, register, errors, reset } = useForm();
  const onSubmit = (values: any) => {
    const { id } = values
    props.onSubmit(id)

    supplyChain.instance?.methods.registerDistributor(id).send({
      from: account,
    }).then(() => {
      reset()
      props.onSuccess(id)
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <label>ID
          <Input
            type="text"
            name="id"
            ref={register({
              required: "Required",
            })}
            error={errors.id}
          />
        </label>
      </Field>
      <Field>
        <Buttons justify="right" align="baseline">
          <Button button action="primary">Register</Button>
        </Buttons>
      </Field>
    </form>
  )
};

export default DistributorForm;