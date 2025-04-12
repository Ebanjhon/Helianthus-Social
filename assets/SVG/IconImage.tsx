import React from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import { IconProps } from './type';

const IconImage: React.FC<IconProps> = ({
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
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M6 3H26C27.6569 3 29 4.34315 29 6V26C29 27.6569 27.6569 29 26 29H6C4.34315 29 3 27.6569 3 26V6C3 4.34315 4.34315 3 6 3ZM26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z" fill={fill} />
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M11.956 17.4338L12.1965 17.7945C12.5028 18.254 13.1237 18.3782 13.5832 18.0718C13.684 18.0046 13.7718 17.9196 13.8422 17.821L17.1136 13.2411C17.4346 12.7917 18.0592 12.6876 18.5086 13.0086C18.6202 13.0883 18.7143 13.1902 18.7848 13.3078L23.0914 20.4855C23.3756 20.9591 23.222 21.5733 22.7484 21.8575C22.593 21.9507 22.4152 22 22.2339 22H9.61816C9.06588 22 8.61816 21.5523 8.61816 21C8.61816 20.8447 8.65431 20.6916 8.72374 20.5528L10.2295 17.5412C10.4765 17.0473 11.0772 16.847 11.5711 17.094C11.7268 17.1719 11.8594 17.289 11.956 17.4338Z" fill='#F6AF04' />
    <Circle cx="11" cy="12" r="2" fill="white" />
  </Svg>
);

export default IconImage;


