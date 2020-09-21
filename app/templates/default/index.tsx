import React from 'react'
import Link from 'next/link';

import Container from 'layouts/container';
import { useRole } from 'hooks/useRole';
import Navigation from 'layouts/navigation';
import Spinner from 'components/spinner';

const DefaultTemplate = (props: React.HTMLAttributes<any>) => {
  const [role, roleLoading] = useRole();

  return (
    <div className="default-template">
      <Navigation title="Coffee Chain" className="default-template__navigation">
        {role.admin && <li><Link href="/farm/register"><a>Register farmer</a></Link></li>}
        {role.admin && <li><Link href="/distribution/register"><a>Register distributor</a></Link></li>}
        {role.admin && <li><Link href="/retail/register"><a>Register retailer</a></Link></li>}

        {role.farmer && <li><Link href="/coffee/harvest"><a>Harvest</a></Link></li>}

        <li><Link href="/"><a>Find coffee</a></Link></li>
      </Navigation>

      <Container className="default-template__container">
        {props.children}
      </Container>
    </div>
  )
};

export default DefaultTemplate;