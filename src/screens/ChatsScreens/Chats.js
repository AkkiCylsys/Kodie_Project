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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Chats = props => {
  const refRBSheet = useRef();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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
  const searchPropertyList = query => {
    setSearchQuery(query);
    const filtered = query
      ? users.filter(
          item =>
            item.name && item.name.toLowerCase().includes(query.toLowerCase()),
        )
      : users;
    console.log('filtered.........', filtered);
    setFilteredUsers(filtered);
  };

  return (
    <>
      <View style={ChatsStyle.container}>
        <TopHeader
          // onPressLeftButton={() => _goBack(props)}
          onPressLeftButton={() => props.navigation.navigate('Dashboard')}
          MiddleText={'Chats'}
        />
        <View style={ChatsStyle.searchview}>
          <SearchBar
            filterImage={IMAGES.filter}
            frontSearchIcon
            marginTop={3}
            searchData={searchPropertyList}
            textvalue={searchQuery}
          />
        </View>
        <ScrollView>
          <FlatList
            data={searchQuery ? filteredUsers : users}
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

                        borderRadius: 10,
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                        alignItems: 'center',
                        backgroundColor: 'white',
                      },
                    ]}
                    onPress={() => {
                      navigation.navigate('Chat', {
                        data: item,
                        userid: item.user_key,
                      });
                    }}>
                    {item.image ? (
                      <Image
                        source={{uri: item.image.uri}}
                        // source={IMAGES.adduser}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          borderWidth: 1,
                        }}
                        resizeMode={'cover'}
                      />
                    ) : (
                      <FontAwesome
                        name="user-circle-o"
                        size={50}
                        color={_COLORS.Kodie_ExtraLightGrayColor}
                      />
                    )}
                    {/* <FontAwesome
                      name="user-circle-o"
                      size={50}
                      color={_COLORS.Kodie_ExtraLightGrayColor}
                    /> */}

                    <View>
                      <Text
                        style={{
                          flex: 1,
                          color: 'black',
                          marginLeft: 10,
                          fontSize: 18,
                        }}>
                        {/* {`${item.firstName} ${item.lastName}`} */}
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          flex: 1,
                          color: _COLORS.Kodie_BlackColor,
                          marginLeft: 10,
                          fontSize: 14,
                        }}>
                        {/* {`${item.firstName} ${item.lastName}`} */}
                        {item.email}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default Chats;
