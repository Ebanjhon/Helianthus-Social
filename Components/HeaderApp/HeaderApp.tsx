import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './Style';
import IconBack from '../../assets/SVG/IconBack';
import {useNavigation} from '@react-navigation/native';
import IconMenu from '../../assets/SVG/IconMenu';

export type HeaderAppProps = {
  title: string;
  isShowleftAction: boolean;
  isShowrightAction: boolean;
  enableBackground: boolean;
};

const HeaderApp: React.FC<HeaderAppProps> = ({
  title,
  isShowleftAction = true,
  isShowrightAction = false,
  enableBackground = false,
}) => {
  const Navigation = useNavigation();
  return (
    <View
      style={[
        styles.Container,
        enableBackground && {backgroundColor: 'white'},
      ]}>
      {isShowleftAction ? (
        <TouchableOpacity
          onPress={Navigation.goBack}
          style={[styles.itemHeader]}>
          <IconBack height={35} width={35} />
        </TouchableOpacity>
      ) : (
        <View style={styles.itemHeader} />
      )}
      <Text style={{fontSize: 19, fontWeight: '600'}}>{title}</Text>
      {isShowrightAction ? (
        <TouchableOpacity style={[styles.itemHeader, {}]}>
          <IconMenu height={35} width={35} />
        </TouchableOpacity>
      ) : (
        <View style={styles.itemHeader} />
      )}
    </View>
  );
};

export default HeaderApp;
