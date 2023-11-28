import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Modal, ActivityIndicator} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import style from './style';
import {DimensionContext} from '../App/App';
import {useSelector} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
navigator.geolocation = require('@react-native-community/geolocation');
import MapView, {Marker} from 'react-native-maps';
import CustomButton2 from '../../components/customButton2/CustomButton2';
import firestore from '@react-native-firebase/firestore';
import RazorpayCheckout from 'react-native-razorpay';
import Snackbar from 'react-native-snackbar';

const AddAddress = () => {
  const [newPosition, setNewPosition] = useState({});
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const {userId, email, mobile, firstName, lastName} = useSelector(
    store => store.persist,
  );
  const {width, height} = useContext(DimensionContext);
  const responsiveStyle = style(width, height);
  const route = useRoute();
  const navigation = useNavigation();
  const {products, total} = route.params;
  const handleCreateOrder = async paymentId => {
    const smallId = paymentId.slice(4, 12);
    await firestore()
      .collection('Orders')
      .add({
        orderId: String(smallId).toUpperCase(),
        created: Date.now(),
        updated: Date.now(),
        orderStatus: 'Ordered',
        totalAmount: total,
        address: address,
        userId: userId,
        paymentMethod: 'online',
        cartItems: products,
        userName: firstName + ' ' + lastName,
        userEmail: email,
        userPhone: mobile,
        expDelDate: '',
      })
      .then(async res => {
        await firestore()
          .collection('Cart')
          .where('userId', '==', userId)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref
                .delete()
                .then(() => {
                  setLoading(false);
                  navigation.goBack();
                })
                .catch(err => {
                  console.warn(err);
                });
            });
          });
      });
  };
  const handleSubmit = () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_MD5FjAPcLpwrsZ', // Your api key
      amount: (total + 50) * 100,
      name: 'Inkart',
      prefill: {
        email: email,
        contact: mobile,
        name: 'Razorpay Software',
      },
      theme: {color: '#F37254'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        setLoading(true);
        handleCreateOrder(data.razorpay_payment_id);
        // handle success
        //alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        // alert(`Error: ${error.code} | ${error.description}`);
        Snackbar.show({
          text: 'your Order is Failed',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: 'red',
        });
        navigation.goBack();
      });
  };
  const getCurrentLocation = () => {
    Geolocation.getCurrentLocation(info =>
      setNewPosition({
        latitude: info?.coords?.latitude ?? 0,
        longitude: info?.coords?.longitude ?? 0,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }),
    );
  };
  useEffect(() => {
    // getCurrentLocation();
  }, []);

  return (
    <View style={responsiveStyle.mainContainer}>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <ActivityIndicator size={'small'} color={'#fff'} />
        </View>
      </Modal>
      <GooglePlacesAutocomplete
        placeholder="Search Location"
        currentLocation={true}
        fetchDetails={true}
        currentLocationLabel="Current Location"
        query={{
          key: 'AIzaSyBxr99617iBz0j-ao6GzTTl_Kq0TuvZwg4',
          language: 'en',
        }}
        styles={{
          textInput: responsiveStyle.textInput,
          predefinedPlacesDescription: responsiveStyle.description,
        }}
        onPress={(data, details) => {
          const location =
            data?.geometry?.loaction ?? details?.geometry?.location;
          const positionData = {
            latitude: location?.lat ?? 0,
            longitude: location?.lng ?? 0,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          };
          setNewPosition(positionData);
          setAddress(data?.name ?? data?.description);
        }}
      />

      <View>
        {/* <MapView
          style={responsiveStyle.MapView}
          initialRegion={newPosition}
          region={newPosition}
          showsUserLocation={true}
          followsUserLocation={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          scrollEnabled={true}>
          <Marker
            title="you are here"
            description="this is your marker"
            coordinate={newPosition}
          />
        </MapView>
        */}
      </View>
      <CustomButton2 content="proceed" handleSubmit={handleSubmit} />
    </View>
  );
};

export default AddAddress;
