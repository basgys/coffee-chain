import React from 'react'

import qs from 'libs/qs';
import { useCoffee } from 'hooks/useCoffee';
import DefaultTemplate from 'templates/default';
import Loader from 'components/loader';
import ErrorHandler from 'components/errorHandler';
import CoffeeDetails from 'components/coffeeDetails';

const Index = () => {
  const upc = qs.String("upc")
  const [coffee, coffeeLoading, coffeeError] = useCoffee(parseInt(upc))

  return (
    <DefaultTemplate>
      <ErrorHandler error={coffeeError}>
        <Loader loading={coffeeLoading}>
          <CoffeeDetails coffee={coffee} />
        </Loader>
      </ErrorHandler>
    </DefaultTemplate>
  )
};

export default Index;