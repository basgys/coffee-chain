import React from 'react'

import SupplyChain from "contracts/SupplyChain.json";
import Button from 'components/button';
import Buttons from 'components/buttongroup';
import Coffee, { actionName, actionsAvailable, CoffeeAction, CoffeeState, stateName } from 'models/coffee';
import Section from 'layouts/section';
import Stepper, { Step } from 'components/stepper';
import { useWeb3 } from 'hooks/useWeb3';
import { useContract } from 'hooks/useContract';
import { useAccount } from 'hooks/useAccount';
import { useRole } from 'hooks/useRole';
import Card, { CardContent, CardHeader, CardHeaderTitle } from 'components/card';
import Table from 'components/table';
import StaticMap from 'components/staticMap';
import QRCode from 'components/qrCode';
import strings from 'libs/strings';
import Field from 'layouts/field';
import PropertyList, { PropertListItem } from 'components/propertylist';

interface Props {
  coffee: Coffee
  // TODO: On error
}

const CoffeeDetails = (props: Props) => {
  const { coffee } = props

  const web3 = useWeb3()
  const supplyChain = useContract(SupplyChain);
  const account = useAccount();
  const [role, roleLoading] = useRole()

  const onAction = (action: CoffeeAction) => () => {
    switch (action) {
      case CoffeeAction.Process:
        supplyChain.instance?.methods.processItem(coffee.upc).send({
          from: account,
        }).then(() => {
          // TODO:
        });
      break;
      case CoffeeAction.Pack:
        supplyChain.instance?.methods.packItem(coffee.upc).send({
          from: account,
        }).then(() => {
          // TODO:
        });
      break;
      case CoffeeAction.Sell:
        // TODO: Allow to customise price
        const price = web3.utils.toWei("0.1", "ether")
        supplyChain.instance?.methods.sellItem(coffee.upc, price).send({
          from: account,
        }).then(() => {
          // TODO:
        });
      break;
      case CoffeeAction.Buy:
        supplyChain.instance?.methods.buyItem(coffee.upc).send({
          from: account,
          value: coffee.productPrice,
        }).then(() => {
          // TODO:
        });
      break;
      case CoffeeAction.Ship:
        supplyChain.instance?.methods.shipItem(coffee.upc).send({
          from: account,
        }).then(() => {
          // TODO:
        });
      break;
      case CoffeeAction.Receive:
        supplyChain.instance?.methods.receiveItem(coffee.upc).send({
          from: account,
          value: coffee.productPrice,
        }).then(() => {
          // TODO:
        });
      break;
      case CoffeeAction.Purchase:
        supplyChain.instance?.methods.purchaseItem(coffee.upc).send({
          from: account,
          value: coffee.productPrice,
        }).then(() => {
          // TODO:
        });
      break;
    }
  }

  return (
    <div className="coffee-details">
      <header className="coffee-details__header">
        <h1 className="page-title">Coffee</h1>

        <Buttons justify="right" noVerticalSpace>
          {actionsAvailable(coffee, role).map((a) => (
            <Button
              key={a}
              action="primary"
              variant="exposed"
              onClick={onAction(a)}
            >
                {actionName(a)}
            </Button>
          ))}
        </Buttons>
      </header>

      <Section>
        <h1 className="title">Current state</h1>

        <Stepper>
          <Step
            active={coffee.state === CoffeeState.Harvested}
            disabled={coffee.state < CoffeeState.Harvested}
          >
              Harvested
          </Step>
          <Step
            active={coffee.state === CoffeeState.Processed}
            disabled={coffee.state < CoffeeState.Processed}
          >
              Processed
          </Step>
          <Step
            active={coffee.state === CoffeeState.Packed}
            disabled={coffee.state < CoffeeState.Packed}
          >
              Packed
          </Step>
          <Step
            active={coffee.state === CoffeeState.ForSale}
            disabled={coffee.state < CoffeeState.ForSale}
          >
              For sale
          </Step>
          <Step
            active={coffee.state === CoffeeState.Sold}
            disabled={coffee.state < CoffeeState.Sold}
          >
              Sold
          </Step>
          <Step
            active={coffee.state === CoffeeState.Shipped}
            disabled={coffee.state < CoffeeState.Shipped}
          >
              Shipped
          </Step>
          <Step
            active={coffee.state === CoffeeState.Received}
            disabled={coffee.state < CoffeeState.Received}
          >
              Received
          </Step>
          <Step
            active={coffee.state === CoffeeState.Purchased}
            disabled={coffee.state < CoffeeState.Purchased}
          >
              Purchased
          </Step>
        </Stepper>
      </Section>

      <Section>
        <div className="grid grid--stretch">
          <div className="grid__cell grid__cell--1/2 grid__cell--1/2@tablet grid__cell--1/1@phone">
            <h1 className="title">Product info</h1>

            <Field>
              <PropertyList>
                <PropertListItem label="UPC">{coffee.upc}</PropertListItem>
                <PropertListItem label="SKU">{coffee.sku}</PropertListItem>
                <PropertListItem label="ID">{coffee.productID}</PropertListItem>
                <PropertListItem label="Price">ETH {web3.utils.fromWei(coffee.productPrice!, 'ether')}</PropertListItem>
                <PropertListItem label="Notes">{coffee.productNotes}</PropertListItem>
              </PropertyList>
            </Field>
          </div>
          <div className="grid__cell grid__cell--1/2 grid__cell--1/2@tablet grid__cell--1/1@phone">
            <h1 className="title">Farm location</h1>

            <Field>
              <Card>
                <StaticMap
                  latitude={coffee.originFarmLatitude || 0}
                  longitude={coffee.originFarmLongitude || 0}
                  alt="Farm location"
                />
              </Card>
            </Field>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid grid--stretch">
          <div className="grid__cell grid__cell--1/4 grid__cell--1/2@tablet grid__cell--1/1@phone">
            <h1 className="title">Farmer</h1>
            <h1 className="subtitle">{strings.truncate(coffee.originFarmerID!, 20) || "n/a"}</h1>

            <Field>
              <Card stretch>
                <QRCode
                  alt="Farmer wallet address"
                  address={coffee.originFarmerID || ""}
                />
              </Card>
            </Field>
          </div>
          <div className="grid__cell grid__cell--1/4 grid__cell--1/2@tablet grid__cell--1/1@phone">
            <h1 className="title">Distributor</h1>
            <h1 className="subtitle">{strings.truncate(coffee.distributorID!, 20) || "n/a"}</h1>

            <Field>
              <Card stretch>
                <QRCode
                  alt="Distributor wallet address"
                  address={coffee.distributorID || ""}
                />
              </Card>
            </Field>
          </div>
          <div className="grid__cell grid__cell--1/4 grid__cell--1/2@tablet grid__cell--1/1@phone">
            <h1 className="title">Retailer</h1>
            <h1 className="subtitle">{strings.truncate(coffee.retailerID!, 20) || "n/a"}</h1>

            <Field>
              <Card stretch>
                <QRCode
                  alt="Retailer wallet address"
                  address={coffee.retailerID || ""}
                />
              </Card>
            </Field>
          </div>
          <div className="grid__cell grid__cell--1/4 grid__cell--1/2@tablet grid__cell--1/1@phone">
            <h1 className="title">Consumer</h1>
            <h1 className="subtitle">{strings.truncate(coffee.consumerID!, 20) || "n/a"}</h1>

            <Field>
              <Card stretch>
                <QRCode
                  alt="Consumer wallet address"
                  address={coffee.consumerID || ""}
                />
              </Card>
            </Field>
          </div>
        </div>
      </Section>
    </div>
  )
};

export default CoffeeDetails;

