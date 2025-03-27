import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconProps} from './type';

const IconOption: React.FC<IconProps> = ({
  width = 48,
  height = 48,
  fill = '#F6AF04',
  style,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    style={style}>
    <Path
      d="M24 10.722C26.8271 10.722 29.119 8.43015 29.119 5.603C29.119 2.77586 26.8271 0.484001 24 0.484001C21.1728 0.484001 18.881 2.77586 18.881 5.603C18.881 8.43015 21.1728 10.722 24 10.722Z"
      fill={fill}
    />
    <Path
      d="M24 47.516C26.8271 47.516 29.119 45.2241 29.119 42.397C29.119 39.5699 26.8271 37.278 24 37.278C21.1728 37.278 18.881 39.5699 18.881 42.397C18.881 45.2241 21.1728 47.516 24 47.516Z"
      fill={fill}
    />
    <Path
      d="M24 29.119C26.8271 29.119 29.119 26.8271 29.119 24C29.119 21.1729 26.8271 18.881 24 18.881C21.1728 18.881 18.881 21.1729 18.881 24C18.881 26.8271 21.1728 29.119 24 29.119Z"
      fill={fill}
    />
  </Svg>
);

export default IconOption;
