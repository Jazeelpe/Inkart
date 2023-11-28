import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    searchContainer: {
      marginTop: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      //width: width * 0.95,
      width: '100%',
      backgroundColor: '#CFE1B9',
      borderWidth: 1,
      borderColor: '#97A97C',
      borderRadius: 10,
      paddingHorizontal: 10,
      gap: 15,
    },
    icons: {
      width: 25,
      height: 25,
    },
  });
export default style;
