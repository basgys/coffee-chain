import React from 'react';
import classNames from 'classnames'

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  success?: boolean
  error?: boolean
}

const Input = React.forwardRef(
  (props: Props & React.HTMLAttributes<HTMLInputElement>, ref: React.Ref<HTMLInputElement>) => {
    const { className, success, error, ...rest } = props;
    const c = classNames(
      'input',
      success && 'success',
      error && 'error',
      className,
    )
    return (
      <input
        {...rest}
        ref={ref}
        className={c}
        aria-invalid={error ? 'true' : 'false'}
      />
    )
  }
);

export default Input;