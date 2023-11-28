import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import style from './style';
import {DimensionContext} from '../App/App';

const Categories = () => {
  const [active, setActive] = useState(0);
  const [product, setProduct] = useState('');
  const {width, height} = useContext(DimensionContext);
  const responsiveStyle = style(width, height);
  const data = useSelector(store => store.category.categories);
  const handleCategory = index => {
    setActive(index);
  };
  useEffect(() => {
    addProductsData();
  }, []);
  const addProductsData = async () => {
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
          setProduct(results);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      {/* sidebar */}
      <View style={responsiveStyle.TabContainer}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => String(index)}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={responsiveStyle.sidebarContainer}
                onPress={() => handleCategory(index)}>
                <Image
                  source={{uri: item?.image}}
                  style={responsiveStyle.icon}
                />
                <Text
                  style={[
                    responsiveStyle.txt,
                    {color: index === active ? 'green' : '#000'},
                  ]}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {/*//////////*/}
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'column'}}>
          <ImageBackground
            source={require('../../assets/images/home1bg.jpg')}
            style={responsiveStyle.bannerimg}>
            <Text style={responsiveStyle.nametxt}>{data[active]?.name}</Text>
            <Text style={responsiveStyle.dectxt}>
              {data[active]?.description}
            </Text>
          </ImageBackground>
        </View>
        {/* products flatlist.... */}
        <FlatList
          data={product}
          renderItem={({item, index}) => {
            return (
              <View
                key={index}
                style={{
                  margin: 15,
                  borderWidth: 1,
                  borderColor: '#000',
                }}>
                <Image
                  source={{uri: item.image}}
                  style={{width: 60, height: 60, resizeMode: 'contain'}}
                />
                <Text style={{color: '#000'}}>{item.name}</Text>
                <Text style={{color: '#000'}}>{item.price} Rs</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Categories;
