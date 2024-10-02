import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, Text, Linking, FlatList, TouchableOpacity, AppState } from 'react-native';
import { _COLORS } from "../../../Themes";
import { UploadImageStyle } from "./UploadImageStyle";
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import ImagePicker from "react-native-image-crop-picker";

const options = [
  {
    id: '1',
    label: 'Take photo',
    icon: <Feather name="camera" size={20} color={_COLORS.Kodie_GreenColor} style={{ alignSelf: 'center' }} />,
  },
  {
    id: '2',
    label: 'Choose photo from library',
    icon: <MaterialIcons name="add-photo-alternate" size={20} color={_COLORS.Kodie_GreenColor} style={{ alignSelf: 'center' }} />,
  },
];

const UploadImageData = ({ ImageName }) => {
  const [image, setImage] = useState({});
  const [isPermissionChecked, setIsPermissionChecked] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState) => {
    if (nextAppState === 'active' && !isPermissionChecked) {
      await checkPermissions();
    }
  };

  const checkPermissions = async () => {
    const cameraPermission = await request(PERMISSIONS.IOS.CAMERA);
    const libraryPermission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    
    if (cameraPermission !== RESULTS.GRANTED || libraryPermission !== RESULTS.GRANTED) {
      Alert.alert(
        "Permissions Required",
        "Please enable camera and photo library permissions from settings.",
        [
          { text: "Open Settings", onPress: openAppSettings },
          { text: "Cancel", style: "cancel" },
        ]
      );
    } else {
      setIsPermissionChecked(true);
    }
  };

  const openAppSettings = () => {
    Linking.openSettings();
  };

  const handleImageSelection = useCallback(async (item) => {
    try {
      let permissionStatus;
      if (item.id === '1') {
        permissionStatus = await request(PERMISSIONS.IOS.CAMERA);
      } else if (item.id === '2') {
        permissionStatus = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      }

      if (permissionStatus === RESULTS.GRANTED) {
        const selectedImage = item.id === '1'
          ? await ImagePicker.openCamera({ width: 300, height: 400, cropping: true, compressImageQuality: 0.5 })
          : await ImagePicker.openPicker({ width: 300, height: 400, cropping: true, compressImageQuality: 0.5 });

        setImage(selectedImage);
        ImageName(selectedImage);
      } else {
        showPermissionDeniedAlert();
      }
    } catch (err) {
      console.warn("Error handling image selection:", err);
      Alert.alert("Error", "An error occurred while selecting an image.");
    }
  }, [ImageName]);

  const showPermissionDeniedAlert = () => {
    Alert.alert(
      "Permission Denied",
      "Please enable permission from settings.",
      [
        { text: "Open Settings", onPress: openAppSettings },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={UploadImageStyle.content_View}
      onPress={() => handleImageSelection(item)}
    >
      <View style={UploadImageStyle.IconView}>{item.icon}</View>
      <Text style={UploadImageStyle.text}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={UploadImageStyle.mainContainer}>
      <FlatList
        data={options}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default UploadImageData;
