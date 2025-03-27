import React from 'react';
import {Svg, Path} from 'react-native-svg';
import {IconProps} from './type';

const IconSend: React.FC<IconProps> = ({
  width = 48,
  height = 48,
  fill = '#F6AF04',
  strokeWidth,
  style,
}) => (
  <Svg
    style={style}
    width={width}
    height={height}
    viewBox="0 0 119 119"
    fill={fill}>
    <Path
      d="M103.938 15.8992C93.2295 4.3668 12.6786 32.6172 12.7452 42.9313C12.8206 54.6276 44.2024 58.2256 52.9005 60.6663C58.1313 62.1334 59.5321 63.6379 60.7382 69.1229C66.2006 93.9639 68.9431 106.319 75.1937 106.595C85.1568 107.036 114.389 27.1538 103.938 15.8992Z"
      stroke={'#F6AF04'}
      strokeWidth={strokeWidth}
    />
    <Path
      d="M56.9951 62.3472L74.2035 45.1389"
      stroke={'#F6AF04'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default IconSend;
