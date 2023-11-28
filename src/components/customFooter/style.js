import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    container: {
      height: 65,
      width: width * 0.99,
      paddingTop: 15,
      paddingBottom: 4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: '#618264',
      borderRadius: 8,
      bottom: 2,
    },
    subContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    icons: {
      width: 40,
      height: 32,
      resizeMode: 'contain',
    },
  });

export default style;
