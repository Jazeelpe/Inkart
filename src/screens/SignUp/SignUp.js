import React, {useState, useEffect} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import style from './style';
import CustomTextInput from '../../components/customTextInput/CustomTextInput';
import CustomButton from '../../components/customButton/CustomButton';
import google from '../../assets/images/google.png';
import backicon from '../../assets/images/back.png';
import {useNavigation} from '@react-navigation/native';
import {isEmailValid} from '../../utils/validations';
import {isPhoneNumberValid} from '../../utils/validations';
import Snackbar from 'react-native-snackbar';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpasssword, setCpassword] = useState('');
  const [mobile, setMobile] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '995017210201-e44tprqjulj6thmvqf5jh46gndumm478.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleSignIn = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  };

  const handleBackbtn = () => {
    navigation.goBack();
  };

  const handleSignUp = async () => {
    if (
      email.trim() !== '' &&
      password.trim() !== '' &&
      cpasssword.trim() !== '' &&
      mobile.trim() !== ''
    ) {
      if (password === cpasssword) {
        await firestore()
          .collection('users')
          .where('email', '==', email.trim())
          .get()
          .then(async snapshot => {
            if (snapshot.empty) {
              if (isEmailValid(email.trim())) {
                if (isPhoneNumberValid(mobile.trim())) {
                  const userData = {
                    email: email.trim(),
                    password: password.trim(),
                    cpasssword: cpasssword.trim(),
                    mobile: mobile.trim(),
                    created: String(new Date()),
                    updated: String(new Date()),
                  };

                  await firestore()
                    .collection('users')
                    .add(userData)
                    .then(res => {
                      navigation.navigate('AppDrawer');
                      Snackbar.show({
                        text: 'Successful',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: 'green',
                      });
                    })
                    .catch(err => {
                      Snackbar.show({
                        text: 'Something Went Wrong !',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: 'red',
                      });
                    });
                } else {
                  Snackbar.show({
                    text: 'Invalid Phone Number !',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: 'red',
                  });
                }
              } else {
                Snackbar.show({
                  text: 'Invalid Email !',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: 'red',
                });
              }
            } else {
              Snackbar.show({
                text: 'Email already exist !',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red',
              });
            }
          });
      } else {
        Snackbar.show({
          text: 'Password Does not Match',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: 'red',
        });
      }
    } else {
      Snackbar.show({
        text: 'Empty field !',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'red',
      });
    }
  };

  return (
    <View style={style.container}>
      <Image
        source={require('../../assets/images/topBg.png')}
        style={style.topBg}
      />
      <ScrollView style={style.scrollView}>
        <Image
          source={require('../../assets/images/app-name.jpeg')}
          style={style.appName}
        />
        <Text style={style.loginText}>Sign Up Account</Text>
        <CustomTextInput
          type="email"
          placeHolder="Email Address"
          handleText={text => setEmail(text)}
        />

        <CustomTextInput
          type="phone"
          placeHolder="Mobile Number"
          handleText={text => setMobile(text)}
        />
        <CustomTextInput
          type="password"
          placeHolder="Passwrod"
          handleText={text => setPassword(text)}
        />

        <CustomTextInput
          type="password"
          placeHolder="Confirm Passwrod"
          handleText={text => setCpassword(text)}
        />
        <CustomButton
          type="primary"
          buttonText="Sign Up"
          handleButtonPress={handleSignUp}
        />
        <CustomButton
          icon={google}
          type="secondary"
          buttonText="Sign Up with Google"
          handleButtonPress={handleGoogleSignIn}
        />
        <View style={style.backbtnContainer}>
          <Image source={backicon} style={style.backicon} />
          <Text style={style.text} onPress={handleBackbtn}>
            Go to Login
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
