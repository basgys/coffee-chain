import classNames from 'classnames'

export enum PaperVariant {
  Default = 1,
  Inverted,
}

interface Props {
  children?: React.ReactNode
  variant?: PaperVariant
}

const Paper = (props: Props & React.HTMLAttributes<any>) => (
  <div className={classNames('paper', variantStyle(props.variant), props.className)}>
    {props.children}
  </div>
);

const variantStyle = (v?: PaperVariant) => {
  switch (v) {
    case PaperVariant.Inverted:
      return 'paper--inverted'
    case PaperVariant.Default:
    default:
      return ''
  }
}

export default Paper;