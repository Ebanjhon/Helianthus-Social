import React from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import styles from './Style';
import IconBack from '../../assets/SVG/IconBack';
import { useNavigation } from '@react-navigation/native';
import IconMenu from '../../assets/SVG/IconMenu';

export type HeaderAppProps = {
  title?: string;
  isShowleftAction: boolean;
  isShowrightAction: boolean;
  isButtonHead?: boolean;
  bgColor?: string;
  style?: StyleProp<ViewStyle>;
  onPrees?: () => void;
};

const HeaderApp: React.FC<HeaderAppProps> = ({
  title,
  isShowleftAction = true,
  isShowrightAction = false,
  bgColor,
  style,
  isButtonHead = false,
  onPrees,
}) => {
  const Navigation = useNavigation();
  return (
    <View style={[styles.Container, { backgroundColor: bgColor }, style]}>
      {isShowleftAction ? (
        <TouchableOpacity
          onPress={Navigation.goBack}
          style={[styles.itemHeader, isButtonHead && styles.btnAction]}>
          <IconBack height={40} width={40} />
        </TouchableOpacity>
      ) : (
        <View style={styles.itemHeader} />
      )}
      <Text style={{ fontSize: 19, fontWeight: '600' }}>{title}</Text>
      {isShowrightAction ? (
        <TouchableOpacity style={[styles.itemHeader, isButtonHead && styles.btnAction]}
          onPress={onPrees}
        >
          <IconMenu height={40} width={40} />
        </TouchableOpacity>
      ) : (
        <View style={styles.itemHeader} />
      )}
    </View>
  );
};

export default HeaderApp;
