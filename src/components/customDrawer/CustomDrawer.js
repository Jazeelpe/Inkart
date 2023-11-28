import {useContext, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import style from './style';
import {DimensionContext} from '../../screens/App/App';
import {signout} from '../../storage/action';
import {SIGNOUT} from '../../storage/userSlice';

const CustomDrawer = ({state, navigation}) => {
  const value = useContext(DimensionContext);
  const responsiveStyle = style(value.width, value.height);
  const {firstName, lastName, email} = useSelector(store => store.persist);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(SIGNOUT());
  };
  const data = [
    {
      id: 0,
      title: 'Home',
      navigateTo: 'Home',
      icon: require('../../assets/images/home.png'),
    },
    {
      id: 1,
      title: 'Shop by category',
      navigateTo: 'ShopByCategory',
      icon: require('../../assets/images/drawer.png'),
    },
    {
      id: 2,
      title: 'Orders',
      navigateTo: 'Orders',
      icon: require('../../assets/images/orders.png'),
    },
    {
      id: 3,
      title: 'Your Wishlist',
      navigateTo: 'Wishlist',
      icon: require('../../assets/images/wishlist.png'),
    },
    {
      id: 4,
      title: 'Your Account',
      navigateTo: 'Account',
      icon: require('../../assets/images/user.png'),
    },
  ];
  return (
    <View style={responsiveStyle.mainContainer}>
      {/* avatar*/}
      <View style={responsiveStyle.avatarMainContainer}>
        <View style={responsiveStyle.avatarIconContainer}>
          <Text>X</Text>
        </View>
        <View style={responsiveStyle.userContainer}>
          <Text style={{color: '#000', fontFamily: 'Lato-Bold'}}>
            {firstName} {lastName}
          </Text>
          <Text style={{color: '#000'}}>{email}</Text>
        </View>
      </View>
      {/* drawer lists*/}
      <View style={{marginVertical: 20}}>
        {data.map(item => {
          return (
            <TouchableOpacity
              style={responsiveStyle.listContainer}
              onPress={() => navigation.navigate(item.navigateTo)}
              key={item.id}>
              <View style={responsiveStyle.listInnerContainer}>
                <Image source={item.icon} style={responsiveStyle.iconList} />
                <Text
                  style={{
                    color: '#000',
                    fontFamily: 'Lato-Regular',
                    fontSize: 16,
                  }}>
                  {item.title}
                </Text>
              </View>
              <Image
                source={require('../../assets/images/arrow-right.png')}
                style={[
                  responsiveStyle.iconList,
                  {backgroundColor: '#CFE1B9', borderRadius: 35 / 2},
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={responsiveStyle.btnContainer}>
        <Text style={responsiveStyle.btnText} onPress={handleSignOut}>
          Sign Out
        </Text>
      </View>
      <View style={responsiveStyle.supportContainer}>
        <Text style={{fontFamily: 'Lato-Bold', color: '#000', fontSize: 16}}>
          Contact Support
        </Text>
        <Text
          style={{
            fontFamily: 'Lato-Regular',
            color: '#000',
            fontSize: 14,
            marginVertical: 8,
          }}>
          If you face any issues, feel free to contact our 24 hours support
          system.
        </Text>
        <Text style={responsiveStyle.btnSupport}>Contact</Text>
      </View>
    </View>
  );
};

export default CustomDrawer;
