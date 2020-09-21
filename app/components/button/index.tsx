import React from 'react';
import classNames from 'classnames'

interface Props {
  action?: "primary" | "negative" | "positive"
  children?: React.ReactNode
  disabled?: boolean
  size?: "small" | "medium" | "large"
  variant?: "enclosed" | "exposed" | "text" | "icon"
  href?: string
  onClick?: (e: React.MouseEvent<any, MouseEvent>) => void
  button?: boolean
  block?: boolean
}

const Button = React.forwardRef((props: Props & React.HTMLAttributes<any>, ref: React.Ref<any>) => {
  const { onClick, className, button, block, ...rest } = props;

  const c = classNames(
    'button',
    props.action && `button--${props.action}`,
    props.size ? `button--${props.size}` : "button--medium",
    props.variant ? `button--${props.variant}` : "button--enclosed",
    props.disabled && 'button--disabled',
    block && 'button--block',
    className,
  )

  if (button) {
    return (
      <button {...rest} ref={ref} className={c} onClick={onClick}>
        {props.children}
      </button>
    )
  }
  return (
    <a {...rest} ref={ref} className={c} onClick={onClick}>
      {props.children}
    </a>
  )
});

export default Button;