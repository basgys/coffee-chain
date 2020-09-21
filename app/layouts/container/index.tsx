import classNames from 'classnames'

interface Props {
  tight?: boolean
  center?: boolean
}

const Container = (props: Props & React.HTMLAttributes<any>) => (
  <div className={classNames("container", props.tight && "container--tight", props.center && "container--centered", props.className)}>
    {props.children}
  </div>
);

export default Container;