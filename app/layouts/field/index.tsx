import classNames from 'classnames'

interface Props {
  children?: React.ReactNode
}

const Field = (props: Props & React.HTMLAttributes<any>) => (
  <div className={classNames('field', props.className)}>
    {props.children}
  </div>
);

export default Field;