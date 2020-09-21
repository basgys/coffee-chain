import classNames from 'classnames'

interface Props {
  children?: React.ReactNode
  justify?: "left" | "center" | "space-between" | "right"
  align?: "start" | "end" | "center" | "baseline"
  variant?: "collapsed" | "spaced"
  noVerticalSpace?: boolean
}

const Buttons = (props: Props & React.HTMLAttributes<any>) => {
  return (
    <div className={classNames(groupClass(props), props.className)}>
      {props.children}
    </div>
  )
};

const groupClass = (props: Props) => {
  const classes = []
  props.justify && classes.push(`buttongroup--${props.justify}`)
  props.align && classes.push(`buttongroup--align-${props.align}`)
  props.variant && classes.push(`buttongroup--variant-${props.variant}`)

  if (props.noVerticalSpace) {
    classes.push('buttongroup--no-vertical-space')
  }

  return classNames('buttongroup', classes)
}

export default Buttons;