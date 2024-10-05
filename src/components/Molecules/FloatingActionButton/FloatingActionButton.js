import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Alert} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {_COLORS, IMAGES} from '../../../Themes';
// import { withNavigation } from 'react-navigation';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const actions = [
  {
    text: 'Add property',
    icon: IMAGES.AddProperty,
    name: 'add_Property',
    position: 2,
    color: _COLORS.Kodie_GreenColor,
    textElevation: 0,
    textBackground: 'transparent',
    textProps: {
      style: {fontWeight: 'bold', color: _COLORS.Kodie_WhiteColor},
    },
  },
  {
    text: 'Edit dashboard',
    icon: IMAGES.EditDashboard,
    name: 'edit_Dashboard',
    position: 1,
    color: _COLORS.Kodie_GreenColor,
    textElevation: 0,
    textBackground: 'transparent',
    textProps: {
      style: {fontWeight: 'bold', color: _COLORS.Kodie_WhiteColor},
    },
  },
  {
    text: 'Invite prospective tenant',
    icon: IMAGES.InviteProspectiveTenant,
    name: 'invite_Prospective_tenant',
    position: 3,
    color: _COLORS.Kodie_GreenColor,
    textElevation: 0,
    textBackground: 'transparent',
    textProps: {
      style: {fontWeight: 'bold', color: _COLORS.Kodie_WhiteColor},
    },
  },
  {
    text: 'Invite contractor',
    icon: IMAGES.InviteContractor,
    name: 'invite_Contract...',
    position: 4,
    color: _COLORS.Kodie_GreenColor,
    textElevation: 0,
    textBackground: 'transparent',
    textProps: {
      style: {fontWeight: 'bold', color: _COLORS.Kodie_WhiteColor},
    },
  },
  {
    text: 'Add notice / reminder',
    icon: IMAGES.AddNoticeReminder,
    name: 'Add_Notice_Reminder',
    position: 5,
    // color: '#37bc12',
    color: _COLORS.Kodie_GreenColor,
    textElevation: 0,
    textBackground: 'transparent',
    textProps: {
      style: {fontWeight: 'bold', color: _COLORS.Kodie_WhiteColor},
    },
  },
  {
    text: 'Create new job',
    icon: IMAGES.CreateNewJob,
    name: 'Create_new_job',
    position: 6,
    color: _COLORS.Kodie_GreenColor,
    textElevation: 0,
    textBackground: 'transparent',
    textProps: {
      style: {fontWeight: 'bold', color: _COLORS.Kodie_WhiteColor},
    },
  },
];

const FloatingActionButton = props => {
  const navigation = useNavigation();
  const loginData = useSelector(state => state.authenticationReducer.data);
  const userRole = loginData?.Account_details?.[0]?.user_role_id;
  console.log(loginData, 'loginData');
  // const userRole = '4,3';
  const roleArray = userRole ? userRole.split(',') : [];

  const hasTenantRole = roleArray.includes('2');
  const hasLandlordRole = roleArray.includes('3');
  const hasContractor = roleArray.includes('4');

  // Conditionally filter actions based on roles
  const filteredActions = actions.filter(action => {
    if (action.name === 'add_Property' && !hasLandlordRole) {
      return false; // Hide "Add property" if user is not a Landlord
    }
    return true;
  });

  const handleActionPress = name => {
    switch (name) {
      case 'add_Property':
        navigation.navigate('PropertyDetails');
        console.log('pressed');
        break;
      case 'Create_new_job':
        navigation.navigate('CreateJobFirstScreen');
        break;
      case 'Add_Notice_Reminder':
        navigation.navigate('AddNotices');
        break;
      default:
        break;
    }
  };
  return (
    // <FloatingAction
    //   actions={actions}
    //   actionsPaddingTopBottom={6}
    //   color={_COLORS.Kodie_GreenColor}
    //   onPressItem={(name) => {
    //     handleActionPress(name)
    //   }}
    //   overlayColor="rgba(0, 0, 0, 0.5)"
    // />

    <FloatingAction
      actions={filteredActions} // Use the filtered actions
      actionsPaddingTopBottom={6}
      color={_COLORS.Kodie_GreenColor}
      onPressItem={name => handleActionPress(name)}
      overlayColor="rgba(0, 0, 0, 0.5)"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_ExtraLiteWhiteColor,
    zIndex: -5,
  },
});

export default FloatingActionButton;
