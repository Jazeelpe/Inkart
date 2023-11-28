import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    // mainContainer: {
    //   backgroundColor: '#CFE1B9',
    //  },
    headingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      marginTop: 5,
      overflow: 'hidden',
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
    flatlistConatiner: {
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
    iconConatiner: {
      margin: 5,
      padding: 5,
      borderRightWidth: 1,
      borderRightColor: '#000',
    },
    itemImage: {
      width: 90,
      height: 90,
      resizeMode: 'contain',
    },
    textConatiner: {
      flex: 1,
      paddingLeft: 8,
      marginTop: 10,
    },
    btnContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    offerContainer: {
      flexDirection: 'row',
      //  justifyContent: 'space-between',
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
    cartContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    btn1: {
      width: 30,
      borderWidth: 1,
      borderColor: '#97A97C',
      padding: 2,
      borderRadius: 30 / 2,
      marginTop: 5,
      marginBottom: 8,
    },
    btnText: {
      fontSize: 17,
      textAlign: 'center',
      color: '#000',
    },
    count: {
      color: '#008000',
      fontSize: 17,
    },
  });
export default style;
