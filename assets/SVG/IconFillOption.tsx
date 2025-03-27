import React from 'react';
import {Svg, Path} from 'react-native-svg';
import {IconProps} from './type';

const IconFillOption: React.FC<IconProps> = ({
  width = 48,
  height = 48,
  fill = '#F6AF04',
  stroke = '#fff',
  style,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 118 118"
    fill={fill}
    style={style}>
    <Path
      d="M12.2916 59C12.2916 36.9815 12.2916 25.9722 19.1319 19.1319C25.9722 12.2917 36.9815 12.2917 59 12.2917C81.0183 12.2917 92.0277 12.2917 98.8682 19.1319C105.708 25.9722 105.708 36.9815 105.708 59C105.708 81.0183 105.708 92.0277 98.8682 98.8683C92.0277 105.708 81.0183 105.708 59 105.708C36.9815 105.708 25.9722 105.708 19.1319 98.8683C12.2916 92.0277 12.2916 81.0183 12.2916 59Z"
      stroke={stroke}
      strokeWidth={8.5}
    />
    <Path
      d="M58.9604 59H59.0047"
      stroke={stroke}
      strokeWidth={8.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M78.6462 59H78.6905"
      stroke={stroke}
      strokeWidth={8.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M39.313 59H39.3571"
      stroke={stroke}
      strokeWidth={8.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default IconFillOption;
