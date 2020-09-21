import React, { useState } from 'react'

import Container from 'layouts/container';
import FarmForm from 'components/farmForm';
import DefaultTemplate from 'templates/default';
import Farm from 'models/farm';
import Card, { CardContent, CardHeader, CardHeaderTitle } from 'components/card';
import Loader from 'components/loader';

const Register = () => {
  const [loading, setLoading] = useState(false)

  const onSubmit = (id: string) => {
    setLoading(true)
  }
  const onSuccess = (farm: Farm) => {
    setLoading(false)
  }

  return (
    <DefaultTemplate>
      <Container tight>
        <Card>
          <CardHeader>
            <CardHeaderTitle>Register farmer</CardHeaderTitle>
          </CardHeader>
          <CardContent>
            <Loader loading={loading}>
              <FarmForm onSuccess={onSuccess} onSubmit={onSubmit} />
            </Loader>
          </CardContent>
        </Card>
      </Container>
    </DefaultTemplate>
  )
};

export default Register;