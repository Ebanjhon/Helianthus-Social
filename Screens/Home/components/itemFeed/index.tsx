import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './styles';
import { AppImage, AppMedia } from '../../../../Components';
import {
  CommentIcon,
  HeartEmpty,
  HeartFill,
  IconFillOption,
  IconSave,
  IconSend,
} from '../../../../assets/SVG';
import { BlurView } from '@react-native-community/blur';
import colors from '../../../../assets/color/colors';
import dataResource from './data';
import { FeedItem } from '../../../../RTKQuery/Slides/types';

interface ItemFeedProps {
  data: FeedItem;
  onShowModalComment: () => void;
  onShowAction: () => void;
}
const screenWidth = Dimensions.get('window').width - 60;
const ItemFeed: React.FC<ItemFeedProps> = ({
  data,
  onShowModalComment,
  onShowAction,
}) => {
  const [isLikeFeed, setIsLikeFeed] = useState(data.action.isLike);
  const [isHideInfo, setIsHideInfo] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const textRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isHideInfo ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isHideInfo]);

  function formatTimeAgo(timecreate: string): string {
    const now = new Date();
    const createdAt = new Date(timecreate);
    const diffMs = now.getTime() - createdAt.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);

    if (diffSec < 60) return 'Vài giây trước';
    if (diffMin < 60) return `${diffMin} phút trước`;
    if (diffHour < 24) return `${diffHour} giờ trước`;

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const postDate = new Date(
      createdAt.getFullYear(),
      createdAt.getMonth(),
      createdAt.getDate(),
    );
    const diffDays = Math.floor(
      (today.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Hôm qua';

    return `${diffDays} ngày trước`;
  }

  const isEmptyMedia = data.resource.length === 0 && !expanded;

  return (
    <View style={[styles.container, isEmptyMedia && { height: 240 }]}>
      <View style={styles.viewMedia}>
        <Animated.View
          style={[
            styles.ScrollText,
            { backgroundColor: expanded ? '#000000E6' : 'transparent' },
            { opacity: fadeAnim },
          ]}>
          <ScrollView nestedScrollEnabled={true}>
            <Text
              ref={textRef}
              numberOfLines={expanded ? undefined : 1}
              onTextLayout={event => {
                if (event.nativeEvent.lines.length > 2) {
                  setIsOverflow(true);
                }
              }}
              style={{ fontSize: 15, color: '#fff' }}>
              {data?.data.content}
            </Text>
          </ScrollView>
          {isOverflow && (
            <TouchableOpacity
              onPress={() => {
                setExpanded(pre => !pre);
              }}>
              <Text style={{ color: colors.gold2 }}>
                {!expanded ? 'Xem thêm' : 'Ẩn bớt'}
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        <View style={[styles.infoFeed]}>
          {!isHideInfo && (
            <BlurView
              blurRadius={10}
              blurType="dark"
              style={{
                position: 'absolute',
                width: '100%',
                height: 55,
              }}
            />
          )}
          <AppImage
            style={styles.avatarImage}
            imageStyle={[styles.image, { borderWidth: isHideInfo ? 2 : 0 }]}
            uri={data.author.avatar}
            width={45}
          />
          <Animated.View style={[{ marginLeft: 5 }, { opacity: fadeAnim }]}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Text style={styles.textUsername}>
                {data.author.firstname} {data.author.lastname}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: true ? colors.gold2 : colors.info,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                }}>
                <Text style={styles.lableFollow}>
                  {data.action.isLike ? 'Follow' : 'Following'}
                </Text>
              </TouchableOpacity>
            </View>
            <Animated.Text style={[styles.textTime, { opacity: fadeAnim }]}>
              {formatTimeAgo(data.data.createDay)}
            </Animated.Text>
          </Animated.View>
        </View>
        <AppMedia
          resource={data.resource}
          onPress={() => {
            setIsHideInfo(prev => !prev);
          }}
        />
      </View>
      <View style={styles.viewAction}>
        <TouchableOpacity style={{ marginBottom: 10 }}>
          <IconFillOption width={38} height={38} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginBottom: 5 }}
          onPress={() => {
            // setIsLikeFeed(pre => !pre);
          }}>
          {!isLikeFeed ? (
            <HeartEmpty width={30} height={30} />
          ) : (
            <HeartFill width={30} height={30} />
          )}
        </TouchableOpacity>
        <Text>{data.action.countLike}</Text>

        <TouchableOpacity
          onPress={() => {
            onShowModalComment();
          }}>
          <CommentIcon width={30} height={30} />
        </TouchableOpacity>

        <TouchableOpacity style={{ marginVertical: 5 }}>
          <IconSend width={32} height={32} />
        </TouchableOpacity>

        <TouchableOpacity style={{ marginVertical: 5 }}>
          <IconSave width={30} height={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemFeed;
