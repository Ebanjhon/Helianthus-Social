import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './type';

const IconComment: React.FC<IconProps> = ({
  width = 48,
  height = 48,
  fill = '#F6AF04',
  style,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 119 119"
    fill={fill}
    style={style}>
    <Path
      d="M39.7871 67.2639H79.1204M39.7871 42.6806H59.4538"
      stroke={fill}
      strokeWidth="8.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M30.4391 94.3056C24.0469 93.6767 19.2583 91.7568 16.0468 88.5452C10.2866 82.7853 10.2866 73.514 10.2866 54.9722V52.5139C10.2866 33.972 10.2866 24.7011 16.0468 18.9408C21.8071 13.1806 31.078 13.1806 49.62 13.1806H69.2866C87.8284 13.1806 97.0997 13.1806 102.86 18.9408C108.62 24.7011 108.62 33.972 108.62 52.5139V54.9722C108.62 73.514 108.62 82.7853 102.86 88.5452C97.0997 94.3056 87.8284 94.3056 69.2866 94.3056C66.5308 94.367 64.336 94.5765 62.1801 95.0677C56.2879 96.4242 50.8319 99.4391 45.4402 102.068C37.7575 105.814 33.9161 107.688 31.5054 105.934C26.8936 102.499 31.4014 91.8566 32.4116 86.9306"
      strokeWidth="8.5"
      strokeLinecap="round"
    />
  </Svg>
);

export default IconComment;