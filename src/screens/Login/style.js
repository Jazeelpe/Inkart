import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    container: {
      height: height,
    },
    topBg: {
      width: width,
      height: height * 0.13,
      resizeMode: 'cover',
    },
    scrollView: {
      flex: 1,
      backgroundColor: '#fff',
      marginVertical: height * -0.04,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      overflow: 'hidden',
      padding: 20,
    },
    appName: {
      width: width * 0.4,
      height: height * 0.13,
      resizeMode: 'contain',
    },
    loginText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 20,
      color: '#000',
      marginBottom: 10,
    },
    text: {
      textAlign: 'center',
      color: '#000',
      marginTop: 15,
      marginBottom: 26,
    },
    span: {
      textDecorationLine: 'underline',
    },
    footer: {
      height: height * 0.06,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F7F8',
    },
    footerText: {
      color: '#000',
      fontFamily: 'Lato-Bold',
      fontSize: 15,
    },
  });

export default style;
