import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
const style = StyleSheet.create({
  TextInput: {
    flex: 1,
    backgroundColor: '#99B080',
    borderRadius: 15,
    padding: 15,
    marginVertical: 15,
    color: '#000',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: width * 0.05,
    height: height * 0.05,
    resizeMode: 'contain',
  },
  touchable: {
    width: width * 0.1,
    position: 'absolute',
    right: 1,
  },
});

export default style;
