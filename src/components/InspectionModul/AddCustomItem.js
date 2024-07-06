import React, {useState} from "react";
import { View,Text,TouchableOpacity, TextInput, Alert } from "react-native";
import RowButtons from "../Molecules/RowButtons/RowButtons";
import AntDesign from 'react-native-vector-icons/AntDesign';

import { BedroomCss } from "../../screens/Inspection/PropertyInspection/Inspection/Bedroom/BedroomCss";
import { _COLORS, LABEL_STYLES } from "../../Themes";
import { Config } from "../../Config";
import axios from "axios";
const AddCustomItems = (props) =>{
    const [name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [futureInspection, setfutureInspection] = useState(false);
    const [futureInspectionId, setfutureInspectionId] = useState(1);
    const Team_Key = props?.Team_Key;
    const PropertyId = props?.PropertyId;
    const AreasKey = props?.AreasKey;
    const Created_Id = props?.Created_Id;
    console.log(Team_Key,PropertyId,AreasKey,Created_Id);
    
    const handleAddItem = async () => {
        // alert('harshita');
        const data = {
          timKey: Team_Key,
          updKey: PropertyId,
          tamAreaKey: AreasKey,
          taimItemName: name,
          taimItemType: "1",
          taimDescription:Description,
          taimFutureInspection: futureInspectionId,
          taimCreatedBy:Created_Id.toString(),
        };
        console.log("CustomItem",data);
    const Url = Config.BASE_URL;
    const CustomItemUrl = Url + 'add/CustomItem'
        try {
          const response = await axios.post( CustomItemUrl,data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          Alert.alert('Success', 'Custom item added successfully');
          console.log('API Response:', response.data);
          props?.onClose()
        } catch (error) {
          Alert.alert('Error', 'Failed to add custom item');
          console.error('Error adding custom item:', error);
        }
      };
    return(
        <View style={BedroomCss.Container}>
        <View style={BedroomCss.ModalContainer}>
          <Text style={BedroomCss.ShareText}>{'Add custom item'}</Text>
          <TouchableOpacity onPress={props?.onClose}>
          <AntDesign
            name="close"
            size={20}
            color={_COLORS.Kodie_BlackColor}
          />
          </TouchableOpacity>
        </View>
        <View style={BedroomCss.inputContainer}>
          <Text style={[LABEL_STYLES._texinputLabel, BedroomCss.cardHeight]}>
            {'Name of item'}
          </Text>
          <TextInput
            style={BedroomCss.emailinput}
            value={name}
            onChangeText={setName}
            placeholder="Create a name for your custom item"
            placeholderTextColor={_COLORS.Kodie_MediumGrayColor}
          />
        </View>
        <View style={BedroomCss.inputContainer}>
          <Text style={[LABEL_STYLES._texinputLabel, BedroomCss.cardHeight]}>
            {'Description of item'}
          </Text>
          <TextInput
            style={BedroomCss.emailinput}
            value={Description}
            onChangeText={setDescription}
            placeholder="Provide a description of the item"
            placeholderTextColor={_COLORS.Kodie_MediumGrayColor}
          />
        </View>
        <Text style={[LABEL_STYLES._texinputLabel, BedroomCss.cardHeight]}>
          {'Make this a standard item for future inspections?'}
        </Text>
        <RowButtons
          LeftButtonText={'Yes'}
          leftButtonbackgroundColor={
            !futureInspection
              ? _COLORS.Kodie_lightGreenColor
              : _COLORS.Kodie_WhiteColor
          }
          LeftButtonTextColor={
            !futureInspection
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_MediumGrayColor
          }
          LeftButtonborderColor={
            !futureInspection
              ? _COLORS.Kodie_GrayColor
              : _COLORS.Kodie_LightWhiteColor
          }
          RightButtonText={'No'}
          RightButtonbackgroundColor={
            futureInspection
              ? _COLORS.Kodie_lightGreenColor
              : _COLORS.Kodie_WhiteColor
          }
          RightButtonTextColor={
            futureInspection
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_MediumGrayColor
          }
          RightButtonborderColor={
            futureInspection
              ? _COLORS.Kodie_GrayColor
              : _COLORS.Kodie_LightWhiteColor
          } onPressLeftButton={()=>{
            setfutureInspectionId(1);
            setfutureInspection(false);
           
          }}
          onPressRightButton={()=>{
            setfutureInspectionId(2);
            setfutureInspection(true);
          }}
        />

        <View style={BedroomCss.ButtonView}>
          <TouchableOpacity style={BedroomCss.cancelView}>
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