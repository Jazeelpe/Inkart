import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    container: {
      backgroundColor: '#EBF3E8',
      padding: 10,
      borderRadius: 8,
    },
    user: {
      fontSize: 18,
      color: '#000',
    },
    review: {
      fontSize: 15,
      color: '#000',
    },
  });
export default style;
