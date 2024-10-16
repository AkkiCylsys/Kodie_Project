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
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, Actions, Send, Bubble } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TopHeader from '../../components/Molecules/Header/Header';
import { _goBack } from '../../services/CommonServices';
import { IMAGES, _COLORS } from '../../Themes';
import { useSelector } from 'react-redux';
import { FONTFAMILY } from '../../Themes/FontStyle/FontStyle';
import storage from '@react-native-firebase/storage';

import Geolocation from '@react-native-community/geolocation';
const Chat = props => {
  const [messageList, setMessageList] = useState([]);
  const route = useRoute();
  const [pendingMessage, setPendingMessage] = useState(null);
  const userData = route.params.data;
  const chatname = route.params.chatname
  const userid = route.params.userid
  console.log(route.params.data, chatname, 'datadatadatadatadata');
  console.log(userid, 'userV');
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log(loginData.Login_details.user_id,"my");
  // console.log('loginResponse.....', loginData);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [ClearChatModalVisible, setClearChatModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState([]);


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

  const createDocId = (userId1, userId2) => {
    return userId1 > userId2 ? `${userId1}-${userId2}` : `${userId2}-${userId1}`;
  };

  useEffect(() => {
    const docid = createDocId(loginData.Login_details.user_id, route.params.userid);
    const messageRef = firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unsubscribe = messageRef.onSnapshot(querySnapshot => {
      if (querySnapshot && !querySnapshot.empty) {
        const messages = querySnapshot.docs.map(doc => {
          const data = doc.data();
          if (data.deletedBy && data.deletedBy[loginData.Login_details.user_id]) {
            return null; // Skip this message if it is deleted for this user
          }
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
            user: {
              _id: data.user._id,
              avatar: data.user.avatar,
            },
            image: data.image || null,
            pending: data.pending || false,
            sent: data.sent || true,
            seen: data.seen || false,

          };
        }).filter(message => message !== null);

        const newUnreadMessages = messages.filter(
          message => message.user._id !== loginData.Login_details.user_id && !message.seen
        );

        setUnreadMessages(newUnreadMessages);

        // Update seen status for all unread messages
        querySnapshot.docs.forEach(async doc => {
          const data = doc.data();
          if (data.user._id !== loginData.Login_details.user_id && !data.seen) {
            await firestore()
              .collection('chatrooms')
              .doc(docid)
              .collection('messages')
              .doc(doc.id)
              .update({ seen: true });
          }
        });
        // Ensure that deleted messages are not included
        const filteredMessages = messages.filter(message => message._id !== selectedMessage?._id);

        setMessageList(messages);
      } else {
        setMessageList([]); // Set empty array if no messages found
        setUnreadMessages([]);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [loginData, route.params.userid]);

  const clearChat = async () => {
    const chatroomId = createDocId(loginData.Login_details.user_id, route.params.userid);

    try {
      // Get a reference to the chatroom's messages collection
      const messagesRef = firestore()
        .collection('chatrooms')
        .doc(chatroomId)
        .collection('messages');

      // Fetch all messages
      const querySnapshot = await messagesRef.get();

      if (!querySnapshot.empty) {
        const batch = firestore().batch();

        querySnapshot.docs.forEach(doc => {
          // Update each message to mark it as deleted for the current user
          batch.update(doc.ref, {
            [`deletedBy.${loginData.Login_details.user_id}`]: true
          });
        });

        // Commit the batch update
        await batch.commit();
        console.log('All messages cleared for the user successfully');
        setClearChatModalVisible(false)
        // Optionally clear the messages from the UI as well
        setMessageList([]);
      }
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  const onSend = async (messageArray) => {
    const msg = messageArray[0];
    const { text, image } = msg;
  
    // Create a message object with default values
    const message = {
      _id: uuid.v4(),
      text: text || '', // Ensure text is a string
      createdAt: new Date(),
      user: {
        _id: loginData?.Login_details?.user_id || '', // Safely access user_id
        avatar: loginData?.Login_details?.profile_photo_path || '', // Safely access avatar
      },
      image: image || null, // Set to null if image is undefined
      pending: true, // Mark as pending (for UI)
      sent: false,  // Initially set as not sent
      seen: false,  // Mark as unseen
    };
  
    // Append the message to the local message list immediately (pending state)
    setMessageList((previousMessages) => GiftedChat.append(previousMessages, message));
  
    const docid = createDocId(loginData?.Login_details?.user_id, route.params.userid);
  
    try {
      const docRef = firestore().collection('chatrooms').doc(docid);
  
      // Check if the chatroom exists; if not, create it
      const doc = await docRef.get();
      if (!doc.exists) {
        await docRef.set({
          // You can add initial data for the chatroom here if needed
          createdAt: firestore.FieldValue.serverTimestamp(),
          lastMessage: message.text,
          lastMessageAt: firestore.FieldValue.serverTimestamp(),
        });
      }
  
      // Prepare the message data for Firestore
      const messageData = {
        _id: message._id,
        text: message.text,
        createdAt: firestore.FieldValue.serverTimestamp(), // Use server timestamp
        user: {
          _id: message.user._id,
          avatar: message.user.avatar,
        },
        image: message.image,
        pending: false, // Set pending to false once added to Firestore
        sent: true,    // Mark as sent
        seen: false,   // Unseen by the recipient
      };
  
      console.log('Adding message data to Firestore:', messageData);
  
      // Add message to Firestore
      await docRef.collection('messages').add(messageData);
  
      // Update the message list after the Firestore operation completes
      setMessageList((previousMessages) =>
        previousMessages.map((m) =>
          m._id === message._id ? { ...m, pending: false, sent: true } : m
        )
      );
  
      console.log('Message successfully added to Firestore:', message);
    } catch (error) {
      console.error('Error accessing Firestore or sending message:', error);
  
      // Optionally, you can update the message to show an error state or allow a retry
      setMessageList((previousMessages) =>
        previousMessages.map((m) =>
          m._id === message._id ? { ...m, error: true } : m
        )
      );
    }
  };

  const pickImageOrPdf = async () => {
    try {
      const results = await ImagePicker.openPicker({
        multiple: true, // Enable multiple selection
        mediaType: 'any',
        compressImageQuality: Platform.OS === 'ios' ? 0.8 : 1,
      });

      closeOptionsModal();

      // Loop through each selected file and upload it
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const userId = uuid.v4();
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
        const uploadTask = storageRef.putFile(result.path);

        uploadTask.on(
          'state_changed',
          snapshot => {
            // Track upload progress if needed
          },
          error => {
            console.error('Error uploading file:', error);
          },
          async () => {
            // Upload completed successfully
            const downloadURL = await storageRef.getDownloadURL();
            console.log('Download URL:', downloadURL);

            // Create a new message object for each image/video and send it
            const newMessage = {
              _id: uuid.v4(),
              createdAt: new Date(),
              user: {
                _id: loginData.Login_details.user_id,
                avatar: loginData.Login_details.profile_photo_path,
              },
              image: messageType === 'image' ? downloadURL : null,
              pdf: messageType === 'pdf' ? downloadURL : null,
              video: messageType === 'video' ? downloadURL : null,
              pending: true,
              sent: false,
            };

            onSend([newMessage]);
          },
        );
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
      closeOptionsModal();
      const userId = uuid.v4();
      const storageRef = storage().ref(`images/${userId}`);
      await storageRef.putFile(result.path);

      const downloadURL = await storageRef.getDownloadURL();
      if (result.mime && result.mime.startsWith('image')) {
        onSend([{ image: downloadURL }]);
      }
    } catch (error) {
      console.log('Error picking image from camera:', error);
    }
  };
  const handleSendLocation = async () => {
    try {
      Geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;
          const locationMessage = {
            text: `My location: https://www.google.com/maps?q=${latitude},${longitude}`,
            createdAt: new Date(),
            user: {
              _id: loginData.Login_details.user_id,
              avatar: loginData.Login_details.profile_photo_path,
            },
            location: {
              latitude,
              longitude,
            },
          };

          const docid = createDocId(loginData.Login_details.user_id, route.params.userid);

          // Determine if sending to group or individual chat
          const chatCollection = 'messages';
          const chatRoomId = docid;

          await firestore()
            .collection('chatrooms')
            .doc(chatRoomId)
            .collection(chatCollection)
            .add(locationMessage);

          console.log('Location sent successfully');
        },
        error => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        },
      );
    } catch (error) {
      console.error('Error sending location:', error);
    }
  };

  const renderSend = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          paddingHorizontal: 10,
          marginTop: 10,
          justifyContent: 'center',
        }}>
        {/* Location Icon */}
        <TouchableOpacity
          onPress={handleSendLocation}  // Implement sendLocation function to send user's location
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,  // Adjust spacing as necessary
          }}>
          <Ionicons
            name="location-outline"
            size={25}
            color={_COLORS.Kodie_ExtraLightGrayColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openOptionsModal}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginLeft: Platform.OS ? 20 : 18,
          }}>
          <Foundation
            name="paperclip"
            size={25}
            color={_COLORS.Kodie_ExtraLightGrayColor}
          />
        </TouchableOpacity>



        <Send {...props}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginLeft: Platform.OS ? 20 : 18,
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
        renderTicks={() => {
          if (isCurrentUser) {
            if (props.currentMessage.sent && props.currentMessage.seen) {
              return <Ionicons name="checkmark-done-sharp" size={18} color="blue" />;
            } else if (props.currentMessage.sent) {
              return <Ionicons name="checkmark-done-sharp" size={18} color="gray" />;
            }
          }
          return null;
        }}
        renderCustomView={props => {
          if (props.currentMessage.pending) {
            return (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            );
          }
          return null;
        }}
        // renderMessageImage={(props) =>
        //   props.currentMessage.image ? (
        //     <Image
        //       source={{ uri: props.currentMessage.image }}
        //       style={{ width: 120, height: 120, borderRadius: 10 }}
        //     />
        //   ) : null
        // }
        wrapperStyle={{
          left: {
            backgroundColor: _COLORS.Kodie_WhiteColor,
            borderColor: _COLORS.Kodie_LightGrayLineColor,
            borderWidth: 0.5,
            borderRadius: 10,
            marginBottom: 5,
          },
          right: {
            backgroundColor: _COLORS.Kodie_GreenColor,
            borderColor: _COLORS.Kodie_GreenColor,
            borderWidth: 0.5,
            borderRadius: 8,
            marginBottom: 5,
          },
        }}
        textStyle={{
          left: {
            color: _COLORS.Kodie_BlackColor,
          },
          right: {
            color: _COLORS.White,
          },
        }}
        timeTextStyle={{
          left: {
            color: _COLORS.Kodie_BlackColor,
          },
          right: {
            color: _COLORS.White,
          },
        }}


        containerStyle={{
          marginLeft: isCurrentUser ? 50 : 0,
          marginRight: isCurrentUser ? 0 : 50,
          marginBottom: 10,
        }}
        onLongPress={() => {
          setSelectedMessage(props.currentMessage);
          openDeleteModal();
        }}
        renderAvatar={renderAvatar}
      >
        {props.currentMessage?.user?._id !==
          loginData.Login_details.user_id && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: isCurrentUser ? 0 : 8,
              }}>
              {/* <Image
                source={IMAGES.userImage}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  marginRight: 4,
                }}
              /> */}
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

  const renderAvatar = () => {
    return null
  };
  const deleteMessage = async () => {
    const docid = createDocId(loginData.Login_details.user_id, route.params.userid);

    if (selectedMessage) {
      try {
        const messageRef = firestore()
          .collection('chatrooms')
          .doc(docid)
          .collection('messages')
          .doc(selectedMessage._id);

        // Update the document to mark it as deleted for the current user
        await messageRef.update({
          [`deletedBy.${loginData.Login_details.user_id}`]: true
        });

        console.log('Message marked as deleted successfully');
        closeDeleteModal();
        setMessageList(prevMessages =>
          prevMessages.filter(msg => msg._id !== selectedMessage._id)
        );
      } catch (error) {
        console.error('Error marking message as deleted:', error);
      }
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
                  { color: _COLORS.Kodie_BlackColor },
                ]}>
                Delete Message
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    );
  };
  const renderClearChatModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={ClearChatModalVisible}
        onRequestClose={() => setClearChatModalVisible(false)}>
        <View style={{ marginTop: 100, left: 250, position: 'absolute' }}>
          <TouchableOpacity
            onPress={clearChat}
            style={styles.modalOption}>
            <Icon
              name="trash"
              size={24}
              color={_COLORS.Kodie_ExtraDarkGreen}
              style={{
                alignItems: 'center',
                alignSelf: 'center',
              }}
            />
            <Text
              style={[
                styles.modalOptionText,
                { color: _COLORS.Kodie_BlackColor },
              ]}>
              Clear all chat
            </Text>
          </TouchableOpacity>

        </View>
      </Modal>
    );
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor }}>
      <TopHeader
        MiddleText={
          chatname ? `${userData.UAD_FIRST_NAME} ${userData.UAD_LAST_NAME}` : `${userData.name}`
        }
        onPressLeftButton={() => _goBack(props)}
      // ManurightIcon

      />

      <GiftedChat
        messages={messageList}
        onSend={onSend}
        showUserAvatar={false}
        showAvatarForEveryMessage={false}
        user={{
          _id: loginData.Login_details.user_id,
          // avatar: loginData.Login_details.profile_photo_path,
        }}
        // renderActions={renderActions}
        // alwaysShowSend
        renderSend={renderSend}
        renderBubble={renderBubble}
        // renderChatFooter={renderChatFooter}
        textInputProps={{
          style: {
            flex: 1,
            color: 'black',
            // borderWidth: 1, // Add border width
            // borderColor: 'grey', // Add border color
            // borderRadius: 20, // Add border radius for rounded corners
            paddingHorizontal: 10, // Add padding horizontally
            paddingVertical: 8,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 10
          },
        }}
      />
      {renderDeleteModal()}
      {/* {renderClearChatModal()} */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={optionsModalVisible}
        onRequestClose={closeOptionsModal}>
        <View style={styles.modalContainer}>
          <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
            <View style={{ flex: 1, backgroundColor: 'white' }} />
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
                  backgroundColor: 'white',
                }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              pickImageOrPdf();
              // closeOptionsModal();
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
              // closeOptionsModal();
            }}
            style={styles.modalOption}>
            <Icon
              name="camera"
              size={24}
              color={_COLORS.Kodie_GreenColor}
              style={{ alignItems: 'center', alignSelf: 'center' }}
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
    fontFamily: FONTFAMILY.K_Bold,
    color: 'black',
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default Chat;
