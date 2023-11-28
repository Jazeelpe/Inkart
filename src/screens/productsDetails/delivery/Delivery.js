import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {DimensionContext} from '../../App/App';
import style from './style';
import CustomTextInput from '../../../components/customTextInput/CustomTextInput';
const Delivery = () => {
  const {width, height} = useContext(DimensionContext);
  const responsiveStyle = style(width, height);
  return (
    <View>
      <View style={responsiveStyle.container1}>
        <Text style={responsiveStyle.head}>Check Delivery</Text>
        <Text style={responsiveStyle.sub}>
          Enter Pincode to check delivery date/pickup option
        </Text>
      </View>
      <CustomTextInput placeHolder="Pincode" check={true} />
      <View style={responsiveStyle.container1}>
        <Text style={responsiveStyle.sub}>
          Free delivery on orders above 200 RS
        </Text>
        <Text style={responsiveStyle.sub}>Cash on delivery available</Text>
        <Text style={responsiveStyle.sub}>
          Easy 21 days return and exchange
        </Text>
      </View>
    </View>
  );
};

export default Delivery;
