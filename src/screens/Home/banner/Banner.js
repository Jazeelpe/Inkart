import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useContext} from 'react';
import {DimensionContext} from '../../App/App';
import style from './style';

const Banner = () => {
  const [data, setData] = useState([]);
  const responsiveStyle = style(width, height);
  const {width, height} = useContext(DimensionContext);
  useEffect(() => {
    getBannerData();
  }, []);
  const getBannerData = async () => {
    try {
      await firestore()
        .collection('Banners')
        .get()
        .then(snapshot => {
          const results = [];
          if (!snapshot.empty) {
            snapshot.docs.forEach(item => {
              if (item.exists) {
                results.push(item.data());
              }
            });
          }
          setData(results);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({item, index}) => {
          return (
            <ImageBackground
              key={index}
              source={{uri: item.image}}
              style={responsiveStyle.backGroundImg}>
              <View style={responsiveStyle.container}>
                <Text style={responsiveStyle.header}>{item.header}</Text>
                <Text style={responsiveStyle.content}>{item.description}</Text>
                <TouchableOpacity style={responsiveStyle.btn}>
                  <Text style={responsiveStyle.btnText}>Shop Now</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          );
        }}
      />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {data?.map((item, index) => {
          return (
            <Text
              style={{color: '#000', fontSize: 40, marginTop: -35}}
              key={index}>
              .
            </Text>
          );
        })}
      </View>
    </View>
  );
};

export default Banner;
