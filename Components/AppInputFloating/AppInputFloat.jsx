import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Animated,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from 'react-native';
import colors from '../../assets/color/colors';

type AppInputFloatProps = {
  label: string,
  value: string,
  setValue: (text: string) => void,
  isPassword?: boolean,
};

export const AppInputFloat: React.FC<AppInputFloatProps> = ({
  label,
  value,
  setValue,
  isPassword = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const labelAnimation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelAnimation, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute',
    left: 16,
    top: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -17],
    }),
    fontSize: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [19, 15],
    }),
    color: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.black, colors.black], // Màu khi placeholder chuyển động
    }),
    fontWeight: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['400', '600'], // Thay đổi độ đậm của font chữ
    }),
    backgroundColor: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', colors.gold], // Thay đổi màu nền khi placeholder chuyển động
    }),
  };

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={!isShowPass}
        />
        <TouchableOpacity
          style={styles.ShowPass}
          onPress={() => setIsShowPass(!isShowPass)}>
          <Image
            style={[styles.icon, {display: isPassword ? 'flex' : 'none'}]}
            source={
              isShowPass
                ? require('../../assets/images/iconhide.png')
                : require('../../assets/images/iconsee.png')
            }
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginVertical: 12,
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'flex-start',
    paddingRight: 30,
  },
  input: {
    paddingHorizontal: 16,
    fontSize: 20,
    color: colors.black,
  },
  ShowPass: {
    position: 'absolute',
    right: 10,
    top: 7,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
