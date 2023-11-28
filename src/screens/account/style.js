import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    profileName: {
      color: '#000',
      fontFamily: 'Lato-Bold',
      fontSize: 28,
      textAlign: 'center',
      marginTop: 30,
      marginBottom: 15,
    },
    propicContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 15,
    },
    propic: {
      width: 150,
      height: 150,
    },
    editContainer: {
      position: 'absolute',
      bottom: 0,
      right: width * 0.35,
    },
    editIcon: {
      width: 45,
      height: 45,
    },
    inputContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    btn: {
      marginVertical: 20,
      paddingHorizontal: 10,
    },
    modalView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalSubContainer: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    btnConatiner: {
      backgroundColor: '#618264',
      padding: 15,
      borderRadius: 8,
    },
  });
export default style;
