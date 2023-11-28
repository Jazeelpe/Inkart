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
    cartIcon: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    cartIconContainer: {
      position: 'absolute',
      right: 0,
      top: -5,
      width: 30,
      height: 35,
      paddingLeft: 6,
      paddingTop: 6,
      backgroundColor: 'red',
      borderRadius: 30 / 2,
    },
    headerIcon: {
      width: 25,
      height: 25,
      resizeMode: 'contain',
    },
    headerIconbadge: {
      backgroundColor: 'red',
      width: 20,
      height: 20,
      borderRadius: 20 / 2,
      position: 'absolute',
      right: 1,
      top: -5,
    },
  });
export default style;
