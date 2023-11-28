import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {DimensionContext} from '../App/App';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import style from './style';

const Wishlist = () => {
  const [wishItems, setWishItems] = useState([]);
  const {width, height} = useContext(DimensionContext);
  const responsiveStyle = style(width, height);
  const navigation = useNavigation();
  const userId = useSelector(store => store.persist.userId);

  const getWishlist = async () => {
    await firestore()
      .collection('Wishlist')
      .where('userId', '==', userId)
      .get()
      .then(res => {
        if (!res.empty) {
          const objArray = [];
          res.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setWishItems(objArray);
        }
      });
  };

  const addtoCart = async itemToAdd => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .where('productId', '==', itemToAdd.id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firestore().collection('Cart').add({
            created: Date.now(),
            description: itemToAdd.description,
            name: itemToAdd.name,
            price: itemToAdd.price,
            quantity: 1,
            userId: userId,
            productId: itemToAdd.id,
            image: itemToAdd.image,
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

  const removeItem = async itemToRemove => {
    await firestore()
      .collection('Wishlist')
      .doc(itemToRemove.id)
      .delete()
      .then(() => {
        const filteredWishlist = wishItems.filter(ele => {
          return ele.id !== itemToRemove.id;
        });
        setWishItems(filteredWishlist);
      });
  };

  useEffect(() => {
    getWishlist();
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity style={{paddingHorizontal: 8}}>
            <Image
              source={require('../../assets/images/cart.png')}
              style={responsiveStyle.headerIcon}
            />
            <View style={responsiveStyle.headerIconbadge}>
              <Text style={{textAlign: 'center'}}>1</Text>
            </View>
          </TouchableOpacity>
        );
      },
    });
  }, []);
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={wishItems}
      renderItem={({item, index}) => {
        return (
          <View style={responsiveStyle.flatlistConatiner} key={index}>
            <TouchableOpacity
              style={responsiveStyle.cartIconContainer}
              onPress={() => removeItem(item)}>
              <Image
                source={require('../../assets/images/delete.png')}
                style={responsiveStyle.cartIcon}
              />
            </TouchableOpacity>
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
                <Text style={responsiveStyle.price}>₹ {item.price}</Text>
                {/* <Text style={responsiveStyle.off}>40% OFF</Text>*/}
              </View>
            </View>
            <View style={responsiveStyle.btnContainer}>
              <TouchableOpacity
                style={responsiveStyle.btn}
                onPress={() => addtoCart(item)}>
                <Text style={responsiveStyle.btnText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );
};

export default Wishlist;
