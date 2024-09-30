import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import TopHeader from '../../../components/Molecules/Header/Header';
import { AccountStyle } from './AccountStyle';
import RowTab from '../../../components/Molecules/RowTab/RowTab';
import { _goBack } from '../../../services/CommonServices/CommonMethods';

const AccountSetting = (props) => {
  const handleNavigation = (route) => {
    props.navigation.navigate(route);
  };

  const handleGeneralSettingsPress = () => {
    Alert.alert('Alert', 'Coming soon');
  };

  const renderRowTab = (iconName, iconLibrary, text, subText, onPress, isDivider = true) => (
    <TouchableOpacity onPress={onPress}>
      <RowTab
        isSecondRowText={true}
        LeftIconName={iconName}
        LeftIconLibrary={iconLibrary}
        TabTaxt={text}
        TabSubTaxt={subText}
        IsDivider={isDivider}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={AccountStyle.Mainview}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText="Account"
      />
      <ScrollView>
        {renderRowTab(
          'settings-outline',
          'Ionicons',
          'General account settings',
          'Currency symbol, tax rate, time zone',
          handleGeneralSettingsPress
        )}
        {renderRowTab(
          'dollar',
          'Foundation',
          'Autopayment set up',
          'Configure autopayment for rentals & deposits',
          handleGeneralSettingsPress
        )}
        {renderRowTab(
          'payment',
          'MaterialIcons',
          'Kodie payment methods',
          'Add or edit payment methods',
          handleGeneralSettingsPress
        )}
        {renderRowTab(
          'pencil',
          'SimpleLineIcons',
          'Change Contact Details',
          'Update personal contact information',
          () => handleNavigation('ChangeContactInput')
        )}
        {renderRowTab(
          'delete',
          'AntDesign',
          'Delete account',
          'Delete your account',
          () => handleNavigation('DeleteAccount'),
          false
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountSetting;
