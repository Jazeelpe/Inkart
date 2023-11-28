import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    mainContainer: {
      marginHorizontal: 8,
      padding: 20,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#97A97C',
    },
    subContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      paddingBottom: 15,
    },
    subContainer2: {
      marginTop: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      color: '#000',
      fontFamily: 'Lato-Bold',
      fontSize: 18,
      marginBottom: 10,
    },
    subtitle: {
      color: '#000',
      fontSize: 15,
      marginBottom: 5,
    },
    subtitle2: {
      color: '#000',
      fontSize: 15,
      marginBottom: 5,
      textAlign: 'right',
    },
  });
export default style;
