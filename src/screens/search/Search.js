import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import style from './style';
import {DimensionContext} from '../App/App';
import CustomSearchBar from '../../components/customSearchBar/CustomSearchBar';
import OfferSection from '../../components/offerSection/OfferSection';
import OrderDetails from '../cart/orderDetails/OrderDetails';
const Search = () => {
  const {width, height} = useContext(DimensionContext);
  const responsiveStyle = style(width, height);
  const data = useSelector(store => store.category.categories);

  return (
    <View
      style={{
        flexDirection: 'column',
        gap: 40,
        flex: 1,
      }}>
      <CustomSearchBar />
      <ScrollView>
        <View>
          <Text style={responsiveStyle.title}> Trending Category</Text>
          <FlatList
            data={data}
            keyExtractor={(item, index) => String(index)}
            horizontal
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity style={responsiveStyle.flatlisContainer}>
                  <Image
                    source={{uri: item.image}}
                    style={responsiveStyle.icons}
                  />
                  <Text style={responsiveStyle.iconTitle}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <OfferSection />
      </ScrollView>
    </View>
  );
};

export default Search;
