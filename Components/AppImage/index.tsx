import { ImageStyle, StyleProp, View, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import FastImage, { ResizeMode } from 'react-native-fast-image';
import { styles } from './types';
import { BASE_MinIO } from '../../RTKQuery/Slides/slide';

type AppImageProps = {
  uri: string;
  width?: any;
  height?: any;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  typeMode?: ResizeMode;
};

const temp =
  'https://i.pinimg.com/736x/c9/e3/eb/c9e3eb487b0deb3f50501c196e332b58.jpg';
const AppImage: React.FC<AppImageProps> = ({
  uri,
  width,
  height = width,
  style,
  imageStyle,
  typeMode = 'cover',
}) => {
  const [imageUri, setImageUri] = useState(BASE_MinIO + uri);
  return (
    <View style={[style, styles.container, { width: width, height: height }]}>
      <FastImage
        style={[{ flex: 1 }, imageStyle as any]}
        source={{
          uri: imageUri ? imageUri : temp,
          priority: FastImage.priority.high,
        }}
        onError={() => setImageUri(temp)}
        resizeMode={typeMode}
      />
    </View>
  );
};

export default AppImage;
