import {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useContext} from 'react';
import {DimensionContext} from '../../App/App';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import style from './style';

const NewAdded = ({handleScrolltoTop}) => {
  const [data, setData] = useState([]);
  const {width, height} = useContext(DimensionContext);
  const responsiveStyle = style(width, height);
  const navigation = useNavigation();
  const route = useRoute();
  const userId = useSelector(store => store.persist.userId);
  const wishIds = useSelector(store => store.persist.wishIds);
  const handleProductDetails = item => {
    navigation.navigate('ProductDetails', {product: item});
    if (route.name === 'ProductDetails') {
      handleScrolltoTop();
    }
  };

  const getAddedData = async () => {
    try {
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
          setData(results);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAddedData();
  }, []);

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

  const addtoWishlist = ProductDetails => {
    firestore()
      .collection('Wishlist')
      .where('userId', '==', userId)
      .where('productId', '==', ProductDetails.id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firestore().collection('Wishlist').add({
            created: Date.now(),
            updated: Date.now(),
            description: ProductDetails.description,
            name: ProductDetails.name,
            price: ProductDetails.price,
            userId: userId,
            image: ProductDetails.image,
            categoryId: ProductDetails.categoryId,
            productId: ProductDetails.id,
          });
        }
      });
  };

  return (
    <View>
      {/* Heading container */}
      <View style={responsiveStyle.headingContainer}>
        <View>
          <Text style={responsiveStyle.titleText}>Newly Added</Text>
          <Text style={responsiveStyle.subtitleText}>Pay less, Get more</Text>
        </View>
        <View>
          <Text
            style={responsiveStyle.subtitleText}
            onPress={() => navigation.navigate('Shop', {type: 'all'})}>
            See All
          </Text>
        </View>
      </View>
      {/* flatlist */}
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              key={index}
              style={responsiveStyle.flatlistConatiner}
              onPress={() => handleProductDetails(item)}>
              <View style={responsiveStyle.iconConatiner}>
                <TouchableOpacity
                  onPress={() => addtoWishlist(item)}
                  style={responsiveStyle.wishlist}>
                  <Image
                    source={
                      wishIds?.includes(item.id)
                        ? require('../../../assets/images/whishRed.png')
                        : require('../../../assets/images/wishlist.png')
                    }
                    style={responsiveStyle.wishlist}
                  />
                </TouchableOpacity>
                <Image
                  source={{uri: item.image}}
                  style={responsiveStyle.itemImage}
                />
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
                <Text style={responsiveStyle.subtitleText}>₹ {item.price}</Text>
              </View>
              <View style={responsiveStyle.btnContainer}>
                <TouchableOpacity
                  style={responsiveStyle.btn}
                  onPress={() => addToCart(item)}>
                  <Text style={responsiveStyle.btnText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default NewAdded;

{
  /*
const added_Data = [
    {
      id: 0,
      title: 'Computer Chair',
      description: 'Comfortable chair',
      price: '2000.00',
      image: require('../../../assets/images/phone.png'),
    },
    {
      id: 1,
      title: 'Space Craft Wooden Desktop',
      description: 'Comfortable wooden desktop',
      price: '12000.00',
      image: require('../../../assets/images/phone.png'),
    },
    {
      id: 2,
      title: 'Sony Bravia',
      description: 'LED TV',
      price: '50000.00',
      image: require('../../../assets/images/phone.png'),
    },
    {
      id: 3,
      title: 'Apple',
      description: 'Fresh Apple',
      price: '200.00',
      image: require('../../../assets/images/phone.png'),
    },
    {
      id: 4,
      title: 'Samsung S23 Ultra',
      description: 'Mobile Phone',
      price: '120000',
      image: require('../../../assets/images/phone.png'),
    },
    {
      id: 5,
      title: 'Strawberry',
      description: 'Fresh Fruit',
      price: '250.00',
      image: require('../../../assets/images/phone.png'),
    },
  ];


*/
}
