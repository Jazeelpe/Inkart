import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    headingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      marginTop: 5,
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
      width: 200,
      height: 265,
      // borderWidth: 1,
      borderRadius: 12,
      borderColor: '#97A97C',
      backgroundColor: '#fff',
    },
    iconConatiner: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    wishlist: {
      width: 25,
      height: 25,
      resizeMode: 'contain',
      alignSelf: 'flex-end',
      margin: 8,
    },
    itemImage: {
      width: 70,
      height: 70,
      resizeMode: 'contain',
    },
    textConatiner: {
      paddingLeft: 15,
      marginTop: 10,
    },
    btnContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    btn: {
      marginTop: 10,
      padding: 10,
      width: 115,
      borderRadius: 18,
      backgroundColor: '#618264',
    },
    btnText: {
      textAlign: 'center',
      fontFamily: 'Lato-Bold',
      fontSize: 14,
    },
  });
export default style;
