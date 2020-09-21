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
import Farm from 'models/farm';

interface Props {
  onSuccess: (farm: Farm) => void
  onSubmit: (id: string) => void
  // TODO: On error
}

const FarmForm = (props: Props) => {
  const supplyChain = useContract(SupplyChain);
  const account = useAccount();
  const { handleSubmit, register, errors, reset } = useForm();
  const onSubmit = (values: any) => {
    const { id, name, information, latitude, longitude } = values
    props.onSubmit(id)

    supplyChain.instance?.methods.registerFarm(id, name, information, latitude, longitude).send({
      from: account,
    }).then(() => {
      reset()

      const farm = new Farm()
      farm.id = id
      farm.name = name
      farm.information = information
      farm.latitude = latitude
      farm.longitude = longitude
      props.onSuccess(farm)
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
        <label>Name
          <Input
            type="text"
            name="name"
            ref={register({
              required: "Required",
            })}
            error={errors.name}
          />
        </label>
      </Field>
      <Field>
        <label>Information
          <Textarea
            name="information"
            ref={register({
              required: "Required",
            })}
            error={errors.information}
          />
        </label>
      </Field>
      <Field>
        <label>Latitude
          <Input
            type="number"
            step="0.0000001"
            name="latitude"
            ref={register({
              required: "Required",
              min: -90,
              max: 90,
            })}
            error={errors.latitude}
          />
        </label>
      </Field>
      <Field>
        <label>Longitude
          <Input
            type="number"
            step="0.0000001"
            name="longitude"
            ref={register({
              required: "Required",
              min: -180,
              max: 180,
            })}
            error={errors.longitude}
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

export default FarmForm;