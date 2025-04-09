import React, { useState } from 'react';
import { FlatList, Pressable, TouchableOpacity, View } from 'react-native';
import styles from './style';
import { Text } from 'react-native-gesture-handler';
import colors from '../../assets/color/colors';

type AppPikerListBoxProps = {
  text: string,
  setText: (t: string) => void;
  defaultText?: string,
  lists: string[]
};

const AppPickerListBox: React.FC<AppPikerListBoxProps> = ({ text, setText, defaultText, lists }) => {
  const [isShowList, setIsShowList] = useState(false);
  return <View style={styles.container}>
    <View style={styles.box}>
      {text ?
        <Text style={styles.text}>{text}</Text> :
        <Text style={[styles.text, { color: colors.dark, opacity: 0.7 }]}>{defaultText}</Text>
      }

      <Pressable onPress={() => { setIsShowList(pre => !pre) }}>
        <Text style={{ fontSize: 14, fontWeight: '800' }}>Chọn</Text>
      </Pressable>
    </View>

    <FlatList
      style={{ display: isShowList ? 'flex' : 'none' }}
      data={lists}
      renderItem={({ item, index }) => (
        <TouchableOpacity style={styles.itemList}
          onPress={() => { setText(item); setIsShowList(false) }}
        >
          <Text>{item}</Text>
        </TouchableOpacity>
      )}
    />

  </View>;
};
export default AppPickerListBox;
