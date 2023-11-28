import React, {useContext, useEffect, useRef} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {DimensionContext} from '../App/App';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Header from '../../components/header/Header';
import CustomSearchBar from '../../components/customSearchBar/CustomSearchBar';
import CustomTextInput from '../../components/customTextInput/CustomTextInput';
import Banner from './banner/Banner';
import ShopByCategory from './shopByCategory/ShopByCategory';
import NewAdded from './newAdd/NewAdded';
import OfferSection from '../../components/offerSection/OfferSection';
import style from './style';
import {UPDATEWISHIDS} from '../../storage/userSlice';
import {useIsFocused} from '@react-navigation/native';

const Home = () => {
  const value = useContext(DimensionContext);
  const responsiveStyle = style(value.width, value.height);
  const userId = useSelector(store => store.persist.userId);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      scrollRef.current.scrollTo({y: 0, animated: true});
      getWishIds();
    }
  }, [isFocused]);

 

  const getWishIds = async () => {
    await firestore()
      .collection('Wishlist')
      .where('userId', '==', userId)
      .get()
      .then(res => {
        if (!res.empty) {
          const idArray = [];
          res.docs.forEach(document => {
            idArray.push(document?.data().productId);
          });
          // setWishItems(objArray);
          dispatch(UPDATEWISHIDS(idArray));
        }
      });
  };

  return (
    <View style={{flex: 1}}>
      <Header />
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        ref={scrollRef}>
        <CustomSearchBar />
        <Banner />
        <ShopByCategory />
        <NewAdded />
        <OfferSection />
      </ScrollView>
    </View>
  );
};

export default Home;
