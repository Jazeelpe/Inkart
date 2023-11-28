import React, {useEffect, useContext, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from './style';
import {DimensionContext} from '../App/App';
import CustomTextInput from '../../components/customTextInput/CustomTextInput';
import CustomButton from '../../components/customButton/CustomButton';
const Review = () => {
  const navigation = useNavigation();
  const actionSheetRef = useRef(null);
  const {width, height} = useContext(DimensionContext);
  const responsiveStyle = style(width, height);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Text
            style={{paddingHorizontal: 8}}
            onPress={() => actionSheetRef.current?.show()}>
            <AntDesign name="pluscircleo" size={30} color="#000" />;
          </Text>
        );
      },
    });
  }, []);
  return (
    <View style={{padding: 10, backgroundColor: '#fff', flex: 1}}>
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
      <ActionSheet ref={actionSheetRef}>
        <View style={{padding: 10, gap: 10}}>
          <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
            Write a review
          </Text>
          <View style={{flexDirection: 'row'}}>
            <AntDesign name="staro" size={30} color="#000" />
            <AntDesign name="staro" size={30} color="#000" />
            <AntDesign name="staro" size={30} color="#000" />
            <AntDesign name="staro" size={30} color="#000" />
            <AntDesign name="staro" size={30} color="#000" />
          </View>
          <CustomTextInput multiline={true} placeHolder="write review" />
          <CustomButton type="primary" buttonText="Submit Review" />
        </View>
      </ActionSheet>
    </View>
  );
};

export default Review;
