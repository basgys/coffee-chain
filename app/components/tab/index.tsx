import classNames from 'classnames'

interface Props {
  children: React.ReactNode
}

export const Tab = (props: Props & React.HTMLAttributes<any>) => {
  const { children, className, ...rest } = props;
  return (
    <nav {...rest} className={classNames("tab", className)} role="navigation">
      {props.children}
    </nav>
  )
};

interface LinkProps {
  active?: boolean
  disabled?: boolean
}

export const TabLink = (props: LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { active, disabled, ...rest } = props;
  return (
    <a {...rest} className={linkClasses(props)}>
      {props.children}
    </a>
  )
};

const linkClasses = (props: LinkProps) => {
  const classes = ['tab__link']
  if (props.active) {
    classes.push('tab__link--active')
  }
  if (props.disabled) {
    classes.push('tab__link--disabled')

  }
  return classNames(classes)
}

export default Tab;
