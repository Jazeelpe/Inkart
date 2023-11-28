import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    TabContainer: {
      backgroundColor: '#fff',
      width: width * 0.19,
    },
    sidebarContainer: {
      marginTop: 10,
      flexDirection: 'column',
      alignItems: 'center',
      margin: 5,
      overflow: 'hidden',
      gap: 10,
    },
    icon: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 50 / 2,
    },
    txt: {
      color: '#000',
    },
    bannerimg: {
      width: 350,
      height: 150,
      resizeMode: 'cover',
      padding: 10,
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 4,
    },
    nametxt: {
      color: '#000',
      fontFamily: 'Lato-Bold',
      fontSize: 18,
    },
    dectxt: {
      color: '#000',
      fontSize: 15,
    },
  });
export default style;
