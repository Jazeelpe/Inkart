import React, {useState, useEffect, useContext} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import style from './style';
import CustomTextInput from '../../components/customTextInput/CustomTextInput';
import CustomButton from '../../components/customButton/CustomButton';
import google from '../../assets/images/google.png';
import phone from '../../assets/images/phone.png';
import Snackbar from 'react-native-snackbar';
import {DimensionContext} from '../App/App';
import {useDispatch} from 'react-redux';
import {login} from '../../storage/action';
import {LOGIN} from '../../storage/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const value = useContext(DimensionContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const responisveStyle = style(value.width, value.height);
  function onAuthStateChanged(user) {
    if (user) {
      // console.warn(user);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleButtonPress = () => {
    console.warn('pressed');
  };
  const handleLogin = async () => {
    if (email.trim() !== '' && password !== '') {
      await firestore()
        .collection('users')
        .where('email', '==', email.trim())
        .get()
        .then(snapshot => {
          if (!snapshot.empty) {
            snapshot.forEach(documentSnapshot => {
              let res = documentSnapshot.data();
              if (password === res.password) {
                dispatch(
                  LOGIN({
                    firstName: res.firstName,
                    lastName: res.lastName,
                    email: res.email,
                    mobile: res.mobile,
                    userId: documentSnapshot.id,
                  }),
                );
                //navigation.navigate('AppDrawer');
              } else {
                Snackbar.show({
                  text: 'Invalid Password',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: 'red',
                });
              }
            });
          } else {
            Snackbar.show({
              text: 'Invalid Email',
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: 'red',
            });
          }
        });
    } else {
      Snackbar.show({
        text: 'Field Cannot be Empty',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: 'red',
      });
    }
  };

  const handleNavigation = () => {
    navigation.navigate('SignUp');
  };
  const handleGoTOLoginPhone = () => {
    navigation.navigate('LoginPhone');
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
        <Text style={responisveStyle.loginText}>Login Account</Text>
        <CustomTextInput
          type="email"
          placeHolder="Email Address"
          handleText={text => setEmail(text)}
        />
        <CustomTextInput
          type="password"
          placeHolder="Password"
          handleText={text => setPassword(text)}
        />
        <CustomButton
          type="primary"
          buttonText="Login"
          handleButtonPress={handleLogin}
        />
        <Text style={responisveStyle.text}>
          Don't have an account ?{' '}
          <Text style={responisveStyle.span} onPress={handleNavigation}>
            Create Now
          </Text>
        </Text>
        <CustomButton
          icon={phone}
          type="secondary"
          buttonText="Sign in with Phone"
          handleButtonPress={handleGoTOLoginPhone}
        />
        <CustomButton
          icon={google}
          type="secondary"
          buttonText="Sign in with Google"
          handleButtonPress={handleButtonPress}
        />
      </ScrollView>
      <View style={responisveStyle.footer}>
        <Text style={responisveStyle.footerText}>Login as Guest</Text>
      </View>
    </View>
  );
};

export default Login;
