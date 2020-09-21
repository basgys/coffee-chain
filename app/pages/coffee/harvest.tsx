import React, { useState } from 'react'

import { useRole } from 'hooks/useRole';
import HarvestForm from 'components/harvestForm';
import DefaultTemplate from 'templates/default';
import { useRouter } from 'next/router';
import Card, { CardContent, CardHeader, CardHeaderTitle } from 'components/card';
import Container from 'layouts/container';
import Loader from 'components/loader';

const Harvest = () => {
  const router = useRouter()
  const [role, roleLoading] = useRole()
  const [loading, setLoading] = useState(false)

  const onSubmit = () => {
    setLoading(true)
  }
  const onSuccess = (upc: number) => {
    router.push('/coffee/[upc]', `/coffee/${upc}`)
  }

  return (
    <DefaultTemplate>
      <Container tight>
        <Card>
          <CardHeader>
            <CardHeaderTitle>Harvest</CardHeaderTitle>
          </CardHeader>
          <CardContent>
            <Loader loading={loading}>
              <HarvestForm onSuccess={onSuccess} onSubmit={onSubmit} />
            </Loader>
          </CardContent>
        </Card>
      </Container>
    </DefaultTemplate>
  )
};

export default Harvest;