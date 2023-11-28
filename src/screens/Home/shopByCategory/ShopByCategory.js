import {useContext, useState, useEffect} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import style from './style';
import {DimensionContext} from '../../App/App';
import {ADD_CATEGORY} from '../../../storage/categorySlice';
import {useNavigation} from '@react-navigation/native';

const ShopByCategory = () => {
  const [data, setData] = useState([]);
  const {width, height} = useContext(DimensionContext);
  const responsiveStyle = style(width, height);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleNavigation = item => {
    navigation.navigate('Shop', {type: item});
  };
  const getCategoryData = async () => {
    try {
      await firestore()
        .collection('Category')
        .get()
        .then(snapshot => {
          const results = [];

          if (!snapshot.empty) {
            snapshot.docs.forEach(item => {
              if (item.exists) {
                const responseData = {id: item.id, ...item.data()};
                results.push(responseData);
              }
            });
          }
          setData(results);
          dispatch(ADD_CATEGORY(results));
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <View>
      <Text style={responsiveStyle.header}>Shop By Category</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              key={index}
              style={responsiveStyle.flatlisContainer}
              onPress={() => handleNavigation(item.name)}>
              <Image source={{uri: item.image}} style={responsiveStyle.icons} />
              <Text style={responsiveStyle.iconTitle}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default ShopByCategory;
