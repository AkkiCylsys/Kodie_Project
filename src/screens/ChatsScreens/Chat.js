import {
  View,
  Platform,
  TouchableOpacity,
  Text,
  AsyncStorage,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat, Actions, Send, Bubble} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TopHeader from '../../components/Molecules/Header/Header';
import {_goBack} from '../../services/CommonServices';
import {IMAGES, _COLORS} from '../../Themes';
import {useSelector} from 'react-redux';
import {fontFamily} from '../../Themes/FontStyle/FontStyle';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';
const Chat = props => {
  const [messageList, setMessageList] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const [pendingMessage, setPendingMessage] = useState(null);
  const userData = route.params.data;
  console.log(route.params.data, 'datadatadatadatadata');
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginResponse.....', loginData);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [imagePathUrl, setImagePathUrl] = useState([]);
  const openOptionsModal = () => {
    setOptionsModalVisible(true);
  };

  const closeOptionsModal = () => {
    setOptionsModalVisible(false);
  };
  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  useEffect(() => {
    // initializeChat();

    const docid =
      route.params.userid > loginData.Login_details.user_id
        ? loginData.Login_details.user_id + '-' + route.params.userid
        : route.params.userid + '-' + loginData.Login_details.user_id;
    const messageRef = firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unSubscribe = messageRef.onSnapshot(querySnap => {
      const allmsg = querySnap.docs.map(docSanp => {
        const data = docSanp.data();
        if (data.createdAt) {
          return {
            ...docSanp.data(),
            createdAt: docSanp.data().createdAt.toDate(),
          };
        } else {
          return {
            ...docSanp.data(),
            createdAt: new Date(),
          };
        }
      });
      setMessageList(allmsg);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const onSend = messageArray => {
    const msg = messageArray[0];
    const {type, text, uri, video, _id, pdf, ...otherProps} = msg;
    const mymsg = {
      ...msg,
      _id: uuid.v4(),
      sentBy: loginData.Login_details.user_id,
      sentTo: route.params.userid,

      createdAt: new Date(),
      user: {_id: loginData.Login_details.user_id},
      image: imagePathUrl,
    };
    console.log(loginData.Login_details.user_id, 'idsent');
    setMessageList(previousMessages =>
      GiftedChat.append(previousMessages, mymsg),
    );
    const docid =
      route.params.userid > loginData.Login_details.user_id
        ? loginData.Login_details.user_id + '-' + route.params.userid
        : route.params.userid + '-' + loginData.Login_details.user_id;

    firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .add({...mymsg, createdAt: firestore.FieldValue.serverTimestamp()});
  };

  const pickImageOrPdf = async () => {
    try {
      const result = await ImagePicker.openPicker({
        multiple: false,
        mediaType: 'any',
        compressImageQuality: Platform.OS === 'ios' ? 0.8 : 1,
        // cropping: false,
      });
      if (result.mime && result.mime.startsWith('image')) {
        onSend([{image: result}]);

        console.log(result.data, 'firebaseimg');
      } else if (result.mime && result.mime.startsWith('application/pdf')) {
        onSend([{pdf: result.path}]);
      }
    } catch (error) {
      console.log('Error picking image or PDF:', error);
    }
  };

  const pickImageFromCamera = async () => {
    try {
      const result = await ImagePicker.openCamera({
        compressImageQuality: Platform.OS === 'ios' ? 0.8 : 1,
        // cropping: false,
      });

      const imageUrl = await uploadImageToFirebase(result.path);

      if (result.mime && result.mime.startsWith('image')) {
        onSend([{image: imageUrl}]);
      }
    } catch (error) {
      console.log('Error picking image from camera:', error);
    }
  };
  const uploadImageToFirebase = async imagePath => {
    try {
      // Create a unique filename for the image
      const imageName = uuid.v4();
      const imageRef = storage().ref().child(`images/${imageName}`);

      // Upload image to Firebase Storage
      await imageRef.putFile(imagePath);

      // Get the download URL of the uploaded image
      const imageUrl = await imageRef.getDownloadURL();
      console.log(imageUrl, 'firebase image URL');

      return imageUrl;
    } catch (error) {
      console.error('Error uploading image to Firebase:', error);
      throw error;
    }
  };

  const renderSend = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 6,
          paddingVertical: 5,
        }}>
        <TouchableOpacity onPress={openOptionsModal}>
          <Foundation
            name="paperclip"
            size={25}
            color={_COLORS.Kodie_ExtraLightGrayColor}
            // style={{marginHorizontal: 20}}
          />
        </TouchableOpacity>
        <Send {...props}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              // marginHorizontal: 10,
              marginLeft: 18,
              marginBottom: 8,
            }}>
            <Ionicons
              name="send-sharp"
              size={25}
              color={_COLORS.Kodie_ExtraLightGrayColor}
            />
          </View>
        </Send>
      </View>
    );
  };
  const renderBubble = props => {
    const isCurrentUser =
      props.currentMessage?.user?._id === loginData.Login_details.user_id;

    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: isCurrentUser ? '#ffffff' : '#000000', // text color for left side
          },
          right: {
            color: isCurrentUser ? '#ffffff' : '#000000', // text color for right side
          },
        }}
        timeTextStyle={{
          left: {
            color: isCurrentUser ? '#ffffff' : '#aaaaaa', // time text color for left side
          },
          right: {
            color: isCurrentUser ? '#ffffff' : '#aaaaaa', // time text color for right side
          },
        }}
        // Add other style properties as needed

        onLongPress={() => {
          setSelectedMessage(props.currentMessage);
          openDeleteModal();
        }}
      />
    );
  };
  const deleteMessage = () => {
    const docid =
      route.params.userid > loginData.Login_details.user_id
        ? loginData.Login_details.user_id + '-' + route.params.userid
        : route.params.userid + '-' + loginData.Login_details.user_id;
    if (selectedMessage) {
      firestore()
        .collection('chatrooms')
        .doc(docid)
        .collection('messages')
        .doc(selectedMessage._id)
        .delete()
        .then(() => {
          console.log('Message deleted successfully');
          closeDeleteModal();
          setMessageList(prevMessages =>
            prevMessages.filter(msg => msg._id !== selectedMessage._id),
          );
        })
        .catch(error => {
          console.error('Error deleting message:', error);
        });
    }
  };

  const renderDeleteModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={closeDeleteModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={closeDeleteModal}>
            <Icon
              name="close"
              size={20}
              color={_COLORS.Kodie_BlackColor}
              style={{
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
              }}
            />
          </TouchableOpacity>
          {selectedMessage && (
            <TouchableOpacity
              onPress={deleteMessage}
              style={styles.modalOption}>
              <Icon
                name="trash"
                size={24}
                color={_COLORS.Kodie_ExtraDarkGreen}
                style={{
                  marginHorizontal: 0,
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
              />
              <Text
                style={[
                  styles.modalOptionText,
                  {color: _COLORS.Kodie_BlackColor},
                ]}>
                Delete Message
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor}}>
      <TopHeader
        MiddleText={
          route.params.chatname ? route.params.name : `${userData.name}`
        }
        onPressLeftButton={() => {
          route.params.chatname ? navigation.navigate('Chats') : _goBack(props);
        }}
      />
      <GiftedChat
        messages={messageList}
        onSend={onSend}
        user={{
          _id: loginData.Login_details.user_id,
          avatar: IMAGES.userImage,
        }}
        // renderActions={renderActions}
        alwaysShowSend
        renderSend={renderSend}
        renderBubble={renderBubble}
        // renderChatFooter={renderChatFooter}
      />
      {renderDeleteModal()}
      <Modal
        animationType="slide"
        transparent={true}
        visible={optionsModalVisible}
        onRequestClose={closeOptionsModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={closeOptionsModal}>
            <Icon
              name="close"
              size={20}
              color={_COLORS.Kodie_BlackColor}
              style={{
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              pickImageOrPdf();
              closeOptionsModal();
            }}
            style={styles.modalOption}>
            <Icon
              name="photo"
              size={24}
              color={_COLORS.Kodie_GreenColor}
              style={{
                marginHorizontal: 0,
                alignItems: 'center',
                alignSelf: 'center',
              }}
            />
            <Text style={styles.modalOptionText}>Choose from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              pickImageFromCamera();
              closeOptionsModal();
            }}
            style={styles.modalOption}>
            <Icon
              name="camera"
              size={24}
              color={_COLORS.Kodie_GreenColor}
              style={{alignItems: 'center', alignSelf: 'center'}}
            />
            <Text style={styles.modalOptionText}>Take a Photo</Text>
          </TouchableOpacity>
          {/* Add more options as needed */}
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCloseButton: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  modalOption: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  modalOptionText: {
    fontSize: 16,
    fontFamily: fontFamily.K_Bold,
    color: 'black',
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default Chat;
