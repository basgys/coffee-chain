import classNames from 'classnames'

interface Props {
  children: React.ReactNode
  padding?: boolean
  stretch?: boolean
}

const variantStyle = (props: Props & React.HTMLAttributes<any>) => {
  const classes = ['section', props.className]

  if (props.padding) {
    classes.push('section--padding')
  }

  return classNames(classes)
}

const Section = (props: Props & React.HTMLAttributes<any>) => (
  <section className={classNames(variantStyle(props), props.className)}>
    {props.children}
  </section>
);
export default Section;
