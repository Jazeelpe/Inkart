import {StyleSheet, StatusBar} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    Logo: {
      width: 150,
      height: 50,
      resizeMode: 'contain',
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 4,
      backgroundColor: 'white',
    },
    menuIcon: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
  });
export default style;
