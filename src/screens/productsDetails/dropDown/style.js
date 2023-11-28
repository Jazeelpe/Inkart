import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    headerText: {
      color: '#000',
      fontFamily: 'Lato-Bold',
      fontSize: 18,
    },
    description: {
      color: 'gray',
    },
    dropDownContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    ProductDetailsContainer: {
      paddingBottom: 8,
      gap: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#000',
    },
  });
export default style;
