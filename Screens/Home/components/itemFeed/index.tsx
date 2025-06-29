import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
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
import { formatTimeAgo } from './functions';
import { useLikeFeedMutation, useUnLikeFeedMutation } from '../../../../RTKQuery/Slides/slide';
import { ModalActionRef } from '../modalAction';
import { TypeFeedItem } from '../../../../RTKQuery/Slides/types';
import { UserContext } from '../../../../Configs/UserReducer';
const temp = 'https://i.pinimg.com/736x/c9/e3/eb/c9e3eb487b0deb3f50501c196e332b58.jpg';
interface ItemFeedProps {
  data: TypeFeedItem;
  onShowModalComment: () => void;
  modalActionRef: React.RefObject<ModalActionRef>
}
const ItemFeed: React.FC<ItemFeedProps> = ({
  data,
  onShowModalComment,
  modalActionRef
}) => {
  const { user, dispatch } = useContext(UserContext);
  const [fetchLikeFeed] = useLikeFeedMutation();
  const [fetchUnLikeFeed] = useUnLikeFeedMutation();
  const [isLikeFeed, setIsLikeFeed] = useState(data.action.isLike);
  const [countLike, setCountLike] = useState(data.action.countLike);
  const [isHideInfo, setIsHideInfo] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const textRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const isEmptyMedia = data.resource.length === 0 && !expanded;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isHideInfo ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isHideInfo]);


  const handleLike = async () => {
    setIsLikeFeed(pre => !pre)
    if (isLikeFeed) {
      try {
        setCountLike(pre => pre - 1)
        await fetchUnLikeFeed({ feedId: data.feedId }).unwrap();
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        setIsLikeFeed(pre => !pre)
        setCountLike(pre => pre + 1)

      }
    } else {
      setCountLike(pre => pre + 1)
      try {
        await fetchLikeFeed({ feedId: data.feedId }).unwrap();
      } catch (error) {
        setIsLikeFeed(pre => !pre)
        setCountLike(pre => pre - 1)
      }
    }
  }

  return (
    <View style={[styles.container, isEmptyMedia && { height: 240 }, { display: isShow ? 'none' : 'flex' }]}>
      <View style={styles.viewMedia}>
        <Animated.View
          style={[
            styles.ScrollText,
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
            uri={data.author?.avatar}
            width={45}
          />
          <Animated.View style={[{ marginLeft: 5 }, { opacity: fadeAnim }]}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Text style={styles.textUsername}>
                {data.author?.firstname} {data.author?.lastname}
              </Text>
              {/* <TouchableOpacity
                style={{
                  display: data.author?.userId === user?.userId ? 'none' : 'flex',
                  backgroundColor: true ? colors.gold2 : colors.info,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                }}>
                <Text style={styles.lableFollow}>
                  {data.action.isLike ? 'Follow' : 'Following'}
                </Text>
              </TouchableOpacity> */}
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
        <TouchableOpacity
          onPress={() => {
            modalActionRef.current?.onShowModalAction({
              feedId: data.feedId,
              authorId: data.author.userId,
              setDeleteFeed() {
                setIsShow(true)
              },
            })
          }}
          style={{ marginBottom: 10 }}>
          <IconFillOption width={38} height={38} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginBottom: 5 }}
          onPress={handleLike}>
          {!isLikeFeed ? (
            <HeartEmpty width={30} height={30} />
          ) : (
            <HeartFill width={30} height={30} />
          )}
        </TouchableOpacity>
        <Text>{countLike}</Text>

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
