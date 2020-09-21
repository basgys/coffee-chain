import classNames from 'classnames'

interface Props {
  children: React.ReactNode
}

export const Stepper = (props: Props & React.HTMLAttributes<any>) => {
  const { children, className, ...rest } = props;
  return (
    <nav {...rest} className={classNames("stepper", className)} role="navigation">
      {props.children}
    </nav>
  )
};

interface StepProps {
  active?: boolean
  disabled?: boolean
}

export const Step = (props: StepProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { active, disabled, ...rest } = props;
  return (
    <a {...rest} className={stepClasses(props)}>
      {props.children}
    </a>
  )
};

const stepClasses = (props: StepProps) => {
  const classes = ['stepper__step']
  if (props.active) {
    classes.push('stepper__step--active')
  }
  if (props.disabled) {
    classes.push('stepper__step--disabled')

  }
  return classNames(classes)
}

export default Stepper;
