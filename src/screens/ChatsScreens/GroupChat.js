import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Platform, StyleSheet,View,TouchableOpacity, Modal,Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { GiftedChat,Send ,Bubble} from 'react-native-gifted-chat';
import TopHeader from '../../components/Molecules/Header/Header';
import { _goBack } from '../../services/CommonServices';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FONTFAMILY, IMAGES, _COLORS } from '../../Themes';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
const GroupChat = (props) => {
  const route = useRoute();
  const { groupId } = route.params;
  const [messages, setMessages] = useState([]);
  const [groupName, setGroupName] = useState('');
  const loginData = useSelector(state => state.authenticationReducer.data);

  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const openOptionsModal = () => {
    setOptionsModalVisible(true);
  };

  const closeOptionsModal = () => {
    setOptionsModalVisible(false);
  };
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('groups')
      .doc(groupId)
      .collection('groupmessage')
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        const messagesData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text || '',
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
            user: {
              _id: data.senderId || 'unknown',
              name: data.senderName || 'Unknown',
            },
            image: data.image || null,
            pdf: data.pdf || null,
            video: data.video || null,
          };
        });

        // Debugging log to check fetched messages
        console.log('Fetched messages:', messagesData);
        setMessages(messagesData);
      });

    // Fetch group name
    firestore()
      .collection('groups')
      .doc(groupId)
      .get()
      .then(doc => {
        if (doc.exists) {
          setGroupName(doc.data().groupName || 'Untitled Group');
        }
      });

    return () => unsubscribe();
  }, [groupId]);
  const pickImageOrPdf = async () => {
    try {
      const results = await ImagePicker.openPicker({
        multiple: true,
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
        if (result.mime.startsWith('image')) {
          messageType = 'image';
        } else if (result.mime.startsWith('application/pdf')) {
          messageType = 'pdf';
        } else if (result.mime.startsWith('video')) {
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
                _id: loginData?.Login_details?.user_id || 'unknown',
                name: loginData?.Account_details[0]?.UAD_FIRST_NAME || 'Unknown',
              },
              image: messageType === 'image' ? downloadURL : null,
              pdf: messageType === 'pdf' ? downloadURL : null,
              video: messageType === 'video' ? downloadURL : null,
            };

            handleSend([newMessage]);
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
      const newMessage = {
        _id: uuid.v4(),
        createdAt: new Date(),
        user: {
          _id: loginData?.Login_details?.user_id || 'unknown',
          name: loginData?.Account_details[0]?.UAD_FIRST_NAME || 'Unknown',
        },
        image: downloadURL,
      };

      handleSend([newMessage]);
    } catch (error) {
      console.log('Error picking image from camera:', error);
    }
  };

  const handleSend = async (newMessages = []) => {
    const message = newMessages[0];
    if (message.text || message.image || message.pdf || message.video) {
      try {
        const messageData = {
          text: message.text || '',
          createdAt: new Date(),
          senderId: loginData?.Login_details?.user_id || 'unknown',
          senderName: loginData?.Account_details[0]?.UAD_FIRST_NAME || 'Unknown',
          image: message.image || null,
          pdf: message.pdf || null,
          video: message.video || null,
        };

        // Debugging log to check message data
        console.log('Message data to be sent:', messageData);

        await firestore()
          .collection('groups')
          .doc(groupId)
          .collection('groupmessage')
          .add(messageData);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleSendLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        const locationMessage = {
          text: `My location: https://www.google.com/maps?q=${latitude},${longitude}`,
          createdAt: new Date(),
          senderId: loginData?.Login_details?.user_id || 'unknown',
          senderName: loginData?.Account_details[0]?.UAD_FIRST_NAME || 'Unknown',
        };

        try {
          await firestore()
            .collection('groups')
            .doc(groupId)
            .collection('groupmessage')
            .add(locationMessage);
        } catch (error) {
          console.error('Error sending location:', error);
        }
      },
      error => console.error('Error getting location:', error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
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
        renderMessageImage={(props) =>
          props.currentMessage.image ? (
            <Image
              source={{ uri: props.currentMessage.image }}
              style={{ width: 120, height: 120 , borderRadius:10}}
            />
          ) : null
        }
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
        // onLongPress={() => {
        //   setSelectedMessage(props.currentMessage);
        //   openDeleteModal();
        // }}
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
              source={IMAGES.userImage}
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
  return (
    <SafeAreaView style={styles.container}>
      <TopHeader
        MiddleText={groupName}
        onPressLeftButton={() => _goBack(props)}
      />
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{
          _id: loginData?.Login_details?.user_id || 'unknown',
          name: loginData?.Account_details[0]?.UAD_FIRST_NAME || 'Unknown',
        }}
        showUserAvatar
         inverted={false} 
        renderUsernameOnMessage
        renderSend={renderSend}
        renderBubble={renderBubble}
        textInputProps={{
          style: {
            flex: 1,
            color: 'black',
            paddingHorizontal: 10,
            paddingVertical: 8,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 10,
          },
        }}
      />
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.footer}
      /> */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={optionsModalVisible}
        onRequestClose={closeOptionsModal}>
        <View style={styles.modalContainer}>
          <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
            <View style={{flex: 1, backgroundColor: 'white'}} />
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
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

export default GroupChat;
