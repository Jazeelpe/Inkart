import React, {useContext, useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import CustomSearchBar from '../../components/customSearchBar/CustomSearchBar';
import {DimensionContext} from '../App/App';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import style from './style';

const Orders = () => {
  const {width, height} = useContext(DimensionContext);
  const responsiveStyle = style(width, height);
  const [ordersArray, setOrdersArray] = useState([]);
  const userId = useSelector(store => store.persist.userId);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const navigateToDetails = item => {
    navigation.navigate('PaidOrderDetails', {item: item});
  };
  useEffect(() => {
    if (isFocused) {
      getOrders();
    }
  }, [isFocused]);

  const getOrders = async () => {
    await firestore()
      .collection('Orders')
      .where('userId', '==', userId)
      .get()
      .then(res => {
        if (res.empty) {
          setOrdersArray([]);
        } else {
          const objArray = [];
          res?.docs.forEach(document => {
            if (document.exists) {
              const result = {id: document.id, ...document.data()};
              objArray.push(result);
            }
          });
          setOrdersArray(objArray);
        }
      });
  };

  const handleSearch = async text => {
    await firestore()
      .collection('Orders')
      .where('userId', '==', userId)
      .orderBy('orderId')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          setOrdersArray([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            if (document.exists) {
              const result = {id: document.id, ...document.data()};
              objArray.push(result);
            }
          });
          setOrdersArray(objArray);
        }
      });
  };

  return (
    <View style={{marginBottom: 40}}>
      <View style={responsiveStyle.searchContainer}>
        <View style={{flex: 5}}>
          <CustomSearchBar filter={true} onChangeText={handleSearch} />
        </View>
        <View style={{flex: 1, paddingTop: 7}}>
          <Text style={responsiveStyle.filter}>Filter</Text>
        </View>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={ordersArray}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={responsiveStyle.orderContainerMain}
              key={index}
              onPress={() => navigateToDetails(item)}>
              <View style={responsiveStyle.orderContainer}>
                {/* 1 */}
                <View style={responsiveStyle.subContainer}>
                  <Text style={responsiveStyle.title}>ID:{item.orderId}</Text>
                  <Text style={[responsiveStyle.subTitle, {color: 'green'}]}>
                    Ordered on: {item.created}
                  </Text>
                  <Text style={responsiveStyle.subTitle}>{item.address}</Text>
                  <View style={{flexDirection: 'row', gap: 2}}>
                    <Text style={[responsiveStyle.subTitle, {color: 'green'}]}>
                      Paid:{item.totalAmount},
                    </Text>
                    <Text style={responsiveStyle.subTitle}>
                      Items:{item.cartItems.length}
                    </Text>
                  </View>
                </View>
                {/* 2 */}
                <View style={responsiveStyle.subContainer}>
                  <Image
                    source={require('../../assets/images/map.webp')}
                    style={responsiveStyle.img}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 8,
                }}>
                <Text style={responsiveStyle.subTitle}>Order Shipped</Text>
                <Text style={responsiveStyle.subTitle}>Rate & Review</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* order box */}
    </View>
  );
};

export default Orders;
