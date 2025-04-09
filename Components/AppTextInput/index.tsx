import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from './style';
import colors from '../../assets/color/colors';

type validate = {
  min?: { length: number, text: string },
  max?: { length: number, text: string },
  unique?: string,
  hasKey?: string[],
  minNumber?: { length: number, text: string },
  maxNumber?: { length: number, text: string },
}

interface AppTextInputProps {
  text: string,
  setText: (t: string) => void;
  placeholder?: string,
  title?: string,
  textError?: string,
  checkValidate?: validate,
};

const AppTextInput: React.FC<AppTextInputProps> = ({ text, setText, placeholder, title, checkValidate }) => {
  const [textError, setTextError] = useState('');


  useEffect(() => {
    if (checkValidate?.unique && text.length === 0) {
      setTextError(checkValidate.unique);
      return;
    }
    if (checkValidate?.min && text.length < checkValidate?.min.length) {
      setTextError(checkValidate.min.text);
      return;
    }
    setTextError('');
  }, [text])

  return <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <TextInput
      style={[styles.input, { borderColor: !textError ? colors.white : colors.danger }]}
      onChangeText={setText}
      value={text}
      placeholder={placeholder}
    />
    <Text style={[styles.error, { display: !textError ? 'none' : 'flex' }]}>{textError}</Text>
  </View>;
};
export default AppTextInput;
