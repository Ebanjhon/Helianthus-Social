import React from 'react';
import Svg, {Path, ClipPath, Defs, Rect} from 'react-native-svg';
import {IconProps} from './type';

const IconPause: React.FC<IconProps> = ({
  width = 48,
  height = 48,
  fill = '#F6AF04',
  style,
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    style={style} // Áp dụng style từ props
  >
    <Defs>
      <ClipPath id="clip0">
        <Rect width="32" height="32" fill="white" />
      </ClipPath>
    </Defs>

    <Path
      d="M18 10H22V22H18V10ZM10 10H14V22H10V10ZM16 0.00299072C7.17529 0.00299072 0.00297546 7.1753 0.00297546 16C0.00297546 24.8247 7.17529 31.997 16 31.997C24.8247 31.997 31.997 24.8247 31.997 16C31.997 7.1753 24.8247 0.00299072 16 0.00299072ZM16 1.99701C23.7438 1.99701 30.003 8.25615 30.003 16C30.003 23.7438 23.7438 30.0029 16 30.0029C8.25617 30.0029 1.99702 23.7438 1.99702 16C1.99702 8.25615 8.25617 1.99701 16 1.99701Z"
      fill={fill} // Áp dụng màu từ props
      clipPath="url(#clip0)"
    />
  </Svg>
);

export default IconPause;
