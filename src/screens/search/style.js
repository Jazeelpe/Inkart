import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    title: {
      color: '#000',
      fontSize: 18,
      paddingLeft: 6,
    },
    flatlisContainer: {
      marginHorizontal: 15,
      marginVertical: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icons: {
      width: 60,
      height: 60,
      borderWidth: 1,
      borderColor: '#97A97C',
      borderRadius: 60 / 2,
      overflow: 'hidden',
      resizeMode: 'contain',
    },
    iconTitle: {
      color: '#000',
    },
  });
export default style;
