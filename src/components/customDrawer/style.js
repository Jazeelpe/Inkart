import {StyleSheet} from 'react-native';

const style = (width, height) =>
  StyleSheet.create({
    mainContainer: {
      padding: 10,
      flex: 1,
    },
    avatarIconContainer: {
      width: 75,
      height: 75,
      borderRadius: 75 / 2,
      backgroundColor: '#CFE1B9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarMainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 9,
      borderBottomWidth: 1,
      borderBottomColor: '#97A97C',
      paddingVertical: 15,
    },
    userContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
    },
    iconList: {
      height: 25,
      width: 25,
      resizeMode: 'contain',
    },
    listContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 15,
    },
    listInnerContainer: {
      flexDirection: 'row',
      gap: 20,
      alignItems: 'center',
    },
    btnContainer: {
      width: 100,
      padding: 10,
      backgroundColor: '#618264',
      borderRadius: 22,
    },
    btnText: {
      textAlign: 'center',
      color: '#fff',
    },
    supportContainer: {
      borderWidth: 1,
      padding: 12,
      backgroundColor: '#CFE1B9',
      borderRadius: 22,
      marginVertical: 15,
    },
    btnSupport: {
      width: 120,
      padding: 12,
      backgroundColor: '#618264',
      borderRadius: 22,
      textAlign: 'center',
      color: '#fff',
    },
  });
export default style;
