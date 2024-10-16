import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, SafeAreaView, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { _COLORS } from '../../Themes';
import { CreateGroupStyle } from './CreateGroupStyle';
import SearchBar from '../../components/Molecules/SearchBar/SearchBar';
import TopHeader from '../../components/Molecules/Header/Header';
import { _goBack } from '../../services/CommonServices';
import CustomSingleButton from '../../components/Atoms/CustomButton/CustomSingleButton';

const CreateGroup = (props) => {
  const [groupName, setGroupName] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigation = useNavigation();
  const loginData = useSelector(state => state.authenticationReducer.data);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersSnapshot = await firestore().collection('Users').get();
      const allUsers = usersSnapshot.docs.map(doc => ({ ...doc.data(), user_id: doc.id })); // Make sure user_id is used
      setUsers(allUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const toggleUserSelection = (user) => {
    if (selectedUsers.some(u => u.user_id === user.user_id)) {
      setSelectedUsers(selectedUsers.filter(u => u.user_id !== user.user_id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      alert('Please enter a group name');
      return;
    }
  
    if (selectedUsers.length === 0) {
      alert('Please select at least one user to add to the group');
      return;
    }
  
    try {
      // Add the group creator to the selected users list
      const creatorUser = {
        user_id: loginData.Login_details.user_id, // Creator's user_id
        userName: loginData.Login_details.user_name || 'Unknown', // Ensure userName is provided for creator
      };
  
      const newGroup = {
        groupName,
        members: [
          creatorUser, // Add the creator to the members list
          ...selectedUsers.map(user => ({
            user_id: user.user_key, // Use user_key for other members
            userName: user.name || 'Unknown', // Include user name for other members
          })),
        ],
        createdBy: loginData.Login_details.user_id,
        createdAt: firestore.FieldValue.serverTimestamp(), // Correct usage of serverTimestamp
      };
  
      console.log(JSON.stringify(newGroup));
  
      await firestore().collection('groups').add(newGroup);
      alert('Group created successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create group. Please try again.');
    }
  };
  
  return (
    <SafeAreaView style={CreateGroupStyle.container}>
    <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Create Group'}
      />
        <View style={{ flex: 1, marginHorizontal: 16, marginTop: 16 }}>
      <TextInput
        style={CreateGroupStyle.input}
        placeholder="Enter Group Name"
        value={groupName}
        onChangeText={setGroupName}
      />
     
      <FlatList
        data={users}
        keyExtractor={(item) => item.user_id} // Use user_id here
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              CreateGroupStyle.userItem,
              selectedUsers.some(u => u.user_id === item.user_id) ? CreateGroupStyle.selectedUserItem : null,
            ]}
            onPress={() => toggleUserSelection(item)}
          >
            {/* <FontAwesome name="user-circle-o" size={40} color={_COLORS.Kodie_ExtraLightGrayColor} /> */}
            {item.image ? (
                    <Image
                      source={{ uri: item.image }}
                      style={CreateGroupStyle.bottomSheetUserImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <FontAwesome
                      name="user-circle-o"
                      size={50}
                      color={_COLORS.Kodie_ExtraLightGrayColor}
                      style={CreateGroupStyle.bottomSheetUserIcon}
                    />
                  )}
            <View >
            <Text style={CreateGroupStyle.userName}>{item.name}</Text>
            <Text style={CreateGroupStyle.EmailStyle}>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <CustomSingleButton
              _ButtonText={'Create Group'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              onPress={handleCreateGroup}
            />
      {/* <TouchableOpacity
        style={CreateGroupStyle.createButton}
        onPress={handleCreateGroup}
      >
        <Text style={CreateGroupStyle.createButtonText}>Create Group</Text>
      </TouchableOpacity> */}
    </View>

    </SafeAreaView>
  );
};

export default CreateGroup;
