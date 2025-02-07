import React from 'react';
import styles from './Style';
import LinearGradient from 'react-native-linear-gradient';
import {colorsGradient} from '../../assets/color/colors';

export type BackgroundAppProps = {
  children: React.ReactNode;
  groupColor: (string | number)[];
};

const AppBackground: React.FC<BackgroundAppProps> = ({
  children,
  groupColor,
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={groupColor}
      style={styles.Container}>
      {children}
    </LinearGradient>
  );
};

export default AppBackground;
