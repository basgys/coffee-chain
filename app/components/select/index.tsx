import React from 'react';
import classNames from 'classnames'

interface Props extends React.SelectHTMLAttributes<any> {
  children?: React.ReactNode
  success?: boolean
  error?: boolean
}

const Select = React.forwardRef(
  (props: Props & React.HTMLAttributes<HTMLSelectElement>, ref: React.Ref<HTMLSelectElement>) => {
    const { children, success, error, multiple, ...rest } = props;
    const className = classNames(
      'select',
      success && 'success',
      error && 'error',
      multiple && 'select--multiple',
    )
    return (
      <div className={className}>
        <select ref={ref} multiple={multiple} {...rest}>
          {children}
        </select>
      </div>
    )
  },
);

export default Select;