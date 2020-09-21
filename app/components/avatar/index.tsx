import React from 'react'
import classNames from 'classnames'
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-identicon-sprites';

interface Props {
  height: number
  width: number
  id?: string
  alt?: string
}

// Transparent pixel
const placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

export const Avatar = React.forwardRef(
  (props : Props & React.HTMLAttributes<HTMLImageElement>, ref: React.Ref<any>) => {
    const { id, height, width, alt, className, ...other } = props

    const style = {
      height: `${height / 10}rem`,
      width: `${width / 10}rem`,
    }

    if (id) {
      const options = {
        height: height,
        width: width,
      }
      const avatars = new Avatars(sprites, options)
      const svg = avatars.create(id)
      const buff = Buffer.from(svg);
      const imgData = buff.toString('base64');

      return (
        <span className={classNames("avatar", className)} style={style}>
          <img
            src={`data:image/svg+xml;base64,${imgData}`}
            alt={alt}
            {...other}
          />
        </span>
      );
    }

    return (
      <span className={classNames("avatar", className)} style={style}>
        <img
          src={placeholder}
          alt={alt}
          {...other}
        />
      </span>
    )
  }
)
