import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    container1: {
      gap: 10,
      marginVertical: 15,
    },
    head: {
      fontFamily: 'Lato-Bold',
      fontSize: 18,
      color: '#000',
    },
    sub: {
      fontSize: 15,
      color: '#000',
    },
  });
export default style;
