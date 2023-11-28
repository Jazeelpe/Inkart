import React, {useContext, useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {DimensionContext} from '../../screens/App/App';
import {DrawerItem} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import style from './style';
import Snackbar from 'react-native-snackbar';

const OfferSection = () => {
  const [products, setProducts] = useState([]);
  const value = useContext(DimensionContext);
  const responsiveStyle = style(value.width, value.height);
  const navigation = useNavigation();

  const getProducts = async () => {
    await firestore()
      .collection('Products')
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
        setProducts(results);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View style={responsiveStyle.mainContainer}>
      <View style={responsiveStyle.headingContainer}>
        <View>
          <Text style={responsiveStyle.titleText}>Say hello to offers!</Text>
          <Text style={responsiveStyle.subtitleText}>
            Best price ever of all time
          </Text>
        </View>
        <View style={responsiveStyle.seeAll}>
          <Text
            style={responsiveStyle.subtitleText}
            onPress={() => navigation.navigate('Shop', {type: 'all'})}>
            See All
          </Text>
        </View>
      </View>
      <View>
        {products?.map((item, index) => {
          return (
            <View key={index}>
              <RenderItem item={item} index={index} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default OfferSection;

const RenderItem = ({item, index}) => {
  const [qty, setQty] = useState(0);
  const value = useContext(DimensionContext);
  const responsiveStyle = style(value.width, value.height);
  const navigation = useNavigation();
  const userId = useSelector(store => store.persist.userId);

  const addToCart = async item => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .where('productId', '==', item.id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firestore().collection('Cart').add({
            created: Date.now(),
            description: item.description,
            name: item.name,
            price: item.price,
            quantity: 1,
            userId: userId,
            productId: item.id,
            image: item.image,
          });
        } else {
          firestore()
            .collection('Cart')
            .doc(snapshot?.docs[0].id)
            .update({
              quantity: parseInt(snapshot?.docs[0].data().quantity, 10) + 1,
            });
        }
      });
  };

  return (
    <View style={responsiveStyle.flatlistConatiner} key={index}>
      <View>
        <View style={responsiveStyle.iconConatiner}>
          <Image source={{uri: item.image}} style={responsiveStyle.itemImage} />
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
          <Text style={responsiveStyle.price}>₹ {item.price}</Text>
          <Text style={responsiveStyle.off}>30% OFF</Text>
        </View>
        <View style={responsiveStyle.cartContainer}>
          <TouchableOpacity
            style={responsiveStyle.btn1}
            onPress={() => {
              setQty(qty + 1);
              addToCart(item);
            }}>
            <Text style={responsiveStyle.btnText}>+</Text>
          </TouchableOpacity>
          <View>
            <Text style={responsiveStyle.count}>{qty}</Text>
          </View>
          <TouchableOpacity
            style={responsiveStyle.btn1}
            onPress={() => {
              qty !== 0 ? setQty(qty - 1) : 0;
              addToCart(item);
            }}>
            <Text style={responsiveStyle.btnText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
