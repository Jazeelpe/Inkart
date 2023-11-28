import React, {useState, useEffect} from 'react';
import {enableLatestRenderer} from 'react-native-maps';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler';
import {useWindowDimensions} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import LoginPhone from '../LoginPhone/LoginPhone';
import Home from '../Home/Home';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Categories from '../categories/Categories';
import Search from '../search/Search';
import Offer from '../offer/Offer';
import Cart from '../cart/Cart';
import CustomDrawer from '../../components/customDrawer/CustomDrawer';
import CustomFooter from '../../components/customFooter/CustomFooter';
import Orders from '../orders/Orders';
import Wishlist from '../wishlist/Wishlist';
import Account from '../account/Account';
import {Provider, useSelector} from 'react-redux';
import {store} from '../../storage/store';
import SplashScreen from '../splashScreen/SplashScreen';
import Shop from '../shop/Shop';
import ProductDetails from '../productsDetails/ProductDetails';
import Review from '../review/Review';
import AddAddress from '../addAddress/AddAddress';
import PaidOrderDetails from '../paidOrderDetails/PaidOrderDetails';
const Footer = createBottomTabNavigator();

const FooterNav = () => {
  const navigation = useNavigation();
  return (
    <Footer.Navigator
      screenOptions={{
        headerLeft: () => {
          return (
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', padding: 15}}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/images/left-arrow.png')}
                style={{width: 25, height: 25, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          );
        },
      }}
      tabBar={props => <CustomFooter {...props} />}>
      <Footer.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Footer.Screen name="Category" component={Categories} />
      <Footer.Screen name="Search" component={Search} />
      <Footer.Screen name="Offers" component={Offer} />
      <Footer.Screen name="Cart" component={Cart} />
    </Footer.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerLeft: () => {
          return (
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', padding: 15}}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/images/left-arrow.png')}
                style={{width: 25, height: 25, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          );
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="FooterNav"
        component={FooterNav}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="ShopByCategory" component={Categories} />
      <Drawer.Screen name="Orders" component={Orders} />
      <Drawer.Screen name="Wishlist" component={Wishlist} />
      <Drawer.Screen
        name="Account"
        component={Account}
        options={{headerTitle: 'Profile'}}
      />
      <Drawer.Screen name="Shop" component={Shop} />
      <Drawer.Screen name="ProductDetails" component={ProductDetails} />
      <Drawer.Screen name="Review" component={Review} />
      <Drawer.Screen name="AddAddress" component={AddAddress} />
      <Drawer.Screen name="PaidOrderDetails" component={PaidOrderDetails} />
    </Drawer.Navigator>
  );
};

const Stack = createNativeStackNavigator();

export const DimensionContext = React.createContext();
const AppNavigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const isLoggedIn = useSelector(state => state.persist.isLoggedIn);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <DimensionContext.Provider value={{width, height}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {isLoggedIn ? (
            <Stack.Screen name="AppDrawer" component={AppDrawer} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="LoginPhone" component={LoginPhone} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </DimensionContext.Provider>
  );
};
const App = () => {
  useEffect(() => {
    enableLatestRenderer();
  }, []);
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};
export default App;
