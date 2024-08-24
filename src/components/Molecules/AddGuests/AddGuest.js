import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {AddGuestStyle} from './AddGuestStyle';
import {_COLORS, IMAGES} from '../../../Themes';
import AddguestsComponent from '../AddguestsComponent/AddguestsComponent';

const AddGuest = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [location, setLocation] = useState('');

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style={AddGuestStyle.maincontainer}>
      <Text style={AddGuestStyle.addgusttext}>Add guests</Text>
      <View style={AddGuestStyle.mainviewinput}>
        <View style={AddGuestStyle.bindview}>
          <TextInput
            placeholderTextColor={_COLORS.Kodie_LightGrayColor}
            value={location}
            onChangeText={setLocation}
            placeholder="Add guests"
          />
          <Image source={IMAGES.userIcons} style={AddGuestStyle.adduserimg} />
        </View>

        <View style={AddGuestStyle.vecentview}>
          <TouchableOpacity onPress={toggleModal}>
            <Image source={IMAGES.chat} style={AddGuestStyle.chatimage} />
            <Text style={AddGuestStyle.chattext}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AddguestsComponent Visible={isVisible} onRequestClose={toggleModal} />
    </View>
  );
};

export default AddGuest;
