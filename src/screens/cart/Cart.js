import React, {useContext, useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import style from './style';
import {DimensionContext} from '../App/App';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import OrderDetails from './orderDetails/OrderDetails';
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [charges, setCharges] = useState(0);
  const value = useContext(DimensionContext);
  const responsiveStyle = style(value.width, value.height);
  const {userId, email, mobile} = useSelector(store => store.persist);
  const navigation = useNavigation();
  useEffect(() => {
    if (products.length > 0) {
      setCharges(50);
    } else {
      setCharges(0);
    }
  }, [products]);

  const getProducts = async () => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .get()
      .then(snapshot => {
        const results = [];
        let totalAmount = 0;
        if (!snapshot.empty) {
          snapshot.docs.forEach(item => {
            if (item.exists) {
              const amount =
                parseFloat(item.data().price) * parseInt(item.data().quantity);
              totalAmount = totalAmount + amount;
              const responseData = {id: item.id, ...item.data()};
              results.push(responseData);
            }
          });
        }
        setTotal(totalAmount);
        setProducts(results);
      });
  };

  useFocusEffect(
    useCallback(() => {
      getProducts();
    }, []),
  );

  const handleSubmit = () => {
    if (products.length > 0) {
      if (email === '' || mobile === '') {
        navigation.navigate('Account');
      } else {
        navigation.navigate('AddAddress', {products, total: total});
      }
    }
  };

  const updateArray = productInfo => {
    const result = products.filter(x => {
      return x.id !== productInfo.id;
    });
    setTotal(total - parseFloat(productInfo.price));
    setProducts(result);
  };

  const handelTotal = (type, productInfo) => {
    if (type === 'add') {
      setTotal(total + parseFloat(productInfo.price));
    } else {
      setTotal(total - parseFloat(productInfo.price));
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'column', gap: 10}}>
      <FlatList
        data={products}
        extraData={products}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text style={{color: '#000'}}>Cart Empty</Text>
            </View>
          );
        }}
        renderItem={({item, index}) => {
          return (
            <View key={index}>
              <RenderItem
                item={item}
                index={index}
                updateArray={updateArray}
                handelTotal={handelTotal}
              />
            </View>
          );
        }}
        ListFooterComponent={() => {
          if (products.length > 0)
            return (
              <OrderDetails
                total={total}
                charges={charges}
                handelTotal={handelTotal}
                handleSubmit={handleSubmit}
              />
            );
        }}
      />

      {/* offer banner goes hereee */}
      {/* Order Details Component */}
    </View>
  );
};

export default Cart;

const RenderItem = ({item, index, updateArray, handelTotal}) => {
  const [qty, setQty] = useState(item.quantity);
  const value = useContext(DimensionContext);
  const responsiveStyle = style(value.width, value.height);
  const userId = useSelector(store => store.persist.userId);
  const navigation = useNavigation();

  useEffect(() => {
    setQty(item.quantity);
  }, [item]);
  const addToCart = async item => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .where('productId', '==', item.productId)
      .get()
      .then(snapshot => {
        firestore()
          .collection('Cart')
          .doc(snapshot?.docs[0].id)
          .update({
            quantity: parseInt(snapshot?.docs[0].data().quantity, 10) + 1,
          });
        handelTotal('add', item);
      });
  };

  const removeItem = async () => {
    if (qty <= 1) {
      await firestore()
        .collection('Cart')
        .doc(item.id)
        .delete()
        .then(() => {
          updateArray(item);
        });
    } else {
      setQty(qty - 1);
      firestore()
        .collection('Cart')
        .doc(item.id)
        .update({
          quantity: parseInt(item.quantity, 10) - 1,
        });
      handelTotal('minus', item);
    }
  };
  const redirecttoPRoductDetasils = () => {
    navigation.navigate('ProductDetails', {product: item});
  };
  return (
    <TouchableOpacity
      style={responsiveStyle.flatlistConatiner}
      onPress={redirecttoPRoductDetasils}>
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
          <TouchableOpacity style={responsiveStyle.btn1} onPress={removeItem}>
            <Text style={responsiveStyle.btnText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
