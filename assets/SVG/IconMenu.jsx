import React from 'react';
import {Svg, Rect} from 'react-native-svg';

const IconMenu = ({width = 24, height = 24, fill = 'black'}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Rect x="5" y="16.2" width="14" height="1.6" rx="0.8" fill={fill} />
    <Rect x="5" y="11.2" width="14" height="1.6" rx="0.8" fill={fill} />
    <Rect x="5" y="6.2" width="14" height="1.6" rx="0.8" fill={fill} />
  </Svg>
);

export default IconMenu;
