import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Button
} from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import TopHeader from '../../components/Molecules/Header/Header';
import { IMAGES, _COLORS, FONTFAMILY } from '../../Themes';
import SearchBar from '../../components/Molecules/SearchBar/SearchBar';
import { ChatsStyle } from './ChatsStyle';
import { CommonLoader } from '../../components/Molecules/ActiveLoader/ActiveLoader';
import RBSheet from 'react-native-raw-bottom-sheet';
import DividerIcon from '../../components/Atoms/Devider/DividerIcon';

const Chats = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const loginData = useSelector(state => state.authenticationReducer.data);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const bottomSheetRef = useRef(null);

  const isFocus = useIsFocused();
  useEffect(() => {
    if (loginData?.Login_details?.email && loginData?.Login_details?.user_id && isFocus) {
      fetchData();
    }
  }, [loginData, searchQuery, isFocus]);
  const formatDate = (timestamp) => {
    const now = new Date();
    let messageDate;
  
    // Check if timestamp is a Firestore Timestamp
    if (timestamp instanceof firestore.Timestamp) {
      messageDate = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      messageDate = timestamp;
    } else {
      // Handle other possible formats here
      messageDate = new Date(timestamp); // assuming timestamp is a valid date string or number
    }
  
    const nowWithoutTime = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDateWithoutTime = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
  
    const diffInDays = (nowWithoutTime - messageDateWithoutTime) / (1000 * 60 * 60 * 24);
  
    if (diffInDays === 0) {
      // Message is from today, show the time
      const hours = messageDate.getHours().toString().padStart(2, '0');
      const minutes = messageDate.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } else if (diffInDays === 1) {
      // Message is from yesterday
      return 'Yesterday';
    } else {
      // Older messages
      return messageDate.toLocaleDateString(); // Use a locale-aware date string
    }
  };
  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch all users
      const usersSnapshot = await firestore().collection('Users').get();
      const allUsersData = usersSnapshot.docs.map(doc => doc.data());
      console.log('All Users:', allUsersData);
      setAllUsers(allUsersData);
  
      const allUsersMap = new Map(allUsersData.map(user => [user.user_key, user]));
  
      // Fetch chatrooms
      const chatroomsSnapshot = await firestore().collection('chatrooms').get();
      const relevantUserIds = new Set();
  
      const lastMessagesByUser = {};
  
      // Loop through each chatroom
      for (const doc of chatroomsSnapshot.docs) {
        const docId = doc.id;
        const userIds = docId.split('-');
        const userIdString = loginData.Login_details.user_id.toString();
  
        if (userIds.includes(userIdString)) {
          for (const userId of userIds) {
            if (userId !== userIdString) {
              relevantUserIds.add(userId);
  
              // Fetch the last message for the chatroom
              const messagesSnapshot = await firestore()
                .collection('chatrooms')
                .doc(docId)
                .collection('messages')
                .orderBy('createdAt', 'desc')
                .limit(1)
                .get();
  
              if (!messagesSnapshot.empty) {
                const lastMessage = messagesSnapshot.docs[0].data();
                lastMessage.createdAt = lastMessage.createdAt.toDate();
  
                lastMessagesByUser[userId] = lastMessage;
              }
            }
          }
        }
      }
  
      const chatUsers = [...relevantUserIds].map(userId => allUsersMap.get(userId));
  
      const updatedUsers = chatUsers.map(user => {
        const lastMessage = lastMessagesByUser[user.user_key];
        const lastMessageTime = lastMessage ? formatDate(lastMessage.createdAt) : '';
        const unseenCount = lastMessage && !lastMessage.seen && lastMessage.user._id !== loginData.Login_details.user_id ? 1 : 0;
  
        let lastMessageText = '';
        if (lastMessage) {
          if (lastMessage.image) {
            lastMessageText = 'Photo';
          } else if (lastMessage.pdf) {
            lastMessageText = 'PDF';
          } else {
            lastMessageText = lastMessage.text;
          }
        }
  
        return {
          ...user,
          lastMessage: lastMessageText,
          lastMessageTimestamp: lastMessage?.createdAt || null,
          lastMessageTime,
          unseenCount,
          sendStatus: lastMessage.sendStatus === true ? 1 : 0,
          UserStatus: lastMessage?.user?._id === loginData?.Login_details?.user_id ? 0 : 1,
        };
      });
  
      // Fetch groups
      const groupsSnapshot = await firestore().collection('groups').get();
      const groups = groupsSnapshot.docs.map(doc => ({
        group_key: doc.id,
        ...doc.data(),
        type: 'group',
      }));

      // Combine users and groups
      const sortedUsers = updatedUsers.sort((a, b) => {
        if (a.lastMessageTimestamp && b.lastMessageTimestamp) {
          return b.lastMessageTimestamp - a.lastMessageTimestamp;
        }
        return 0;
      });

      const combinedData = [...sortedUsers, ...groups];
      setFilteredUsers(
        searchQuery
          ? combinedData.filter(item =>
            item.name?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          : combinedData
      );

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };
  
  
  console.log(filteredUsers);
  const truncateText = (text = '', length = 20) => {
    if (text.length > length) {
      return `${text.substring(0, length)}...`;
    }
    return text;
  };

  const navigateToGroupChat = (groupId) => {
    navigation.navigate('GroupChat', { groupId });
  };

  return (
    <SafeAreaView style={ChatsStyle.container}>
      <TopHeader
        IsNotification={true}
        isprofileImage
        onPressRightImgProfile={() => props.navigation.navigate('LandlordProfile')}
        onPressLeftButton={() => props.navigation.navigate('Dashboard')}
        MiddleText={'Chats'}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <View style={ChatsStyle.searchview}>
          <SearchBar
            filterImage={IMAGES.filter}
            frontSearchIcon
            marginTop={3}
            searchData={setSearchQuery}
            textvalue={searchQuery}
          />
        </View>
        <ScrollView>
          <FlatList
            data={filteredUsers}
            renderItem={({ item }) => (
              <View style={ChatsStyle.chatItem}>
                <TouchableOpacity
                  style={ChatsStyle.chatItemContent}
                  // onPress={() => {
                  //   navigation.navigate('Chat', { data: item, userid: item.user_key });
                  // }}
                  onPress={() => {
                    if (item.type === 'group') {
                      navigateToGroupChat(item.group_key);
                    } else {
                      navigation.navigate('Chat', { data: item, userid: item.user_key });
                    }
                  }}
                  >
                  {item.image ? (
                    <Image
                      source={{ uri: item.image }}
                      style={ChatsStyle.userImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <FontAwesome
                      name="user-circle-o"
                      size={50}
                      color={_COLORS.Kodie_ExtraLightGrayColor}
                      style={ChatsStyle.userIcon}
                    />
                  )}
                  <View style={ChatsStyle.userInfo}>
                    <View style={{ flex: 1 }}>
                      <Text style={ChatsStyle.userName}>{item.type === 'group'?item.groupName :item.name}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        {item.UserStatus == 1 ? null : (
                          <Ionicons name="checkmark-done-sharp" size={18} color={item.sendStatus == 0 ? _COLORS.Kodie_ExtraLightGrayColor : 'blue'} />
                        )}
                        {item.lastMessage === 'Photo' ? 
                         <FontAwesome 
                         name="photo"
                          size={20} 
                          color={_COLORS.Kodie_ExtraLightGrayColor}
                          style={{marginHorizontal:5}} />
                         :null
                       }
                       {item.lastMessage === 'Pdf' ? 
                         <FontAwesome 
                         name="file-pdf-o"
                          size={20} 
                          color={_COLORS.Kodie_ExtraLightGrayColor}
                          style={{marginHorizontal:5}} />
                         :null
                       }
                        <Text style={ChatsStyle.userMessage}>{truncateText(item.lastMessage)}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={[ChatsStyle.messageTime, { color: item.unseenCount > 0 ? _COLORS.Kodie_GreenColor : _COLORS.Kodie_BlackColor }]}>{item.lastMessageTime}</Text>
                      {item.unseenCount > 0 ? (
                        <View style={ChatsStyle.unseenCountContainer}>
                          <Text style={ChatsStyle.unseenCountText}>{item.unseenCount}</Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => item.user_key || item.group_key || index.toString()}
          />
        </ScrollView>

        <View style={ChatsStyle.bottomButton}>
          <TouchableOpacity
            style={ChatsStyle.bottomButtonTouchable}
            onPress={() => bottomSheetRef.current.open()}>
            <FontAwesome
              name="users"
              size={30}
              color={_COLORS.Kodie_WhiteColor}
              style={ChatsStyle.bottomButtonIcon}
            />
          </TouchableOpacity>
        </View>
        {isLoading ? <CommonLoader /> : null}
        <RBSheet
          ref={bottomSheetRef}
          height={800}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
            container: {
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              // marginBottom:100
            },
          }}>
          <View style={{marginBottom:100}}> 
            <View style={ChatsStyle.bottomSheetHeader}>
              <Text style={ChatsStyle.bottomSheetTitle}>Invite Members</Text>
              <TouchableOpacity
                onPress={() => bottomSheetRef.current.close()}>
                <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
              </TouchableOpacity>
            </View>
            <DividerIcon />
            <TouchableOpacity
            style={ChatsStyle.bottomSheetButton}
            onPress={() => {
              bottomSheetRef.current.close();
              props.navigation.navigate('CreateGroup');
            }}>
            <FontAwesome name="users" size={25} color={_COLORS.Kodie_ExtraLightGrayColor} style={{marginRight:16}}/>
            <Text style={ChatsStyle.bottomSheetUserInfo}>Create Group</Text>
          </TouchableOpacity>
          <DividerIcon style={{ marginTop: 15 }} />
            <FlatList
              data={allUsers}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {
                  navigation.navigate('Chat', { data: item, userid: item.user_key });
                  bottomSheetRef.current.close();
                }
                } style={ChatsStyle.bottomSheetUserItem}>
                  {item.image ? (
                    <Image
                      source={{ uri: item.image }}
                      style={ChatsStyle.bottomSheetUserImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <FontAwesome
                      name="user-circle-o"
                      size={50}
                      color={_COLORS.Kodie_ExtraLightGrayColor}
                      style={ChatsStyle.bottomSheetUserIcon}
                    />
                  )}
                  <View>
                    <Text style={ChatsStyle.bottomSheetUserInfo}>{item.name}</Text>
                    <Text style={ChatsStyle.bottomSheetUserEmail}>{item.email}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </RBSheet>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chats;
