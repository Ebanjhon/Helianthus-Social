import React from 'react';
import {Svg, Rect} from 'react-native-svg';
import {IconProps} from './type';

const IconMenu: React.FC<IconProps> = ({
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
    style={style}>
    <Rect x="5" y="16.2" width="14" height="1.6" rx="0.8" fill={fill} />
    <Rect x="5" y="11.2" width="14" height="1.6" rx="0.8" fill={fill} />
    <Rect x="5" y="6.2" width="14" height="1.6" rx="0.8" fill={fill} />
  </Svg>
);

export default IconMenu;
