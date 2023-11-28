import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import style from './style';

const CustomButton = ({handleButtonPress, buttonText, type, icon}) => {
  return (
    <TouchableOpacity onPress={handleButtonPress} style={style.container}>
      {type === 'primary' ? null : <Image source={icon} style={style.image} />}
      <Text
        style={[
          style.button,
          {
            backgroundColor: type === 'primary' ? '#618264' : '#fff',
            borderRadius: type === 'primary' ? 30 : 10,
            color: type === 'primary' ? '#fff' : '#232D3F',
            fontSize: type === 'primary' ? 20 : 16,
            flex: type === 'primary' ? 1 : 0,
            marginVertical: type === 'primary' ? 15 : 18,
          },
        ]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
