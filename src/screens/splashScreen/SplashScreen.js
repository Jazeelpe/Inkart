import {View, Image} from 'react-native';

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../../assets/images/logo.jpeg')}
        style={{width: 400, height: 120}}
      />
    </View>
  );
};
export default SplashScreen;
