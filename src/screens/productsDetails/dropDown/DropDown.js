import React, {useEffect, useContext, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DimensionContext} from '../../App/App';
import style from './style';
const DropDown = ({heading, description, showDetails, handleDropDown}) => {
  const responsiveStyle = style(width, height);
  const {width, height} = useContext(DimensionContext);
  return (
    <View>
      <TouchableOpacity
        style={responsiveStyle.ProductDetailsContainer}
        onPress={handleDropDown}>
        <View style={responsiveStyle.dropDownContainer}>
          <Text style={responsiveStyle.headerText}>{heading}</Text>
          {showDetails ? (
            <AntDesign name="up" size={20} color="#000" />
          ) : (
            <AntDesign name="down" size={20} color="#000" />
          )}
        </View>
        {showDetails ? (
          <Text style={responsiveStyle.description}>{description}</Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default DropDown;
