import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from './style';
import {DimensionContext} from '../App/App';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import DropDown from './dropDown/DropDown';
import ProductReview from './productReview/ProductReview';
import Delivery from './delivery/Delivery';
import NewAdded from '../Home/newAdd/NewAdded';
const ProductDetails = () => {
  const [qty, setQty] = useState(0);
  const [showDetails1, setShowDetails1] = useState(false);
  const [showDetails2, setShowDetails2] = useState(false);
  const [showDetails3, setShowDetails3] = useState(false);
  const userId = useSelector(store => store.persist.userId);
  const scrollToTop = useRef();
  const route = useRoute();
  const {product} = route.params;
  const {width, height} = useContext(DimensionContext);
  const handleQty = type => {
    if (type === 'plus') {
      setQty(qty + 1);
    } else {
      if (qty !== 0) setQty(qty - 1);
    }
  };
  const handleShare = async () => {
    const result = await Share.share({
      message: 'Share Product',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  };
  const handleScrolltoTop = () => {
    scrollToTop.current.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const handleDropDown = () => {
    setShowDetails1(!showDetails1);
    setShowDetails2(!showDetails2);
    setShowDetails3(!showDetails3);
  };

  const navigation = useNavigation();
  const responsiveStyle = style(width, height);
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={handleShare}
            style={responsiveStyle.shareIconContainer}>
            <AntDesign name="sharealt" size={30} color="#000" />
          </TouchableOpacity>
        );
      },
    });
  }, []);

  const handleAddtoCart = async () => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .where('productId', '==', product.id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firestore().collection('Cart').add({
            created: Date.now(),
            description: product.description,
            name: product.name,
            price: product.price,
            quantity: qty,
            userId: userId,
            productId: product.id,
            image: product.image,
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
    <View>
      <View style={responsiveStyle.fixedContainer}>
        <View style={responsiveStyle.btnContainer}>
          <TouchableOpacity onPress={() => handleQty('plus')}>
            <AntDesign name="pluscircleo" size={30} color="#000" />
          </TouchableOpacity>

          <Text style={{fontSize: 18}}>{qty}</Text>
          <TouchableOpacity onPress={() => handleQty('minus')}>
            <AntDesign name="minuscircleo" size={30} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 20, color: '#FFF'}} onPress={handleAddtoCart}>
          Add to Cart
        </Text>
      </View>
      <ScrollView style={{marginBottom: 85}} ref={scrollToTop}>
        <View style={responsiveStyle.imageContainer}>
          <Image source={{uri: product.image}} style={responsiveStyle.image} />
        </View>
        <View style={responsiveStyle.firstContainer}>
          <Text style={responsiveStyle.headerText}>{product.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <AntDesign name="staro" size={30} color="#000" />
            <AntDesign name="staro" size={30} color="#000" />
            <AntDesign name="staro" size={30} color="#000" />
          </View>
          <View style={responsiveStyle.ProductDetailsContainer}>
            <Text style={responsiveStyle.headerText}>Product Details</Text>
            <Text style={responsiveStyle.description}>
              {product.description}
            </Text>
          </View>
          <DropDown
            heading="Manufacturer Details"
            showDetails={showDetails1}
            handleDropDown={() => {
              setShowDetails1(!showDetails1);
              setShowDetails2(false);
              setShowDetails3(false);
            }}
            description={product.description}
          />
          <DropDown
            heading="Product Disclaimer"
            showDetails={showDetails2}
            handleDropDown={() => {
              setShowDetails2(!showDetails2);
              setShowDetails1(false);
              setShowDetails3(false);
            }}
            description={product.description}
          />
          <DropDown
            heading="Features & Details"
            showDetails={showDetails3}
            handleDropDown={() => {
              setShowDetails3(!showDetails3);
              setShowDetails1(false);
              setShowDetails2(false);
            }}
            description={product.description}
          />
          <ProductReview product={product} />
          <Delivery />
        </View>
        <NewAdded handleScrolltoTop={handleScrolltoTop} />
      </ScrollView>
    </View>
  );
};

export default ProductDetails;
