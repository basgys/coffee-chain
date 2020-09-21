import React from 'react';
import { config } from 'libs/config';

interface Props {
  address?: string
  alt: string
}

const placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

const QRCode = (props: Props & React.HTMLAttributes<any>) => {
  const { address, alt, ...other } = props;
  const width = 300
  const height = 300

  if (address) {
    const url = imageURL(address, width, height)
    return (
      <div className="qr-code">
        <img
          src={url}
          alt={alt}
          {...other}
        />
      </div>
    )

  }

  return (
    <span className={"qr-code"}>
      <img
        src={placeholder}
        alt={alt}
        {...other}
      />
    </span>
  )
};

const imageURL = (address: string, width: number, height: number) => {
  return `https://chart.googleapis.com/chart?chs=${width}x${height}&cht=qr&chl=${address}&choe=UTF-8`
};

export default QRCode;
