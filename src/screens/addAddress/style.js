import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    textInput: {
      backgroundColor: '#A9B388',
      height: 60,
    },
    container: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#000',
    },
    description: {
      backgroundColor: '#A9B388',
      fontSize: 16,
      color: '#000',
    },
    MapView: {
      height: height * 0.4,
      width: width,
    },
    mainContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      padding: 10,
    },
  });
export default style;
