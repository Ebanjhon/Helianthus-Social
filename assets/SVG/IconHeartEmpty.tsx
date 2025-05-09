import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconProps} from './type';

const HeartEmpty: React.FC<IconProps> = ({
  width = 48,
  height = 48,
  fill = 'none',
  stroke = '#F6AF04',
  style,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 22 20"
    fill={fill}
    style={style}>
    <Path
      d="M6 1C3.239 1 1 3.216 1 5.95C1 8.157 1.875 13.395 10.488 18.69C10.6423 18.7839 10.8194 18.8335 11 18.8335C11.1806 18.8335 11.3577 18.7839 11.512 18.69C20.125 13.395 21 8.157 21 5.95C21 3.216 18.761 1 16 1C13.239 1 11 4 11 4C11 4 8.761 1 6 1Z"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default HeartEmpty;
