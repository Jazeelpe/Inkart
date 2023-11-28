import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    container: {
      padding: 15,
      width: '100%',
      height: '100%',
    },
    firstContainer: {
      backgroundColor: 'green',
      borderRadius: 15,
      flexDirection: 'row',
      padding: 15,
      alignItems: 'center',
      gap: 10,
    },
    mapContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
    },
    qtyContainer: {
      backgroundColor: 'green',
      borderRadius: 8,
      padding: 10,
    },
    secondConatiner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBlockColor: '#000',
    },
    paymentMethod: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 10,
    },
  });
export default style;
