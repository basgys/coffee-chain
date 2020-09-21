import React, { useState } from 'react'

import Container from 'layouts/container';
import DefaultTemplate from 'templates/default';
import DistributorForm from 'components/distributorForm';
import Card, { CardContent, CardHeader, CardHeaderTitle } from 'components/card';
import Loader from 'components/loader';

const Register = () => {
  const [loading, setLoading] = useState(false)

  const onSubmit = () => {
    setLoading(true)
  }
  const onSuccess = () => {
    setLoading(false)
  }

  return (
    <DefaultTemplate>
      <Container tight>
        <Card>
          <CardHeader>
            <CardHeaderTitle>Register distributer</CardHeaderTitle>
          </CardHeader>
          <CardContent>
            <Loader loading={loading}>
              <DistributorForm onSuccess={onSuccess} onSubmit={onSubmit} />
            </Loader>
          </CardContent>
        </Card>
      </Container>
    </DefaultTemplate>
  )
};

export default Register;