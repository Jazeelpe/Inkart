import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import CustomSearchBar from '../../components/customSearchBar/CustomSearchBar';
import {DimensionContext} from '../App/App';
import style from './style';
import {useNavigation, useRoute} from '@react-navigation/native';

const Shop = () => {
  const [products, setProducts] = useState('');
  const {width, height} = useContext(DimensionContext);
  const responsiveStyle = style(width, height);
  const categories = useSelector(store => store.category.categories);
  const navigation = useNavigation();
  const route = useRoute();
  const {type} = route.params;
 // console.warn(type);
  const [selectedCategory, setSelectedCategory] = useState(type);
  const handleProductRoute = item => {
    navigation.navigate('ProductDetails', {product: item});
  };
  const handleCategory = async item => {
    setSelectedCategory(item.name);
    await firestore()
      .collection('Products')
      .where('categoryId', '==', item.id)
      .get()
      .then(snapshot => {
        const results = [];
        snapshot.docs.forEach((item, index) => {
          results.push(item.data());
        });
        setProducts(results);
      });
  };
  const getProductsData = async () => {
    await firestore()
      .collection('Products')
      .get()
      .then(snapshot => {
        const results = [];
        snapshot.docs.forEach((item, index) => {
          results.push(item.data());
        });
        setProducts(results);
      });
  };
  useEffect(() => {
    getProductsData();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      title: selectedCategory === 'all' ? 'Shop' : selectedCategory,
    });
  }, [selectedCategory]);

  return (
    <View style={responsiveStyle.Conatiner}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={responsiveStyle.flatlistContainer}
              onPress={() => handleCategory(item)}>
              <Text style={responsiveStyle.text}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
      {/* filter searchBAr */}
      <View style={responsiveStyle.searchContainer}>
        <View style={{flex: 5}}>
          <CustomSearchBar />
        </View>
        <View style={{flex: 1, paddingTop: 7}}>
          <Text style={responsiveStyle.filter}>Filter</Text>
        </View>
      </View>
      {/* product lists */}
      <FlatList
        ListEmptyComponent={() => {
          return <Text style={{color: '#000'}}>Empty</Text>;
        }}
        data={products}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={responsiveStyle.flatlistConatiner1}
              onPress={() => handleProductRoute(item)}>
              <View>
                <View style={responsiveStyle.iconConatiner}>
                  <Image
                    source={{uri: item.image}}
                    style={responsiveStyle.itemImage}
                  />
                </View>
              </View>
              <View style={responsiveStyle.textConatiner}>
                <Text style={responsiveStyle.titleText} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text
                  style={[
                    responsiveStyle.subtitleText,
                    {marginTop: 3, marginBottom: 3},
                  ]}
                  numberOfLines={1}>
                  {item.description}
                </Text>
                <View style={responsiveStyle.offerContainer}>
                  <Text style={responsiveStyle.price}>{item.price}</Text>
                  <Text style={responsiveStyle.off}>40% OFF</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Shop;
