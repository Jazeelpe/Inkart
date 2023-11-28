import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

const style = StyleSheet.create({
  button: {
    textAlign: 'center',
    padding: 15,
    fontFamily: 'Lato-Bold',
  },
  image: {
    width: width * 0.1,
    height: height * 0.04,
    resizeMode: 'contain',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default style;
