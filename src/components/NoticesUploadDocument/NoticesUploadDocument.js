import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FONTFAMILY, _COLORS} from '../../Themes';

const NoticesUploadDocument = ({onFileUpload, rbSheetRefclose}) => {
  const [message, setMessage] = useState('');

  const handleTakePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
    })
      .then(images => {
        console.log(images);
        // images.forEach(image => {
        //   onFileUpload(image.path, 'image');
        // });
        onFileUpload(images.path, 'image');

        setMessage('Photos taken successfully!');
      })
      .catch(error => {
        console.log('Error taking photo:', error);
      });
  };

  const handleChooseFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
    })
      .then(images => {
        console.log(images);
        images.forEach(image => {
          onFileUpload(image.path, 'image');
        });
        setMessage('Photos selected from gallery!');
      })
      .catch(error => {
        console.log('Error selecting photos:', error);
      });
  };

  const handleChooseDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      onFileUpload(result, 'document');
      setMessage('Document selected!');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.log('DocumentPicker Error: ', err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            fontSize: 20,
            color: _COLORS?.Kodie_BlackColor,
            fontFamily: FONTFAMILY?.K_Bold,
          }}>
          {'Upload more documents'}
        </Text>
        <TouchableOpacity onPress={rbSheetRefclose}>
          <AntDesign
            color={_COLORS.Kodie_BlackColor}
            name={'close'}
            size={25}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginVertical: 15}}>
        <TouchableOpacity style={styles.sheetButton} onPress={handleTakePhoto}>
          <View style={styles.IconView}>
            <Feather
              name="camera"
              size={22}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
              style={{alignSelf: 'center'}}
            />
          </View>
          <Text style={styles.sheetButtonText}>{'Take photo'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sheetButton}
          onPress={handleChooseFromGallery}>
          <View style={styles.IconView}>
            <MaterialIcons
              name="add-photo-alternate"
              size={22}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
              style={{alignSelf: 'center'}}
            />
          </View>
          <Text style={styles.sheetButtonText}>
            {'Choose files from library'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sheetButton}
          onPress={handleChooseDocument}>
          <View style={styles.IconView}>
            <MaterialIcons
              name="drive-folder-upload"
              size={22}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
              style={{alignSelf: 'center'}}
            />
          </View>
          <Text style={styles.sheetButtonText}>
            {'Choose files from folder'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal:16
  },
  sheetButton: {
    paddingVertical: 6,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  sheetButtonText: {
    fontSize: 16,
    color: _COLORS?.Kodie_BlackColor,
    fontFamily: FONTFAMILY?.K_Medium,
  },
  IconView: {
    borderWidth: 1,
    padding: 7,
    borderColor: _COLORS?.Kodie_LightGrayLineColor,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default NoticesUploadDocument;
