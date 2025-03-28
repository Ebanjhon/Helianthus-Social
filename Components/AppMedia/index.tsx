import React, {useRef, useState} from 'react';
import {Dimensions, FlatList, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import AppVideo from '../AppVideo';

type media = {
  id: string;
  url: string;
  width: number;
  height: number;
  typeMedia: 'IMAGE' | 'VIDEO';
};

interface AppMediaProps {
  resource: media[];
  onPress?: () => void;
}
const screenWidth = Dimensions.get('window').width - 60;
const AppMedia: React.FC<AppMediaProps> = ({resource, onPress}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cấu hình hiển thị item
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50, // Ít nhất 50% phải hiển thị
  });

  // Hàm cập nhật trạng thái item hiển thị
  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  });
  return (
    <FlatList
      style={{height: 480, width: screenWidth}}
      data={resource}
      horizontal={true}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => (
        <Pressable
          onPress={() => {
            onPress && onPress();
          }}>
          {item.typeMedia === 'IMAGE' ? (
            <FastImage
              style={{flex: 1, width: screenWidth}}
              source={{
                uri: item.url,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <AppVideo
              source={item.url}
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
