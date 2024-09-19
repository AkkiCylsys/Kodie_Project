import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, SafeAreaView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { _COLORS } from '../../Themes';
import { CreateGroupStyle } from './CreateGroupStyle';

const CreateGroup = () => {
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
      const newGroup = {
        groupName,
        members: selectedUsers.map(user => ({
          
          user_id: user.user_key, // Use user_id here
          userName: user.name,   // Include user name
        })),
        createdBy: loginData.Login_details.user_id,
        createdAt: firestore.FieldValue.serverTimestamp(),
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
      <Text style={CreateGroupStyle.title}>Create Group</Text>
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
            <FontAwesome name="user-circle-o" size={40} color={_COLORS.Kodie_ExtraLightGrayColor} />
            <View >
            <Text style={CreateGroupStyle.userName}>{item.name}</Text>
            <Text style={CreateGroupStyle.EmailStyle}>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={CreateGroupStyle.createButton}
        onPress={handleCreateGroup}
      >
        <Text style={CreateGroupStyle.createButtonText}>Create Group</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateGroup;
