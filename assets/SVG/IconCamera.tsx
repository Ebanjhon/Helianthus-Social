import React from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import { IconProps } from './type';

const IconCamera: React.FC<IconProps> = ({
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
    style={style}>
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M13.118 5H18.8812C19.9453 5 20.9183 5.60043 21.3956 6.55153C21.5335 6.82645 21.8147 7 22.1223 7H26C27.6569 7 29 8.34315 29 10V24C29 25.6569 27.6569 27 26 27H6C4.34315 27 3 25.6569 3 24V10C3 8.34315 4.34315 7 6 7H9.88197C10.1884 7 10.4685 6.82687 10.6056 6.55279C11.0814 5.60114 12.0541 5 13.118 5ZM18.8812 7H13.118C12.8116 7 12.5315 7.17313 12.3944 7.44721C11.9186 8.39886 10.9459 9 9.88197 9H6C5.44772 9 5 9.44772 5 10V24C5 24.5523 5.44772 25 6 25H26C26.5523 25 27 24.5523 27 24V10C27 9.44772 26.5523 9 26 9H22.1223C21.0582 9 20.0852 8.39957 19.608 7.44847C19.47 7.17355 19.1888 7 18.8812 7Z" fill={fill} />
    <Circle cx="16" cy="17" r="5" fill='#F6AF04' />
  </Svg>
);

export default IconCamera;
