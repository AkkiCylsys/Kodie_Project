import {
  View,
  Platform,
  TouchableOpacity,
  Text,
  AsyncStorage,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat, Actions, Send} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopHeader from '../../components/Molecules/Header/Header';
import {_goBack} from '../../services/CommonServices';
import {_COLORS} from '../../Themes';
const Chat = props => {
  const [messageList, setMessageList] = useState([]);
  const route = useRoute();
  const [pendingMessage, setPendingMessage] = useState(null);

  const initializeChat = async () => {
    try {
      const snapshot = await firestore()
        .collection('chats')
        .doc(`${route.params.userid}`)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .get();

      const messages = snapshot.docs.map(doc => {
        const data = doc.data();

        const createdAt =
          data.createdAt && data.createdAt.toDate
            ? data.createdAt.toDate()
            : null;

        return {
          ...data,
          // createdAt: data.createdAt.toDate(),
          createdAt: createdAt || new Date(),
        };
      });

      setMessageList(messages);
    } catch (error) {
      console.error('Error initializing chat:', error);
    }
  };

  useEffect(() => {
    initializeChat();
  }, []);

  const onSend = useCallback(
    async (messages = []) => {
      const msg = messages[0];

      if (msg.text || msg.image || msg.pdf) {
        const myMsg = {
          _id: uuid.v4(),
          text: msg.text || '',
          image: msg.image || '',
          pdf: msg.pdf || '',
          // createdAt: Date.now(),
          createdAt: msg.createdAt || Date.now(),
          user: {
            _id: route.params.userid,
          },
        };

        setMessageList(previousMessages =>
          GiftedChat.append(previousMessages, myMsg),
        );

        try {
          await firestore()
            .collection('chats')
            .doc(`${route.params.userid}`)
            .collection('messages')
            .doc(myMsg._id)
            .set(myMsg);
        } catch (error) {
          console.error('Error saving message in Firebase:', error);
        }

        if (msg.image) {
          // Upload image logic
          // Example: You might use Firebase Storage to upload the image
        }

        if (msg.pdf) {
          // Upload PDF logic
          // Example: You might use Firebase Storage to upload the PDF
        }
        setPendingMessage(null);
      }
    },
    [route.params.userid],
  );

  const pickImageOrPdf = async () => {
    try {
      const result = await ImagePicker.openPicker({
        multiple: false,
        mediaType: 'any',
        compressImageQuality: Platform.OS === 'ios' ? 0.8 : 1,
      });

      if (result.mime && result.mime.startsWith('image')) {
        onSend([{image: result.path}]);
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
      });

      if (result.mime && result.mime.startsWith('image')) {
        onSend([{image: result.path}]);
      }
    } catch (error) {
      console.log('Error picking image from camera:', error);
    }
  };

  const renderActions = props => (
    <Actions
      {...props}
      options={{
        'Choose from Gallery': pickImageOrPdf,
        'Take a Photo': pickImageFromCamera,
      }}
      optionTintColor={_COLORS.Kodie_DarkGreenColor}
      // containerStyle={{backgroundColor: 'red'}}
      iconTextStyle={{
        backgroundColor: 'black',
        borderRadius: 20,
        width: 28,
        height: 26,
        alignSelf: 'center',
      }}
    />
  );

  const renderSend = props => (
    <Send {...props}>
      {/* <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <TouchableOpacity onPress={pickImageOrPdf}>
          <Icon
            name="photo"
            size={24}
            color="black"
            style={{
              marginHorizontal: 0,
              alignItems: 'center',
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImageFromCamera}>
          <Icon
            name="camera"
            size={24}
            color="black"
            style={{alignItems: 'center', alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View> */}

      <View
        style={{
          marginRight: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8,
        }}>
        <Icon name="send" size={24} color="black" />
      </View>
    </Send>
  );

  return (
    <View style={{flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor}}>
      <TopHeader
        MiddleText={route.params.name}
        onPressLeftButton={() => _goBack(props)}
      />
      <GiftedChat
        messages={messageList}
        onSend={onSend}
        user={{
          _id: route.params.userid,
        }}
        renderActions={renderActions}
        alwaysShowSend
        renderSend={renderSend}
      />
    </View>
  );
};

export default Chat;
