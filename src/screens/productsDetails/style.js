import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    mainContainer: {
      flexDirection: 'column',
      padding: 10,
    },
    shareIconContainer: {
      paddingHorizontal: 15,
    },
    imageContainer: {},
    image: {
      width: 400,
      height: 300,
      resizeMode: 'contain',
    },
    firstContainer: {
      marginTop: -10,
      backgroundColor: '#fff',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      padding: 13,
      gap: 20,
    },
    headerText: {
      color: '#000',
      fontFamily: 'Lato-Bold',
      fontSize: 18,
    },
    description: {
      color: 'gray',
    },
    ProductDetailsContainer: {
      paddingBottom: 8,
      gap: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#000',
    },
    dropDownContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    fixedContainer: {
      width: width * 0.95,
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: 'green',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    btnContainer: {
      width: 100,
      height: 35,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
export default style;
