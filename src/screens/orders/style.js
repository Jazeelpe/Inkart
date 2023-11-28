import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    filter: {
      color: 'green',
      textAlign: 'center',
      fontSize: 17,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 9,
      width: width,
    },
    title: {
      color: '#000',
      fontFamily: 'Lato-Bold',
      fontSize: 16,
    },
    subTitle: {
      color: '#000',
      fontSize: 14,
    },
    orderContainer: {
      flexDirection: 'row',
      backgroundColor: '#CFE1B9',
    },
    orderContainerMain: {
      marginVertical: 20,
      marginHorizontal: 9,
      padding: 15,
      backgroundColor: '#CFE1B9',
      borderRadius: 8,
    },
    subContainer: {
      flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      paddingBottom: 20,
    },
    img: {
      width: '100%',
      height: 130,
      resizeMode: 'contain',
    },
  });
export default style;
