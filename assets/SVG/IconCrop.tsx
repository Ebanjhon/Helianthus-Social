import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './type';

const BaseIcon: React.FC<IconProps> = ({
  width = 48,
  height = 48,
  fill = '#F6AF04',
  style,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    style={style}
  >
    <Path
      d="M9 5H7C5.89543 5 5 5.89543 5 7V9M9 19H7C5.89543 19 5 18.1046 5 17V15M15 5H17C18.1046 5 19 5.89543 19 7V9M15 19H17C18.1046 19 19 18.1046 19 17V15"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default BaseIcon;
