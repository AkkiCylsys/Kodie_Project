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
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import TopHeader from '../../components/Molecules/Header/Header';
import { IMAGES, _COLORS } from '../../Themes';
import SearchBar from '../../components/Molecules/SearchBar/SearchBar';
import { ChatsStyle } from './ChatsStyle';

const Chats = (props) => {
  const refRBSheet = useRef();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const loginData = useSelector(state => state.authenticationReducer.data);
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (loginData && loginData.Login_details && loginData.Login_details.email) {
      let tempData = [];
      firestore()
        .collection('Users')
        .where('email', '!=', loginData.Login_details.email)
        .get()
        .then(res => {
          if (res.docs.length > 0) {
            res.docs.forEach(doc => {
              tempData.push(doc.data());
            });
          }
          setUsers(tempData);
        })
        .catch(error => console.error('Error fetching users:', error));
    }
  }, [loginData]); // Dependency array to run effect on loginData changes

  const searchPropertyList = (query) => {
    setSearchQuery(query);
    const filtered = query
      ? users.filter(item =>
          item.name && item.name.toLowerCase().includes(query.toLowerCase())
        )
      : users;
    setFilteredUsers(filtered);
  };

  return (
    <>
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
              searchData={searchPropertyList}
              textvalue={searchQuery}
            />
          </View>
          <ScrollView>
            <FlatList
              data={searchQuery ? filteredUsers : users}
              renderItem={({ item }) => (
                <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'white',
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      marginTop: 10,
                    }}
                    onPress={() => {
                      navigation.navigate('Chat', { data: item, userid: item.user_key });
                    }}>
                    {item.image ? (
                      <Image
                        source={{ uri: item.image }}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          marginRight: 10,
                          borderWidth: 1,
                          borderColor: _COLORS.Kodie_ExtraLightGrayColor,
                        }}
                        resizeMode="cover"
                      />
                    ) : (
                      <FontAwesome
                        name="user-circle-o"
                        size={50}
                        color={_COLORS.Kodie_ExtraLightGrayColor}
                        style={{ marginRight: 10 }}
                      />
                    )}
                    <View>
                      <Text style={{ fontSize: 18, color: 'black' }}>{item.name}</Text>
                      <Text style={{ fontSize: 14, color: _COLORS.Kodie_BlackColor }}>{item.email}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Chats;
