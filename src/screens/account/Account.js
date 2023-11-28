import React, {useState, useContext} from 'react';
import {View, Text, Image, TouchableOpacity, Modal} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import style from './style';
import {DimensionContext} from '../App/App';
import CustomTextInput from '../../components/customTextInput/CustomTextInput';
import CustomButton2 from '../../components/customButton2/CustomButton2';
import Snackbar from 'react-native-snackbar';
import {UPDATE} from '../../storage/userSlice';
import {handleProfileImage} from './contoller';

const Account = () => {
  const {firstName, lastName, email, mobile, userId, profileimage} =
    useSelector(store => store.persist);
  const dispatch = useDispatch();
  const [fName, setFname] = useState(firstName);
  const [lName, setLname] = useState(lastName);
  const [emailData, setEmailData] = useState(email);
  const [phone, setPhone] = useState(mobile);
  const [proPic, setProPic] = useState(profileimage);
  const [isVisible, setIsVisible] = useState(false);
  const {width, height} = useContext(DimensionContext);
  const responsiveStyle = style(width, height);
  const handleSubmit = async () => {
    if (
      fName.trim() !== '' &&
      lName.trim() !== '' &&
      emailData.trim() !== '' &&
      phone.trim() !== ''
    ) {
      let imgURL = '';
      if (proPic !== '') {
        imgURL = await handleProfileImage(proPic);
      }
      await firestore()
        .collection('users')
        .doc(userId)
        .update({
          firstName: fName,
          lastName: lName,
          email: emailData,
          mobile: phone,
          profileimage: imgURL,
        })
        .then(() => {
          dispatch(
            UPDATE({
              firstName: fName,
              lastName: lName,
              email: emailData,
              mobile: phone,
              profileimage: '',
            }),
          );
          Snackbar.show({
            text: 'Successful',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'green',
          });
        });
    }
  };
  const handleProfileImageGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
    setIsVisible(false);
  };

  const handleProfileImageCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
    setIsVisible(false);
  };

  return (
    <View style={{flex: 1}}>
      <Text style={responsiveStyle.profileName}>Hi {firstName}</Text>
      {/* dp container */}
      <View style={responsiveStyle.propicContainer}>
        <Image
          source={
            proPic === ''
              ? profileimage === ''
                ? require('../../assets/images/profile-pic.png')
                : {uri: profileimage}
              : {uri: proPic}
          }
          style={responsiveStyle.propic}
        />
        <TouchableOpacity
          style={responsiveStyle.editContainer}
          onPress={() => setIsVisible(true)}>
          <Image
            source={require('../../assets/images/edit-green.png')}
            style={responsiveStyle.editIcon}
          />
        </TouchableOpacity>
      </View>
      {/* input field container */}
      <View style={responsiveStyle.inputContainer}>
        <CustomTextInput
          value={fName}
          placeHolder="First Name"
          handleText={text => setFname(text)}
        />
        <CustomTextInput
          value={lName}
          placeHolder="Last Name"
          handleText={text => setLname(text)}
        />
        <CustomTextInput
          value={emailData}
          type="email"
          placeHolder="Email"
          handleText={text => setEmailData(text)}
        />
        <CustomTextInput
          value={phone}
          type="phone"
          placeHolder="Phone Number"
          handleText={text => setPhone(text)}
        />
      </View>
      {/* submit button */}
      <View style={responsiveStyle.btn}>
        <CustomButton2
          content="Update your Profile"
          handleSubmit={handleSubmit}
        />
      </View>
      <Modal
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        transparent={true}>
        <View style={responsiveStyle.modalView}>
          <View style={responsiveStyle.modalSubContainer}>
            <TouchableOpacity
              style={responsiveStyle.btnConatiner}
              onPress={handleProfileImageGallery}>
              <Text style={{color: '#fff'}}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={responsiveStyle.btnConatiner}
              onPress={handleProfileImageCamera}>
              <Text style={{color: '#fff'}}>Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Account;
