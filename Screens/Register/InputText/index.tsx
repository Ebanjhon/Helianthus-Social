import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './style';
import colors from '../../../assets/color/colors';

type validate = {
  min?: { length: number, text: string },
  max?: { length: number, text: string },
  unique?: string,
  hasKey?: string[],
};

interface InputTextProps {
  text: string | undefined,
  setText: (t: string) => void;
  onErrorChange?: (hasError: boolean) => void;
  placeholder: string,
  title: string,
  checkValidate?: validate,
  iconUri: string,
  type?: 'Password' | 'Normal' | 'Email'
};
function isValidEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const InputText: React.FC<InputTextProps> = ({ text, setText, onErrorChange, placeholder, title, checkValidate, iconUri, type = 'Normal' }) => {
  const [textError, setTextError] = useState<string>();
  const [isShowpass, setIsShowpass] = useState(false);

  useEffect(() => {
    if (text === undefined) {
      setTextError('');
      return;
    }
    if (checkValidate?.max && text.length < checkValidate.max.length) {
      setTextError(checkValidate.max.text);
      return;
    }
    if (checkValidate?.unique && text.length === 0) {
      setTextError(checkValidate.unique);
      return;
    } else if (type === "Email" && !isValidEmail(text)) {
      setTextError("Vui lòng nhập Email chính xác!");
      return;
    }
    if (checkValidate?.min && text.length < checkValidate?.min.length) {
      setTextError(checkValidate.min.text);
      return;
    }
    setTextError('');
    onErrorChange && onErrorChange(true);
  }, [text])

  return <View style={styles.container}>
    <Text style={styles.text_show}>{title}</Text>
    <View style={styles.input_contai}>
      <Image
        style={{ width: 30, height: 30 }}
        source={{ uri: iconUri }}
      />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        secureTextEntry={isShowpass}
        placeholderTextColor={colors.gray}
        style={styles.text_input}
      />
      {type === 'Password' &&
        <TouchableOpacity
          onPress={() => setIsShowpass(prevShowPass => !prevShowPass)}>
          <Image
            style={{ width: 30, height: 30 }}
            source={
              !isShowpass
                ? require('../../../assets/images/iconhide.png')
                : require('../../../assets/images/iconsee.png')
            }
          />
        </TouchableOpacity>
      }
    </View>
    {textError &&
      <Text style={styles.text_error}>{textError}</Text>
    }
  </View>;
};
export default InputText;
