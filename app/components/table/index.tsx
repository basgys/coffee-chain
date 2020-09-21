import classNames from 'classnames'

interface Props {
  children?: React.ReactNode
  exposed?: boolean
  full?: boolean
  compact?: boolean
}

export const Table = (props: Props & React.HTMLAttributes<any>) => (
  <table className={classNames(tableClassName(props), props.className)}>
    {props.children}
  </table>
);

interface TdProps {
  children?: React.ReactNode
  label?: string
}

export const Td = (props: TdProps & React.HTMLAttributes<any>) => (
  <td>
    {props.label && <span className="table__td__label">{props.label}</span>}
    {props.children}
  </td>
);

const tableClassName = (props: Props) => {
  const classes = ["table"]
  if (props.exposed) {
    classes.push('table--exposed')
  }
  if (props.full) {
    classes.push('table--full')
  }
  if (props.compact) {
    classes.push('table--compact')
  }
  return classNames(classes)
}

export default Table;