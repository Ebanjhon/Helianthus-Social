import {ImageStyle, StyleProp, View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {styles} from './types';

type AppImageProps = {
  uri: string;
  width?: any;
  height?: any;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
};

const AppImage: React.FC<AppImageProps> = ({
  uri,
  width,
  height = width,
  style,
  imageStyle,
}) => {
  const [imageUri, setImageUri] = useState(uri);
  return (
    <View style={[style, styles.container, {width: width, height: height}]}>
      <FastImage
        style={[{flex: 1}, imageStyle as any]}
        source={{
          uri: imageUri,
          priority: FastImage.priority.high,
        }}
        onError={() =>
          setImageUri(
            'https://i.pinimg.com/736x/c9/e3/eb/c9e3eb487b0deb3f50501c196e332b58.jpg',
          )
        }
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
};

export default AppImage;
