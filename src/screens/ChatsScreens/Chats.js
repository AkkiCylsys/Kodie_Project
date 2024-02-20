import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import TopHeader from '../../components/Molecules/Header/Header';
import {_goBack} from '../../services/CommonServices';
import {_COLORS, IMAGES} from '../../Themes';
import Chat from '../../components/Molecules/Chats/Chat';
import {ChatsStyle} from './ChatsStyle';
import {Divider} from 'react-native-paper';
import SearchBar from '../../components/Molecules/SearchBar/SearchBar';
import RBSheet from 'react-native-raw-bottom-sheet';
// import UploadImageData from "../../components/Molecules/UploadImage/UploadImage";
import ChatPopup from '../../components/Molecules/Chats/ChatPop/ChatPopup';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
const Chats = props => {
  const refRBSheet = useRef();

  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginResponse.....', loginData);
  const toggleView = () => {
    setVisible(!visible);
  };
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    let tempData = [];
    firestore()
      .collection('Users')
      .where('email', '!=', loginData.Login_details.email)
      //   .onSnapshot(snapshot => {
      //     const usersData = [];
      //     snapshot.forEach(doc => {
      //       const data = doc.data();
      //       usersData.push(data);
      //     });
      //     setUsers(usersData);
      //   });

      // return () => unsubscribe();
      .get()
      .then(res => {
        if (res.docs != []) {
          res.docs.map(item => {
            tempData.push(item.data());
          });
        }
        setUsers(tempData);
      });
  }, []);

  console.log(users);
  return (
    <>
      <View style={ChatsStyle.container}>
        <TopHeader
          // onPressLeftButton={() => _goBack(props)}
          onPressLeftButton={() => props.navigation.navigate('Dashboard')}
          MiddleText={'Chats'}
        />
        {/* <ScrollView>
        
          <View style={ChatsStyle.maincontainer}>
            <View style={ChatsStyle.searchview}>
              <SearchBar
                filterImage={IMAGES.filter}
                frontSearchIcon
                marginTop={3}
              />
            </View>
            <TouchableOpacity
              style={ChatsStyle.componentview}
              onPress={() => {
                refRBSheet.current.open();
              }}
            >
              <Chat
                imagesource={IMAGES.userImage}
                heading="Tom’s property"
                description="Tom’s send file"
                time="11:30 PM"
              />
            </TouchableOpacity>
            <Divider style={ChatsStyle.divider} />

            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}
            >
              <Chat
                imagesource={IMAGES.userImage}
                heading="Fred’s property"
                description="You send an image"
                time="Yesterday"
              />
            </TouchableOpacity>
            <Divider style={ChatsStyle.divider} />

            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}
            >
              <Chat
                imagesource={IMAGES.userImage}
                heading="Ralph’s property"
                description="contractor send video"
                time="March 20"
              />
            </TouchableOpacity>
            <Divider style={ChatsStyle.divider} />
          </View>

          <RBSheet
            ref={refRBSheet}
            height={170}
            customStyles={{
              wrapper: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              draggableIcon: {
                backgroundColor: _COLORS.Kodie_LightGrayColor,
              },
              container: ChatsStyle.bottomModal_container,
            }}
          >
            <ChatPopup onPress={toggleView} />
          </RBSheet>
        </ScrollView> */}
        <FlatList
          data={users}
          renderItem={({item, index}) => {
            return (
              <View style={{flex: 1, marginHorizontal: 16}}>
                <TouchableOpacity
                  style={[
                    {
                      flex: 1,
                      width: '100%',
                      alignSelf: 'center',
                      marginTop: 20,
                      flexDirection: 'row',
                      borderWidth: 0.5,
                      borderRadius: 10,
                      paddingHorizontal: 20,
                      paddingVertical: 8,
                      alignItems: 'center',
                      backgroundColor: 'white',
                      borderWidth: 1,
                    },
                  ]}
                  onPress={() => {
                    navigation.navigate('Chat', {
                      data: item,
                      userid: item.user_key,
                    });
                  }}>
                  <Image
                    source={{uri: item.image.uri}}
                    // source={IMAGES.userImage}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                    }}
                  />
                  <Text
                    style={{
                      flex: 1,
                      color: 'black',
                      marginLeft: 20,
                      fontSize: 18,
                    }}>
                    {`${item.firstName} ${item.lastName}`}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

export default Chats;
