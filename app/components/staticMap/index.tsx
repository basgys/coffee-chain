import React from 'react';
import { config } from 'libs/config';

interface Props {
  // center: string
  latitude: number
  longitude: number
  alt: string
}

const StaticMap = (props: Props & React.HTMLAttributes<any>) => {
  const { latitude, longitude, alt } = props;
  const width = 150
  const height = 150

  const url = imageURL(latitude, longitude, width, height)
  const srcset = [
    imageURL(latitude, longitude, width, height) + ` ${width}w`,
    imageURL(latitude, longitude, width*2, height*2) + ` ${width*2}w`,
    imageURL(latitude, longitude, width*4, height*4) + ` ${width*4}w`,
  ].join(', ');
  const sizes = [
    `(max-width: ${width}) ${width}`,
    `(max-width: ${width*2}) ${width*2}`,
    `${width*4}px`
  ].join(', ');

  return (
    <div className="static-map">
      <img
        srcSet={srcset}
        sizes={sizes}
        src={url}
        alt={alt}
      />
    </div>
  )
};

const imageURL = (latitude: number, longitude: number, width: number, height: number) => {
  const key = config.get("MAP_API_KEY")
  return `https://maps.googleapis.com/maps/api/staticmap?size=${width}x${height}&key=${key}&center=${latitude}+${longitude}&zoom=3&maptype=roadmap&markers=${latitude},${longitude}`
};

export default StaticMap;
