import classNames from 'classnames'
import AccountNavigation from 'components/accountNavigation';
import Paper from 'layouts/paper';
import Link from 'next/link';

interface Props {
  title?: string
  children?: React.ReactNode
}

const Navigation = (props: Props & React.HTMLAttributes<any>) => (
  <Paper className={classNames('navigation', props.className)}>
      {props.title && <Link href="/"><a><h1 className="title navigation__title">{props.title}</h1></a></Link>}
      <ul className="navigation__links">
        {props.children}
      </ul>
      <AccountNavigation />
  </Paper>
);

export default Navigation;