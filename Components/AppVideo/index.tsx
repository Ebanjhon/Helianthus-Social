import React, {useEffect, useRef, useState} from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import styles from './style';
import Video from 'react-native-video';
import {IconPause, IconPlay} from '../../assets/SVG';
import Slider from '@react-native-community/slider';
import colors from '../../assets/color/colors';

type AppVideoProps = {
  source: string;
  width: number;
  height: number;
  isCurrent: boolean;
};

const AppVideo: React.FC<AppVideoProps> = ({
  source,
  width,
  height,
  isCurrent,
}) => {
  const [isPause, setIsPause] = useState(isCurrent);
  const AniPause = useRef(new Animated.Value(0.9)).current;
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1); // Tránh chia cho 0
  const videoRef = useRef(null);
  useEffect(() => {
    if (!isPause) {
      Animated.timing(AniPause, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      AniPause.setValue(0.9);
    }
  }, [isPause]);
  useEffect(() => {
    setIsPause(!isCurrent);
  }, [isCurrent]);

  return (
    <View style={{width: width, height: 480, overflow: 'hidden'}}>
      <Video
        ref={videoRef}
        paused={isPause}
        source={{uri: source}}
        controls={!true}
        style={{width: width, height: height, backgroundColor: '#000024'}}
        resizeMode="contain"
        repeat={true}
        onEnd={() => {}}
        onProgress={data => setCurrentTime(data.currentTime)}
        onLoad={data => setDuration(data.duration)}
      />
      <TouchableOpacity
        hitSlop={50}
        onPress={() => {
          setIsPause(!isPause);
        }}
        style={{
          position: 'absolute',
          top: 230,
          alignSelf: 'center',
        }}>
        {isPause ? (
          <IconPlay style={styles.play} />
        ) : (
          <Animated.View style={{opacity: AniPause}}>
            <IconPause />
          </Animated.View>
        )}
      </TouchableOpacity>
      <Slider
        style={[styles.line, {width: width}]}
        value={currentTime}
        maximumValue={duration}
        minimumValue={0}
        thumbTintColor={colors.gold2}
        minimumTrackTintColor={colors.black}
        maximumTrackTintColor={colors.gray}
        onSlidingComplete={value => {
          videoRef.current.seek(value);
          setCurrentTime(value);
        }}
      />
    </View>
  );
};
export default AppVideo;
