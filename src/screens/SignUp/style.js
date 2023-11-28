import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

const style = StyleSheet.create({
  container: {
    height: '100%',
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
  backbtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    textAlign: 'center',
  },
  backicon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default style;
