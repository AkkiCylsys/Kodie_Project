import {
  View,
  Platform,
  TouchableOpacity,
  Text,
  AsyncStorage,
  StyleSheet,
  Modal,
  Image,
  SafeAreaView,
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
import storage from '@react-native-firebase/storage';
const Chat = props => {
  const [messageList, setMessageList] = useState([]);
  const route = useRoute();
  const [pendingMessage, setPendingMessage] = useState(null);
  const userData = route.params.data;
  console.log(route.params.data, 'datadatadatadatadata');
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginResponse.....', loginData);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

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
    const {type, text, uri, video, pdf, ...otherProps} = msg;
    const mymsg = {
      ...msg,
      sentBy: loginData.Login_details.user_id,
      sentTo: route.params.userid,

      createdAt: new Date(),
      user: {
        _id: loginData.Login_details.user_id,
        avatar: loginData.Login_details.profile_photo_path,
      },
    };

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
      const results = await ImagePicker.openPicker({
        multiple: true, // Enable multiple selection
        mediaType: 'any',
        compressImageQuality: Platform.OS === 'ios' ? 0.8 : 1,
      });

      const userId = uuid.v4();

      // Loop through each selected file and upload it
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const storageRef = storage().ref(`files/${userId}`);

        // Determine the file type based on MIME type
        let messageType = 'image';
        if (result.mime && result.mime.startsWith('image')) {
          messageType = 'image';
        } else if (result.mime && result.mime.startsWith('application/pdf')) {
          messageType = 'pdf';
        } else if (result.mime && result.mime.startsWith('video')) {
          messageType = 'video';
        }

        // Upload the file to storage
        await storageRef.putFile(result.path);

        const downloadURL = await storageRef.getDownloadURL();

        // Send the file as a message
        onSend([{[messageType]: downloadURL}]);
      }
    } catch (error) {
      console.log('Error picking image, PDF, or video:', error);
    }
  };

  const pickImageFromCamera = async () => {
    try {
      const result = await ImagePicker.openCamera({
        compressImageQuality: Platform.OS === 'ios' ? 0.8 : 1,
      });
      const userId = uuid.v4();
      const storageRef = storage().ref(`images/${userId}`);
      await storageRef.putFile(result.path);

      const downloadURL = await storageRef.getDownloadURL();
      if (result.mime && result.mime.startsWith('image')) {
        onSend([{image: downloadURL}]);
      }
    } catch (error) {
      console.log('Error picking image from camera:', error);
    }
  };

  const renderSend = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 6,
          // paddingVertical: 10,
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
        containerStyle={{
          marginLeft: isCurrentUser ? 50 : 0, // adjust the left margin for the bubble
          marginRight: isCurrentUser ? 0 : 50, // adjust the right margin for the bubble
          marginBottom: 10, // add some bottom margin between messages
        }}
        // Add other style properties as needed
        onLongPress={() => {
          setSelectedMessage(props.currentMessage);
          openDeleteModal();
        }}
        renderAvatar={renderAvatar(props)}>
        {props.currentMessage?.user?._id !==
          loginData.Login_details.user_id && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: isCurrentUser ? 0 : 8,
            }}>
            <Image
              source={IMAGES.userImage} // Replace with the appropriate image source
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                marginRight: 4,
              }}
            />
            <Text
              style={{
                color: _COLORS.Kodie_GreenColor,
                fontSize: 12,
              }}>
              {props.currentMessage?.user?.name
                ? props.currentMessage.user.name
                    .split(' ')
                    .map(word => word[0])
                    .join('')
                : ''}
            </Text>
          </View>
        )}
      </Bubble>
    );
  };

  const renderAvatar = props => () => {
    return (
      <Image
        source={{uri: props.currentMessage?.user?.avatar}}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          marginRight: 8,
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
    <SafeAreaView style={{flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor}}>
      <TopHeader
        MiddleText={
          route.params.chatname ? route.params.name : `${userData.name}`
        }
        onPressLeftButton={() => _goBack(props)}
      />
      <GiftedChat
        messages={messageList}
        onSend={onSend}
        user={{
          _id: loginData.Login_details.user_id,
          avatar: loginData.Login_details.profile_photo_path,
        }}
        // renderActions={renderActions}
        alwaysShowSend
        renderSend={renderSend}
        renderBubble={renderBubble}
        // renderChatFooter={renderChatFooter}
        textInputProps={{
          style: {
            flex: 1,
            color: 'black',
          },
        }}
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
    </SafeAreaView>
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
