import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    backGroundImg: {
      width: 380,
      height: 180,
      borderWidth: 1,
      borderColor: '#97A97C',
      borderRadius: 25,
      margin: 15,
      overflow: 'hidden',
    },
    container: {
      padding: 15,
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 10,
    },
    header: {
      fontFamily: 'Lato-Bold',
      color: '#000',
      fontSize: 18,
    },
    content: {
      fontFamily: 'Lato-Regular',
      color: '#000',
      fontSize: 15,
    },
    btn: {
      marginTop: 10,
      padding: 15,
      width: 140,
      borderRadius: 18,
      backgroundColor: '#618264',
    },
    btnText: {
      textAlign: 'center',
      fontFamily: 'Lato-Bold',
      fontSize: 16,
    },
  });
export default style;
