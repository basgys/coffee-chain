import React, { useState } from 'react'

import DefaultTemplate from 'templates/default';
import Field from 'layouts/field';
import Input from 'components/input';
import Button from 'components/button';
import Buttons from 'components/buttongroup';
import Link from 'next/link';
import Card, { CardContent, CardHeader, CardHeaderTitle } from 'components/card';
import Container from 'layouts/container';

const Index = () => {
  const [upc, setUPC] = useState<string>("")

  return (
    <DefaultTemplate>
      <Container tight>
        <Card>
          <CardHeader>
            <CardHeaderTitle>Find coffee batch</CardHeaderTitle>
          </CardHeader>
          <CardContent>
            <Field>
              <Input
                value={upc}
                onChange={(e: any) => setUPC(e.currentTarget.value)}
                placeholder="UPC (e.g. 12)"
              />
            </Field>
            <Field>
              <Buttons justify="right">
                <Link href="/coffee/[upc]" as={`/coffee/${upc}`}>
                  <Button action="primary" disabled={!upc}>Search</Button>
                </Link>
              </Buttons>
            </Field>
          </CardContent>
        </Card>
      </Container>
    </DefaultTemplate>
  )
};

export default Index;