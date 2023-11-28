import {View, TextInput, Image} from 'react-native';
import {useContext} from 'react';
import {DimensionContext} from '../../screens/App/App';
import style from './style';
const CustomSearchBar = ({filter, onChangeText}) => {
  const {width, height} = useContext(DimensionContext);
  const responsiveStyle = style(width, height);
  return (
    <View style={responsiveStyle.container}>
      <View style={responsiveStyle.searchContainer}>
        <Image
          source={require('../../assets/images/search.png')}
          style={responsiveStyle.icons}
        />
        <TextInput
          style={{flex: 1, color: '#000', fontSize: 18}}
          selectionColor={'#000'}
          placeholder="Search"
          placeholderTextColor={'#45474B'}
          onChangeText={onChangeText}
        />

        <Image
          source={require('../../assets/images/voice.png')}
          style={responsiveStyle.icons}
        />
      </View>
    </View>
  );
};
export default CustomSearchBar;
