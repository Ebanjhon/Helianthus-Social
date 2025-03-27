import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import {AppImage} from '../../../../Components';
import {
  CommentIcon,
  HeartEmpty,
  HeartFill,
  IconFillOption,
  IconSave,
  IconSend,
} from '../../../../assets/SVG';
import {BlurView} from '@react-native-community/blur';
import colors from '../../../../assets/color/colors';

type ItemFeedProps = {
  data: any;
};

const dataText =
  "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of  (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32.";

const ItemFeed: React.FC<ItemFeedProps> = ({data}) => {
  const [isLikeFeed, setIsLikeFeed] = useState(false);
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

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.viewMedia}
        onPress={() => {
          setIsHideInfo(prev => !prev);
        }}>
        <Animated.View
          style={[
            styles.ScrollText,
            {backgroundColor: expanded ? '#000000B3' : 'transparent'},
            {opacity: fadeAnim},
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
              style={{fontSize: 13, color: '#fff'}}>
              {dataText}
            </Text>
          </ScrollView>
          {isOverflow && (
            <TouchableOpacity
              onPress={() => {
                setExpanded(pre => !pre);
              }}>
              <Text style={{color: colors.gold2}}>
                {!expanded ? 'Xem tiếp' : 'Ẩn bớt'}
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        <View style={[styles.infoFeed]}>
          {!isHideInfo && (
            <BlurView
              blurRadius={10}
              blurType="light"
              style={{
                position: 'absolute',
                width: '100%',
                height: 55,
              }}
            />
          )}

          <AppImage
            style={styles.avatarImage}
            imageStyle={[styles.image, {borderWidth: isHideInfo ? 2 : 0}]}
            uri="https://i.pinimg.com/736x/50/45/21/504521463b0b781a51d1d14222a3d5d6.jpg"
            width={45}
          />
          <Animated.View style={[{marginLeft: 5}, {opacity: fadeAnim}]}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Text style={styles.textUsername}>Eban Jhon Y</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.gold2,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                }}>
                <Text style={styles.lableFollow}>
                  {!true ? 'Follow' : 'Following'}
                </Text>
              </TouchableOpacity>
            </View>
            <Animated.Text style={[styles.textTime, {opacity: fadeAnim}]}>
              Yesterday
            </Animated.Text>
          </Animated.View>
        </View>

        {/* thay thế bằng appMedia */}
        <AppImage
          imageStyle={{borderRadius: 20}}
          uri={
            'https://i.pinimg.com/736x/5d/0d/a0/5d0da0ce29f9f384dcc8acc7a53904d7.jpg'
          }
          width={'100%'}
          height={400}
        />
      </Pressable>
      <View style={styles.viewAction}>
        <TouchableOpacity style={{marginBottom: 10}}>
          <IconFillOption width={38} height={38} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginBottom: 5}}
          onPress={() => {
            setIsLikeFeed(pre => !pre);
          }}>
          {!isLikeFeed ? (
            <HeartEmpty width={30} height={30} />
          ) : (
            <HeartFill width={30} height={30} />
          )}
        </TouchableOpacity>
        <Text>100k</Text>

        <TouchableOpacity>
          <CommentIcon width={30} height={30} />
        </TouchableOpacity>
        <Text>33</Text>

        <TouchableOpacity style={{marginVertical: 5}}>
          <IconSend width={32} height={32} />
        </TouchableOpacity>

        <TouchableOpacity style={{marginVertical: 5}}>
          <IconSave width={30} height={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemFeed;
