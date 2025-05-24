import React from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import styles from './Style';
import IconBack from '../../assets/SVG/IconBack';
import { useNavigation } from '@react-navigation/native';
import IconMenu from '../../assets/SVG/IconMenu';
import { IconSetting } from '../../assets/SVG';

export type HeaderAppProps = {
  title?: string;
  isShowleftAction?: boolean;
  isShowrightAction?: boolean;
  isButtonHead?: boolean;
  bgColor?: string;
  style?: StyleProp<ViewStyle>;
  onPrees?: () => void;
  onActionBack?: () => void;
  rightView?: React.ReactNode;
};

const HeaderApp: React.FC<HeaderAppProps> = ({
  title,
  isShowleftAction = true,
  isShowrightAction = false,
  bgColor,
  style,
  isButtonHead = false,
  rightView,
  onPrees,
  onActionBack,
}) => {
  const Navigation = useNavigation();
  return (
    <View style={[styles.Container, { backgroundColor: bgColor }, style]}>
      {isShowleftAction ? (
        <TouchableOpacity
          onPress={() => {
            Navigation.goBack()
            onActionBack && onActionBack()
          }}
          style={[styles.itemHeader, { alignItems: 'flex-start' }, isButtonHead && styles.btnAction]}>
          <IconBack height={40} width={40} />
        </TouchableOpacity>
      ) : (
        <View style={styles.itemHeader} />
      )}

      <Text style={{ fontSize: 19, fontWeight: '600', lineHeight: 38 }}>{title}</Text>

      {isShowrightAction ? (
        <TouchableOpacity style={[styles.itemHeader, { alignItems: 'flex-end', alignSelf: 'center' }, isButtonHead && styles.btnAction]}
          onPress={onPrees}
        >
          <IconMenu height={35} width={35} />
        </TouchableOpacity>
      ) : (
        <View style={styles.itemHeader}>
          {rightView && rightView}
        </View>
      )}
    </View>
  );
};

export default HeaderApp;
