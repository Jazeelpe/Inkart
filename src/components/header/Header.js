import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import style from './style';
import {DimensionContext} from '../../screens/App/App';
import MenuIcon from '../../assets/images/material_menu.png';
import Logo from '../../assets/images/logo.jpeg';

const Header = () => {
  const value = useContext(DimensionContext);
  const responsiveStyle = style(value.width, value.height);
  const navigation = useNavigation();
  return (
    <View style={responsiveStyle.container}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Image
          source={require('../../assets/images/material_menu.png')}
          style={responsiveStyle.menuIcon}
        />
      </TouchableOpacity>

      <Image source={Logo} style={responsiveStyle.Logo} />
    </View>
  );
};

export default Header;
