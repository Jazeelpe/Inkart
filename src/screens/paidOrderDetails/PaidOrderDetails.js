import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import {DimensionContext} from '../App/App';
import firestore from '@react-native-firebase/firestore';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import style from './style';
import CustomButton2 from '../../components/customButton2/CustomButton2';

const PaidOrderDetails = () => {
  const value = useContext(DimensionContext);
  const responsiveStyle = style(value.width, value.height);
  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route.params;

  const reOrder = async () => {
    const smallId = Math.random();
    await firestore()
      .collection('Orders')
      .add({
        orderId: String(smallId).toUpperCase(),
        created: Date.now(),
        updated: Date.now(),
        orderStatus: 'Ordered',
        totalAmount: item.totalAmount,
        address: item.address,
        userId: item.userId,
        paymentMethod: 'online',
        cartItems: item.cartItems,
        userName: item.userName,
        userEmail: item.userEmail,
        userPhone: item.userPhone,
        expDelDate: '',
      });
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'Order Summary',
    });
  }, []);

  return (
    <View style={responsiveStyle.container}>
      <ScrollView>
        <View style={responsiveStyle.firstContainer}>
          <View>
            <Feather name="box" size={50} color={'#000'} />
          </View>
          <View>
            <Text>Order Id: #{item.orderId} </Text>
            <Text style={{color: '#FFF', fontWeight: 'bold'}}>
              {item.orderStatus}
            </Text>
          </View>
        </View>

        <View style={{marginVertical: 15}}>
          <Text style={{color: 'green', fontWeight: 'bold', fontSize: 18}}>
            Items:
          </Text>
          {item.cartItems &&
            item.cartItems.map((ele, index) => {
              return (
                <View key={index} style={responsiveStyle.mapContainer}>
                  <View style={responsiveStyle.qtyContainer}>
                    <Text style={{color: '#fff'}}>{ele.quantity}</Text>
                  </View>
                  <View>
                    <View>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: 'bold',
                          fontSize: 18,
                        }}>
                        {ele.name}
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: '#000'}}>{ele.description}</Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{color: '#000', fontWeight: 'bold', fontSize: 15}}>
                      ₹{ele.price}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>

        <View>
          <Text style={{color: 'green', fontWeight: 'bold', fontSize: 18}}>
            Payment Details
          </Text>
          <View style={responsiveStyle.secondConatiner}>
            <View>
              <Text style={{color: '#000'}}>Bag Total</Text>
              <Text style={{color: '#000'}}>Coupon Discount</Text>
              <Text style={{color: '#000'}}>Delivery</Text>
            </View>
            <View>
              <Text style={{color: '#000', textAlign: 'right'}}>₹134</Text>
              <Text style={{color: '#FF0000', textAlign: 'right'}}>
                Apply Coupon
              </Text>
              <Text style={{color: '#000', textAlign: 'right'}}>₹134</Text>
            </View>
          </View>
        </View>

        <View style={responsiveStyle.mapContainer}>
          <Text style={{color: '#000', fontWeight: 'bold', fontSize: 18}}>
            Total Amount
          </Text>
          <Text style={{color: '#000', fontWeight: 'bold', fontSize: 18}}>
            ₹{item.totalAmount}
          </Text>
        </View>

        <Text style={{color: 'green', fontWeight: 'bold', fontSize: 18}}>
          Address:
        </Text>
        <View style={{paddingVertical: 10}}>
          <Text style={{color: '#000'}}>Rick Nelon</Text>
          <Text style={{color: '#000'}}>HKL Appartments,768</Text>
          <Text style={{color: '#000'}}>NK.09.US.</Text>
        </View>

        <Text style={{color: 'green', fontWeight: 'bold', fontSize: 18}}>
          Payment Method:
        </Text>
        <View style={responsiveStyle.paymentMethod}>
          <View>
            <FontAwesome name="cc-visa" size={40} color={'#000'} />
          </View>
          <View>
            <Text style={{color: '#000'}}>*** *** *** 7878</Text>
            <Text style={{color: '#000'}}>online</Text>
          </View>
        </View>
      </ScrollView>
      <View>
        <CustomButton2 content="Reorder" handleSubmit={reOrder} />
      </View>
    </View>
  );
};

export default PaidOrderDetails;
