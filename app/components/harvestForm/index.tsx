import React from 'react'
import { useForm } from "react-hook-form";

import SupplyChain from "contracts/SupplyChain.json";
import { useContract } from 'hooks/useContract';
import { useAccount } from 'hooks/useAccount';
import Button from 'components/button';
import Field from 'layouts/field';
import Buttons from 'components/buttongroup';
import Input from 'components/input';
import Textarea from 'components/textarea';

interface Props {
  onSuccess: (upc: number) => void
  onSubmit: (upc: number) => void
  // TODO: On error
}

const HarvestForm = (props: Props) => {
  const supplyChain = useContract(SupplyChain);
  const account = useAccount();
  const { handleSubmit, register, errors, reset } = useForm();
  const onSubmit = (values: any) => {
    const { upc, productNotes } = values
    props.onSubmit(upc)

    supplyChain.instance?.methods.harvestItem(upc, productNotes).send({
      from: account,
    }).then(() => {
      reset()
      props.onSuccess(upc)
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <label>UPC
          <Input
            type="number"
            name="upc"
            ref={register({
              required: "Required",
            })}
            error={errors.upc}
          />
        </label>
      </Field>
      <Field>
        <label>Product notes
          <Textarea
            name="productNotes"
            ref={register({
              required: "Required",
            })}
            error={errors.productNotes}
          />
        </label>
      </Field>

      <Field>
        <Buttons justify="right" align="baseline">
          <Button button action="primary">Harvest</Button>
        </Buttons>
      </Field>
    </form>
  )
};

export default HarvestForm;