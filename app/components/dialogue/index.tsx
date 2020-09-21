import classNames from 'classnames'
import Paper from 'layouts/paper'

interface Props {
  children?: React.ReactNode
  // Open state of the dialogue
  open: boolean
  // divider display a divider between title, content, and actions when true
  divider?: boolean
}

const backdropClasses = (open: boolean) => {
  return open ? classNames(["dialogue__backdrop", "dialogue__backdrop--open"]) : "dialogue__backdrop"
}

const classes = (props: Props) => {
  const classes = ['dialogue']
  if (props.divider) {
    classes.push('dialogue--divider')
  }
  return classNames(classes)
}

export const Dialogue = (props: Props & React.HTMLAttributes<any>) => (
  <div className={backdropClasses(props.open)}>
    <Paper className={classes(props)}>
      {props.children}
    </Paper>
  </div>
);

export const DialogueTitle = (props: React.HTMLAttributes<any>) => (
  <div className="dialogue__title">
    <h1 className='title'>{props.children}</h1>
  </div>
);

export const DialogueContent = (props: React.HTMLAttributes<any>) => (
  <div className='dialogue__content'>
    {props.children}
  </div>
);

export const DialogContentText = (props: React.HTMLAttributes<any>) => (
  <div className='dialogue__content__text'>
    {props.children}
  </div>
);
export const DialogueActions = (props: React.HTMLAttributes<any>) => (
  <div className='dialogue__actions'>
    {props.children}
  </div>
);

export default Dialogue;