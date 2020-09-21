import classNames from 'classnames'
import Paper from 'layouts/paper';

interface Props {
  children: React.ReactNode
  inverted?: boolean
  compact?: boolean
  stretch?: boolean
}

const Card = (props: Props & React.HTMLAttributes<any>) => (
  <Paper className={classNames(cardClassName(props), props.className)}>
    {props.children}
  </Paper>
);

const cardClassName = (props: Props) => {
  const classes = ['card']
  if (props.inverted) {
    classes.push('paper--inverted')
  }
  if (props.compact) {
    classes.push('card--compact')
  }
  if (props.stretch) {
    classes.push('card--stretch')
  }

  return classNames(classes)
}

export default Card;

export const CardHeader = (props: React.HTMLAttributes<any>) => (
  <div className={classNames('card__header', props.className)}>
    {props.children}
  </div>
);

export const CardHeaderTitle = (props: React.HTMLAttributes<any>) => (
  <div className={classNames('card__header__title', props.className)}>
    {props.children}
  </div>
);

export const CardHeaderActions = (props: React.HTMLAttributes<any>) => (
  <div className={classNames('card__header__actions', props.className)}>
    {props.children}
  </div>
);

export const CardContent = (props: React.HTMLAttributes<any>) => (
  <div className={classNames('card__content', props.className)}>
    {props.children}
  </div>
);