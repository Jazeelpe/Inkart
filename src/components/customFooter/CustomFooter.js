import {useContext} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import style from './style';
import {DimensionContext} from '../../screens/App/App';

const CustomFooter = ({state, descriptors, navigation}) => {
  const value = useContext(DimensionContext);
  const responsiveStyle = style(value.width, value.height);

  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <View style={responsiveStyle.container}>
        {state.routes.map((item, index) => {
          const isFocused = state.index === index;
          const icon =
            item.name === 'Home'
              ? require('../../assets/images/home-white.png')
              : item.name === 'Category'
              ? require('../../assets/images/category-white.png')
              : item.name === 'Search'
              ? require('../../assets/images/search-white.png')
              : item.name === 'Offers'
              ? require('../../assets/images/offers-white.png')
              : require('../../assets/images/cart-white.png');
          return (
            <TouchableOpacity
              style={responsiveStyle.subContainer}
              key={item.key}
              onPress={() => navigation.navigate(item.name)}>
              <Image source={icon} style={responsiveStyle.icons} />
              <Text style={{color: isFocused ? '#000' : '#fff'}}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomFooter;
