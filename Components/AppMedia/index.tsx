import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import AppVideo from '../AppVideo';
import { BASE_MinIO } from '../../RTKQuery/Slides/slide';
import { Media } from '../../RTKQuery/Slides/types';

// type media = {
//   id: string;
//   url: string;
//   width: number;
//   height: number;
//   typeMedia: 'IMAGE' | 'VIDEO';
// };
interface AppMediaProps {
  resource: Media[];
  onPress?: () => void;
}
const screenWidth = Dimensions.get('window').width - 60;
const AppMedia: React.FC<AppMediaProps> = ({ resource, onPress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  });

  return (
    <FlatList
      style={{ height: 480, width: screenWidth }}
      data={resource}
      horizontal={true}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.mediaId}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onPress && onPress();
          }}>
          {item.mediaType === 'IMAGE' ? (
            <FastImage
              style={{ flex: 1, width: screenWidth }}
              source={{
                uri: BASE_MinIO + item.url,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <AppVideo
              source={BASE_MinIO + item.url}
              width={screenWidth}
              height={480}
              isCurrent={index === currentIndex}
            />
          )}
        </Pressable>
      )}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
    />
  );
};
export default AppMedia;
