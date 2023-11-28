import React, {useState, useContext} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import style from './style';
import CustomTextInput from '../../components/customTextInput/CustomTextInput';
import CustomButton from '../../components/customButton/CustomButton';
import backicon from '../../assets/images/back.png';
import {DimensionContext} from '../App/App';

const LoginPhone = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [OTP, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const value = useContext(DimensionContext);
  console.log(value);
  const responisveStyle = style(value.width, value.height);

  const handleButtonPress = async () => {
    try {
      setLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      if (confirmation) {
        setLoading(false);
        setConfirm(confirmation);
        setShowOtpBox(true);
      }
    } catch (error) {
      console.warn(error);
      setLoading(false);
    }
  };
  const handleVerifyOtp = async () => {
    if (OTP.trim() !== '') {
      setLoading(true);
      try {
        await confirm.confirm(OTP.trim());
        navigation.navigate('AppDrawer');
      } catch (error) {
        setLoading(false);
        console.warn(error);
      }
    }
  };

  const navigation = useNavigation();

  const handleBackbtn = () => {
    navigation.goBack();
  };
  return (
    <View style={responisveStyle.container}>
      <Image
        source={require('../../assets/images/topBg.png')}
        style={responisveStyle.topBg}
      />
      <ScrollView style={responisveStyle.scrollView}>
        <Image
          source={require('../../assets/images/app-name.jpeg')}
          style={responisveStyle.appName}
        />
        <Text style={responisveStyle.loginText}>Enter Your Phone Number</Text>
        <CustomTextInput
          type="phone"
          placeHolder="Mobile Number"
          handleText={text => setPhoneNumber(text)}
        />
        {showOtpBox === true ? (
          <CustomTextInput
            type="phone"
            placeHolder="Enter OTP"
            handleText={text => setOTP(text)}
          />
        ) : null}
        <CustomButton
          type="primary"
          buttonText={
            loading === true
              ? 'loading...'
              : showOtpBox === true
              ? 'Verify OTP'
              : 'Sent Code'
          }
          handleButtonPress={
            showOtpBox === true ? handleVerifyOtp : handleButtonPress
          }
        />
        <View style={responisveStyle.backbtnContainer}>
          <Image source={backicon} style={responisveStyle.backicon} />
          <Text style={responisveStyle.text} onPress={handleBackbtn}>
            Go to Login
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginPhone;
