import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames'
import { usePopper } from 'react-popper';

import { Avatar } from 'components/avatar';
import Paper from 'layouts/paper';
import Link from 'next/link';
import Button from 'components/button';
import Section from 'layouts/section';
import { useAccount } from 'hooks/useAccount';
import strings from 'libs/strings';
import { useRole } from 'hooks/useRole';

const defaultSize = 20

interface Props {
  size?: number
}

const AccountNavigation = (props: Props & React.HTMLAttributes<any>) => {
  const account = useAccount();
  const [role, roleLoading] = useRole();
  const [open, setOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState<any>();
  const [popperElement, setPopperElement] = useState<any>();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'preventOverflow',
        options: {
          altAxis: true, // true by default
        },
      },
    ],
  });

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (referenceElement.contains(e.target)) {
        // Click on ref button, all good
        return;
      }
      if (popperElement.contains(e.target)) {
        // Click inside dropdown, all good
        return;
      }
      setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, [referenceElement, popperElement]);

  const toggle = (e: React.MouseEvent<any, MouseEvent>) => {
    e.preventDefault();
    setOpen(!open);
  }

  return (
    <>
      <div className={classNames("account-navigation", props.className)}>
        <a ref={setReferenceElement} onClick={toggle}>
          <Avatar id={account} height={defaultSize} width={defaultSize} />
        </a>
      </div>

      {ReactDOM.createPortal(
        <div
          className={popperClasses(open)}
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div className="account-navigation__content">
            <Paper className="account-navigation__container">
              <div className="account-navigation__closer">
                <Button
                  variant="text"
                  size="small"
                  onClick={toggle}
                >
                  Close
                </Button>
              </div>
              <div className="account-navigation__block">
                <Avatar id={account} height={60} width={60} />
                <h1 className="subtitle">Current account</h1>
                <abbr title={account}>
                  <h2 className="help">{strings.truncate(account!, 30)}</h2>
                </abbr>
              </div>
              <div className="account-navigation__block">
                <h1 className="subtitle">Roles</h1>
                <ul className="account-navigation__roles">
                  {role.admin && <li>Admin</li>}
                  {role.farmer && <li>Farmer</li>}
                  {role.distributor && <li>Distributor</li>}
                  {role.retailer && <li>Retailer</li>}
                  <li>Consumer</li>
                </ul>
              </div>
            </Paper>
          </div>
        </div>,
        document.querySelector('#popper')!,
      )}
    </>
  )
};

const popperClasses = (open?: boolean) => {
  const c = "account-navigation__popper"
  return open ? classNames(c, "account-navigation__popper--open") : classNames(c)
}


export default AccountNavigation;
