import React, {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import style from './style';
import {DimensionContext} from '../../screens/App/App';
const CustomButton2 = ({content, handleSubmit}) => {
  const {width, height} = useContext(DimensionContext);
  const responsiveStyle = style(width, height);
  return (
    <TouchableOpacity style={responsiveStyle.btn} onPress={handleSubmit}>
      <Text style={responsiveStyle.text}>{content}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton2;
