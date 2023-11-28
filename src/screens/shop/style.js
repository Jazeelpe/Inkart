import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    Conatiner: {
      padding: 9,
    },
    flatlistContainer: {
      backgroundColor: '#D2E3C8',
      marginHorizontal: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 8,
      padding: 9,
    },
    flatlistConatiner1: {
      marginVertical: 13,
      marginHorizontal: 10,
      width: width * 0.95,
      height: height * 0.17,
      //borderWidth: 1,
      borderRadius: 12,
      borderColor: '#97A97C',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    text: {
      fontSize: 17,
      color: '#000',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      width: width,
      marginTop: 10,
    },
    filter: {
      color: 'green',
      textAlign: 'center',
      fontSize: 17,
    },
    iconConatiner: {
      margin: 5,
      padding: 5,
      borderRightWidth: 1,
      borderRightColor: '#000',
    },
    textConatiner: {
      flex: 1,
      paddingLeft: 8,
      marginTop: 10,
    },
    itemImage: {
      width: 90,
      height: 90,
      resizeMode: 'contain',
    },
    offerContainer: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    off: {
      backgroundColor: 'green',
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
      borderRadius: 10,
      padding: 4,
    },
    price: {
      color: '#000',
      fontFamily: 'Lato-Bold',
      fontSize: 16,
    },
    btn: {
      margin: 5,
      padding: 10,
      width: 110,
      borderRadius: 10,
      backgroundColor: '#618264',
    },
    btnText: {
      textAlign: 'center',
      fontFamily: 'Lato-Bold',
      fontSize: 14,
    },
    titleText: {
      color: '#000',
      fontFamily: 'Lato-Bold',
      fontSize: 18,
      marginBottom: 4,
    },
    subtitleText: {
      color: '#000',
      fontFamily: 'Lato-Regular',
      fontSize: 16,
    },
  });
export default style;
