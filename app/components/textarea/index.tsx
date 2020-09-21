import React from 'react';
import classNames from 'classnames'

interface Props extends React.TextareaHTMLAttributes<any> {
  success?: boolean
  error?: boolean
}

const Textarea = React.forwardRef(
  (props: Props & React.HTMLAttributes<HTMLInputElement>, ref: React.Ref<HTMLInputElement>) => {
    const { className, success, error, ...rest } = props;
    const c = classNames(
      'textarea',
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


export default Textarea;