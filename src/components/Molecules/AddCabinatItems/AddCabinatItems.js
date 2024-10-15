import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { BedroomCss } from '../../../screens/Inspection/PropertyInspection/Inspection/Bedroom/BedroomCss';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { LABEL_STYLES, _COLORS } from '../../../Themes';
import { Dropdown } from 'react-native-element-dropdown';
import UploadImageBoxes from '../UploadImageBoxes/UploadImageBoxes';
import RBSheet from 'react-native-raw-bottom-sheet';
import UploadCabinateImage from './UploadCabinateImage';
import { SignupLookupDetails } from '../../../APIs/AllApi';
import { useSelector } from 'react-redux';
import { Config } from '../../../Config';
import { set } from 'lodash';
import { CommonLoader } from '../ActiveLoader/ActiveLoader';
import { fontSize } from '../../../Themes/FontStyle/FontStyle';
import { useFocusEffect } from '@react-navigation/native';
import axiosInstance from '../../../services/axiosInstance';

const data = [
  { label: 'Good', value: '1' },
  { label: 'Ok', value: '2' },
  { label: 'Bad', value: '3' },
  { label: 'Damaged', value: '4' },
  { label: 'Urgent repair', value: '5' },
  { label: 'Not usable', value: '6' },
];

const AddCabinatItems = (props) => {
  const { ItemName,Tim_Key,PropertyId,TAIM_ITEM_KEY,Created_Id ,AreasKey} = props;
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckId, setIscheckId] = useState(0);
  const [statusData, setStatusData] = useState([]);
  const [statusDataValue, setStatusDataValue] = useState([]);
  const [comment, setComment] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [CabinateDetail, setCabinateDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

console.log(isCheckId);
  const refRBSheet = useRef();
  useFocusEffect(
    useCallback(() => {
      handle_Status(); // Call handle_Status when the screen is focused
      getCabinate();   // Call getCabinate when the screen is focused
    }, []) // Dependency array can be adjusted if needed
  );
useEffect(() => {
  setIsChecked(isCheckId === 1);
}, [isCheckId]);
const CreateCabinate = async () => {
  // Check if images are selected
  if (selectedImages.length === 0) {
    setImageError(true);
    return; // Early exit if no images
  } if (selectedImages.length > 4) {
    alert('You can upload a maximum of 4 images.'); // Show an alert for exceeding the limit
    return; // Exit early if the limit is exceeded
  }

  // Initialize FormData
  const formData = new FormData();
  formData.append('created_by', Created_Id);
  formData.append('TIM_Key', Tim_Key);
  formData.append('inspected_items', isCheckId);
  formData.append('timc_status', statusDataValue);
  formData.append('comments', comment);
  formData.append('TIIM_key', TAIM_ITEM_KEY);
  formData.append('upd_key', PropertyId);
  formData.append('uad_key', Created_Id);
  formData.append('TAM_AREA_KEY', AreasKey);

  selectedImages.forEach(file => {
    // Check if the file has valid path and mime type
    if (file.path && file.mime) {
      const fileName = file.filename || file.path.split('/').pop(); // Derive filename if not available
      const fileType = file.mime || 'image/jpeg'; // Default to 'image/jpeg' if mime is not available
      
      formData.append('imagePaths', {
        uri: file.path, // Use the correct file path
        name: fileName, // Use derived or actual filename
        type: fileType, // Use the file's mime type
      });
    } else {
      console.warn('Invalid image file:', file); // Log any invalid image file for debugging
    }
  });
  console.log('formData', formData); // Log FormData for debugging

  const url ='add_cabinets'; // Construct the full URL
  setIsLoading(true); // Show loader
  try {
    console.log('Request URL:', url);
    const response = await axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('CreateCabinate response:', response.data);
    if (response?.data?.success) {
      alert(response.data.message);
      props?.onCabinateClose(); // Call the close function if success
    } else {
      alert(response.data.message || 'Failed to create cabinet'); // Handle non-successful responses
    }
    
    clearState(); // Clear the state after successful request
  } catch (error) {
    console.error('CreateCabinate error:', error.response); // Log error for debugging
    // alert('An error occurred while creating the cabinet. Please try again.'); // Notify user about the error
  } finally {
    setIsLoading(false); // Hide loader in all cases
  }
};
const getCabinate = async () => {
 const getData = {
  TIIM_KEY:TAIM_ITEM_KEY,
  TIMKEY:Tim_Key
 }
  console.log('getData', getData);
  const url = Config.BASE_URL;
  const getCabinate_url ='get/CabinateInspectionDetails';
  // setIsLoading(true);
  try {
    console.log('Request URL:', getCabinate_url);
    const response = await axiosInstance.post(getCabinate_url, getData);
    console.log('getCabinate_url....', response.data.data[0]);
 setCabinateDetail(response?.data?.data[0])
    setComment(response?.data?.data[0].TIMC_COMMENTS);
    setIscheckId(response?.data?.data[0].TIMC_INSPECTED_ITEMS);
    setSelectedImages(response?.data?.data[0].imageFileNames);
    setStatusDataValue(parseFloat(response?.data?.data[0].TIMC_STATUS))
   
   
    // setIsLoading(false);
  } catch (error) {
    // alert(error);
    console.log('CreateCabinate_error...', error);
  } finally {
    setIsLoading(false);
  }
};
console.log("isCheckId",isCheckId);
const clearState =()=>{
  setComment('');
  setIscheckId(0);
  setSelectedImages([]);
  setStatusDataValue([]);
}
const handleImageSelect = (images) => {
  console.log(images, "cabinate image");
  
  // Combine the new images with the already selected images
  const updatedImages = [...selectedImages, ...images];

  setSelectedImages(updatedImages);
  setImageError(false); // Clear the error when an image is selected
  refRBSheet.current.close();
};
  const handle_Status = async () => {
    // setIsLoading(true);
    try {
      const data = {
        P_PARENT_CODE: 'STATUS',
        P_TYPE: 'OPTION',
      };
      const response = await SignupLookupDetails(data);
      setStatusData(response.lookup_details); 
    } catch (error) {
      console.error('API call setStatusData failed:', error.message);
      alert(error.message); 
    } finally {
      // setIsLoading(false);
    }
  };
  const statusRender = item => {
    return (
      <View
        key={item.lookup_key}
        style={[
          BedroomCss.itemView,
          {
            backgroundColor:
              item.lookup_key === statusDataValue
                ? _COLORS.Kodie_MidLightGreenColor
                : null,
          },
        ]}>
        {item.lookup_key === statusDataValue ? (
          <AntDesign
            color={_COLORS.Kodie_GreenColor}
            name={'checkcircle'}
            size={20}
          />
        ) : (
          <Fontisto
            color={_COLORS.Kodie_GrayColor}
            name={'radio-btn-passive'}
            size={20}
          />
        )}
        <Text style={BedroomCss.textItem}>
          {item.lookup_description}
        </Text>
      </View>
    );
  };
  const removeImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
  };
  return (
    <>
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 84 : 0}
        style={{ flex: 1 }}
      >
    <ScrollView 
    nestedScrollEnabled={true}
    contentContainerStyle={{marginBottom:80,flexGrow:1}} 
    >
      <View style={BedroomCss.secondModal}>
        <View style={BedroomCss.ModalContainer}>
          <Text style={BedroomCss.ShareText}>{ItemName}</Text>
          <TouchableOpacity onPress={props?.onCabinateClose}>
            <AntDesign name="close" size={20} color={_COLORS.Kodie_BlackColor} />
          </TouchableOpacity>
        </View>
        <Text style={[LABEL_STYLES._texinputLabel, BedroomCss.cardHeight]}>
          {'Has this item been inspected?'}
        </Text>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={() => {
        // setIscheckId(isChecked? 0:1)
        isChecked ? setIscheckId(0) :setIscheckId(1)
          setIsChecked(!isChecked)}}
          >
          {!isChecked ? (
            <MaterialIcons
              name="check-box-outline-blank"
              size={30}
              color={_COLORS.Kodie_GrayColor}
            />
          ) : (
            <View style={BedroomCss.groupIconView}>
              <MaterialIcons
                name="check-box-outline-blank"
                size={30}
                color={_COLORS.Kodie_GrayColor}
              />
              <Entypo
                name="check"
                size={18}
                color={_COLORS.Kodie_GreenColor}
                style={BedroomCss.groupIcon}
              />
            </View>
          )}
        </TouchableOpacity>
        <View style={{flex:1}}/>
        </View>
        <Text style={[LABEL_STYLES._texinputLabel, BedroomCss.cardHeight]}>
          {'Describe the current state of the item'}
        </Text>
        <Dropdown
                  style={[
                    BedroomCss.dropdown,
                    {
                      borderRadius: 8,
                      height: 48,
                      alignItems: 'center',
                      marginTop: 0,
                    },
                  ]}
                  placeholderStyle={BedroomCss.placeholderStyle}
                  selectedTextStyle={BedroomCss.selectedTextStyle}
                  inputSearchStyle={BedroomCss.inputSearchStyle}
                  iconStyle={BedroomCss.iconStyle}
                  data={statusData}
                  search
                  maxHeight={300}
                  labelField="lookup_description"
                  valueField="lookup_key"
                  placeholder="Select"
                  searchPlaceholder="Select from drop down"
                  value={statusDataValue}
                  onChange={item => {
                    setStatusDataValue(item.lookup_key);
                  }}
                  renderItem={statusRender}
                />
        <View style={{flex:1}}>
        <Text style={[LABEL_STYLES._texinputLabel, BedroomCss.cardHeight]}>
          {'Upload clear images of the item'}
        </Text>
        
        {selectedImages.length > 0 && (
        <FlatList
          data={selectedImages}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          nestedScrollEnabled={true}
          contentContainerStyle={{
            height: 100, // Set a fixed height for the scrollable area
            // padding: 10,
            marginRight: 40,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={BedroomCss.imageContainer}>
              <Image
                source={{ uri: item.path  }} // Adjust this based on your image URI logic
                style={BedroomCss.image}
              />
              <TouchableOpacity
                style={BedroomCss.closeIconContainer}
                onPress={() => removeImage(index)}
              >
                <MaterialIcons name="close" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
   
        <UploadImageBoxes
          Box_Text={'Add Photo'}
          circlestyle={BedroomCss.circleStyle}
          pluacircle={BedroomCss.pluscirclestyle}
          size={14}
          onPress={() => refRBSheet.current.open()}
          textstyle={{fontSize:8}}
          />
        {imageError && (
          <Text style={{ color: 'red', marginTop: 10 }}>
    Please upload at least one image.
  </Text>
)}
</View>
        <Text style={[LABEL_STYLES._texinputLabel, BedroomCss.cardHeight]}>
          {'Comment'}
        </Text>
        <TextInput
          style={BedroomCss.input}
          value={comment}
          onChangeText={setComment}
          placeholder="Enter any notes about this item"
          placeholderTextColor="#999"
          multiline
          numberOfLines={5}
          textAlignVertical={'top'}
        />
        
      </View>
      </ScrollView>
      <View style={BedroomCss.ButtonView}>
          <TouchableOpacity style={BedroomCss.cancelView} onPress={props.onCabinateClose}>
            <Text style={[BedroomCss.cancelText]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={BedroomCss.SaveView} onPress={CreateCabinate}>
            <Text style={BedroomCss.DoneText}>Done</Text>
          </TouchableOpacity>
        </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={180}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: BedroomCss.bottomModal_container,
        }}
      >
        <UploadCabinateImage heading_Text={'Upload more images'} onImageSelect={handleImageSelect} />
      </RBSheet>
      {isLoading ? <CommonLoader/> :null}
      
      </KeyboardAvoidingView>
    </>
  );
}

export default AddCabinatItems;
