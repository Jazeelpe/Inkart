import React, {useState} from 'react';
import {Image, TextInput, View, TouchableOpacity, Text} from 'react-native';
import style from './style';
import hide from '../../assets/images/hide.png';
import email from '../../assets/images/email.png';
import view from '../../assets/images/view.png';

const CustomTextInput = ({
  type,
  placeHolder,
  handleText,
  value,
  check,
  multiline,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const keyboardType =
    type === 'email'
      ? 'email-address'
      : type === 'password'
      ? 'default'
      : type === 'phone'
      ? 'phone-pad'
      : 'default';
  const secureTextEntry = type === 'password' ? true : false;
  const handlePassWordVisibilty = () => {
    if (type === 'password') {
      setIsVisible(!isVisible);
    }
  };
  return (
    <View style={style.container}>
      <TextInput
        placeholder={placeHolder}
        keyboardType={keyboardType}
        style={style.TextInput}
        secureTextEntry={secureTextEntry && isVisible === false ? true : false}
        placeholderTextColor={'#F5F7F8'}
        selectionColor={'#000'}
        onChangeText={handleText}
        value={value}
        multiline={multiline}
      />
      {type === 'email' ? (
        <TouchableOpacity style={style.touchable} disabled={true}>
          <Image source={email} style={style.image} />
        </TouchableOpacity>
      ) : type === 'password' ? (
        <TouchableOpacity
          onPress={handlePassWordVisibilty}
          style={style.touchable}>
          <Image
            source={isVisible === false ? hide : view}
            style={style.image}
          />
        </TouchableOpacity>
      ) : null}
      {check ? (
        <Text style={{color: 'green', position: 'absolute', right: 15}}>
          Check
        </Text>
      ) : null}
    </View>
  );
};

export default CustomTextInput;
