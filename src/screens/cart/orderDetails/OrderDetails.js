import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {DimensionContext} from '../../App/App';
import style from './style';
import CustomButton2 from '../../../components/customButton2/CustomButton2';

const OrderDetails = ({total, charges, handleSubmit}) => {
  const {width, height} = useContext(DimensionContext);
  const responsiveStyle = style(width, height);
  return (
    <View style={responsiveStyle.mainContainer}>
      <Text style={responsiveStyle.title}>Order Details</Text>
      <View style={responsiveStyle.subContainer}>
        <View style={{flex: 1}}>
          <Text style={responsiveStyle.subtitle}>Bag Total</Text>
          <Text style={responsiveStyle.subtitle}>Bag Savings</Text>
          <Text style={responsiveStyle.subtitle}>Coupon Discount</Text>
          <Text style={responsiveStyle.subtitle}>Delivery</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={responsiveStyle.subtitle2}>
            ₹{parseFloat(total).toFixed(2)}
          </Text>
          <Text style={[responsiveStyle.subtitle2, {color: 'green'}]}>
            ₹00.00
          </Text>
          <Text style={[responsiveStyle.subtitle2, {color: 'red'}]}>
            Apply Coupon
          </Text>
          <Text style={responsiveStyle.subtitle2}>
            ₹{parseFloat(charges).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={responsiveStyle.subContainer2}>
        <Text style={responsiveStyle.title}>Total Amount</Text>
        <Text style={responsiveStyle.title}>
          ₹{parseFloat(total + charges).toFixed(2)}
        </Text>
      </View>
      <CustomButton2
        content="Proceed to Checkout"
        handleSubmit={handleSubmit}
      />
    </View>
  );
};
export default OrderDetails;
