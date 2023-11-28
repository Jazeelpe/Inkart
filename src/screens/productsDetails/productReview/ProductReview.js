import React, {useEffect, useContext, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from './style';
import {DimensionContext} from '../../App/App';
import {useNavigation} from '@react-navigation/native';

const ProductReview = () => {
  const [rating, setRating] = useState(0);

  const {width, height} = useContext(DimensionContext);

  const responsiveStyle = style(width, height);

  const navigation = useNavigation();

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 15,
          alignItems: 'center',
        }}>
        <Text style={responsiveStyle.user}>Product Review (1)</Text>
        <Text
          style={{color: 'green'}}
          onPress={() => navigation.navigate('Review')}>
          See All
        </Text>
      </View>
      <View style={responsiveStyle.container}>
        <Text style={responsiveStyle.user}>Guest User Account</Text>
        <View style={{flexDirection: 'row'}}>
          <AntDesign name="staro" size={30} color="#000" />
          <AntDesign name="staro" size={30} color="#000" />
          <AntDesign name="staro" size={30} color="#000" />
        </View>
        <Text style={responsiveStyle.review}>
          simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centurie
        </Text>
      </View>
    </View>
  );
};

export default ProductReview;
