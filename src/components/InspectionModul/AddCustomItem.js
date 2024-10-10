import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import RowButtons from "../Molecules/RowButtons/RowButtons";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BedroomCss } from "../../screens/Inspection/PropertyInspection/Inspection/Bedroom/BedroomCss";
import { _COLORS, LABEL_STYLES } from "../../Themes";
import { Config } from "../../Config";
import axiosInstance from "../../services/axiosInstance";

const AddCustomItems = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [futureInspection, setFutureInspection] = useState(false);
  const [futureInspectionId, setFutureInspectionId] = useState(1);
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const Team_Key = props?.Team_Key;
  const PropertyId = props?.PropertyId;
  const AreasKey = props?.AreasKey;
  const Created_Id = props?.Created_Id;

  const handleAddItem = async () => {
    setNameError('');
    setDescriptionError('');

    // Validate input
    if (!name.trim()) {
      setNameError('Name of item is required');
      return;
    } else if (!description.trim()) {
      setDescriptionError('Description of item is required');
      return;
    }

    const data = {
      timKey: Team_Key,
      updKey: PropertyId,
      tamAreaKey: AreasKey,
      taimItemName: name,
      taimItemType: "1",
      taimDescription: description,
      taimFutureInspection: futureInspectionId,
      taimCreatedBy: Created_Id.toString(),
    };
    const CustomItemUrl ='add/CustomItem';

    try {
      await axiosInstance.post(CustomItemUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      Alert.alert('Success', 'Custom item added successfully');
      // Clear inputs
      setName('');
      setDescription('');
      setFutureInspectionId(1);
      props?.onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to add custom item');
      console.error('Error adding custom item:', error);
    }
  };

  return (
    <View style={BedroomCss.Container}>
      <View style={BedroomCss.ModalContainer}>
        <Text style={BedroomCss.ShareText}>{'Add custom item'}</Text>
        <TouchableOpacity onPress={props?.onClose}>
          <AntDesign name="close" size={20} color={_COLORS.Kodie_BlackColor} />
        </TouchableOpacity>
      </View>
      <View style={BedroomCss.inputContainer}>
        <Text style={[LABEL_STYLES._texinputLabel, BedroomCss.cardHeight]}>
          {'Name of item'}
          <Text style={{ color: _COLORS?.Kodie_redColor }}>*</Text>
        </Text>
        <TextInput
          style={[BedroomCss.emailinput, {
            borderColor: nameError ? _COLORS?.Kodie_redColor : _COLORS?.Kodie_GrayColor
          }]}
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (text.trim()) {
              setNameError('');
            }
          }}
          placeholder="Create a name for your custom item"
          placeholderTextColor={_COLORS.Kodie_MediumGrayColor}
        />
        {nameError && <Text style={{ color: 'red', marginTop: 5 }}>{nameError}</Text>}
      </View>
      <View style={BedroomCss.inputContainer}>
        <Text style={[LABEL_STYLES._texinputLabel, BedroomCss.cardHeight]}>
          {'Description of item'}
          <Text style={{ color: _COLORS?.Kodie_redColor }}>*</Text>
        </Text>
        <TextInput
          style={[BedroomCss.emailinput, {
            borderColor: descriptionError ? _COLORS?.Kodie_redColor : _COLORS?.Kodie_GrayColor
          }]}
          value={description}
          maxLength={200} // Add character limit
          onChangeText={(text) => {
            setDescription(text);
            if (text.trim()) {
              setDescriptionError('');
            }
          }}
          placeholder="Provide a description of the item"
          placeholderTextColor={_COLORS.Kodie_MediumGrayColor}
        />
        {descriptionError && <Text style={{ color: 'red', marginTop: 5 }}>{descriptionError}</Text>}
      </View>
      <Text style={[LABEL_STYLES._texinputLabel, BedroomCss.cardHeight]}>
        {'Make this a standard item for future inspections?'}
      </Text>
      <RowButtons
        LeftButtonText={'Yes'}
        leftButtonbackgroundColor={!futureInspection ? _COLORS.Kodie_lightGreenColor : _COLORS.Kodie_WhiteColor}
        LeftButtonTextColor={!futureInspection ? _COLORS.Kodie_BlackColor : _COLORS.Kodie_MediumGrayColor}
        LeftButtonborderColor={!futureInspection ? _COLORS.Kodie_GrayColor : _COLORS.Kodie_LightWhiteColor}
        RightButtonText={'No'}
        RightButtonbackgroundColor={futureInspection ? _COLORS.Kodie_lightGreenColor : _COLORS.Kodie_WhiteColor}
        RightButtonTextColor={futureInspection ? _COLORS.Kodie_BlackColor : _COLORS.Kodie_MediumGrayColor}
        RightButtonborderColor={futureInspection ? _COLORS.Kodie_GrayColor : _COLORS.Kodie_LightWhiteColor}
        onPressLeftButton={() => {
          setFutureInspectionId(1);
          setFutureInspection(false);
        }}
        onPressRightButton={() => {
          setFutureInspectionId(2);
          setFutureInspection(true);
        }}
      />

      <View style={BedroomCss.ButtonView}>
        <TouchableOpacity style={BedroomCss.cancelView} onPress={props?.onClose}>
          <Text style={[BedroomCss.cancelText]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={BedroomCss.SaveView} onPress={handleAddItem}>
          <Text style={BedroomCss.DoneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AddCustomItems;
