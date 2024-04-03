import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {IMAGES, _COLORS} from '../../Themes';
import DividerIcon from '../../components/Atoms/Devider/DividerIcon';
import {DrawerStyle} from './DrawerStyle';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {logoutActionCreator} from '../../redux/Actions/Authentication/AuthenticationApiCreator';
import {useDispatch, useSelector} from 'react-redux';

const CustomSidebarMenu = props => {
  const [selectedId, setselectedId] = useState('');
  const dispatch = useDispatch();
  const check = data => {
    switch (data) {
      case 'PropertyLinking':
        setselectedId('PropertyLinking');
        props.navigation.navigate('Properties');
        break;
      case 'RentalOffers':
        setselectedId('RentalOffers');
        // props.navigation.navigate('RantalOffer');
        Alert.alert('Rental Offers!', 'Coming soon');
        break;
      case 'vacantProperties':
        setselectedId('vacantProperties');
        // props.navigation.navigate('VacantPropertiesList');
        Alert.alert('Vacant Properties!', 'Coming soon');
        break;
      case 'Inspection':
        setselectedId('Inspection');
        // props.navigation.navigate('NewInspection');
        Alert.alert('Inspection!', 'Coming soon');

        break;
      case 'Tetants':
        setselectedId('Tetants');

        // props.navigation.navigate('TenantList'); // navigation to tenantList
        Alert.alert('Tetants!', 'Coming soon');
        break;
      case 'MaintenanceJobs':
        setselectedId('MaintenanceJobs');
        // props.navigation.navigate('Jobs');
        Alert.alert('Maintenance Jobs!', 'Coming soon');
        break;
      case 'Contractors':
        setselectedId('Contractors');
        Alert.alert('Contractors!', 'Coming soon');
        // props.navigation.navigate('Managingcontractors'); // navigation to managingContractor
        break;
      case 'Notices':
        setselectedId('Notices');
        // Alert.alert('Notices!', 'Coming soon');
        props.navigation.navigate('Notices');
        break;
      case 'Documents':
        setselectedId('Documents');
        props.navigation.navigate('EditProfile', {
          profileDoc: 'profileDoc',
        });

        break;
      case 'Reports':
        setselectedId('Reports');
        // props.navigation.navigate('Reports');
        Alert.alert('Reports!', 'Coming soon');
        break;
      case 'Partners':
        setselectedId('Partners');
        props.navigation.navigate('Partners');
        // props.navigation.navigate('ConfirmJobCompletion');
        break;
      // case 'Logout':
      //   setselectedId('LogOut');
      //   // props.navigation.navigate("LoginScreen");
      //   LogOut();
      //   break;

      default:
        setselectedId('Dashboard');
        break;
    }
  };
  const LogOut = () => {
    props.navigation.navigate('LoginScreen');
    setTimeout(() => {
      dispatch(logoutActionCreator());
    }, 3000);
    // props.navigation.navigate("DrawerNavigatorLeftMenu");
    // props.navigation.navigate("LoginScreen");
  };
  const handleGeneralSettingsPress = () => {
    Alert.alert('Alert', 'Coming soon');
  };
  return (
    <SafeAreaView style={DrawerStyle.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={DrawerStyle.Container}>
        <Text style={[DrawerStyle.HeaderText, {marginVertical: 5}]}>
          {'Properties'}
        </Text>
        {/* <TouchableOpacity
          style={[
            DrawerStyle.SubHeadingView,
            // {
            //   backgroundColor:
            //     selectedId == "PropertyLinking"
            //       ? _COLORS.Kodie_LiteWhiteColor
            //       : _COLORS.Kodie_WhiteColor,
            // },
          ]}
          onPress={() => check('PropertyLinking')}>
          <View style={DrawerStyle.IconView}>
            <MaterialCommunityIcons
              name="calendar-text-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
              style={{alignSelf: 'center'}}
            />
          </View>
          <Text style={DrawerStyle.SubHeading}>{"Property listings"}</Text>
        </TouchableOpacity> */}
        {/* <DividerIcon marginBottom={3} marginTop={5} /> */}
        <TouchableOpacity
          style={[
            DrawerStyle.rowFlex,
            // {
            //   backgroundColor:
            //     selectedId == "RentalOffers"
            //       ? _COLORS.Kodie_LiteWhiteColor
            //       : _COLORS.Kodie_WhiteColor,
            // },
          ]}
          onPress={() => check('RentalOffers')}>
          <View style={DrawerStyle.IconView}>
            <MaterialCommunityIcons
              name="calendar-arrow-left"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
              style={{alignSelf: 'center'}}
            />
          </View>
          <Text style={DrawerStyle.SubHeading}>{'Rental offers'}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />
        <TouchableOpacity
          style={[
            DrawerStyle.rowFlex,
            // {
            //   backgroundColor:
            //     selectedId == "vacantProperties"
            //       ? _COLORS.Kodie_LiteWhiteColor
            //       : _COLORS.Kodie_WhiteColor,
            // },
          ]}
          onPress={() => check('vacantProperties')}>
          <View style={DrawerStyle.IconView}>
            <Octicons
              name="shield-x"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
              style={{alignSelf: 'center', justifyContent: 'center'}}
            />
          </View>

          <Text style={DrawerStyle.SubHeading}>{'Vacant properties'}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />
        <TouchableOpacity
          style={[
            DrawerStyle.rowFlex,
            // {
            //   backgroundColor:
            //     selectedId == "Inspection"
            //       ? _COLORS.Kodie_LiteWhiteColor
            //       : _COLORS.Kodie_WhiteColor,
            // },
          ]}
          onPress={() => check('Inspection')}>
          <View style={DrawerStyle.IconView}>
            <MaterialCommunityIcons
              name="calendar-search"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
              style={{alignSelf: 'center'}}
            />
          </View>
          <Text style={DrawerStyle.SubHeading}>{'Inspections'}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />
        <TouchableOpacity
          style={[
            DrawerStyle.rowFlex,
            // {
            //   backgroundColor:
            //     selectedId == "Tetants"
            //       ? _COLORS.Kodie_LiteWhiteColor
            //       : _COLORS.Kodie_WhiteColor,
            // },
          ]}
          onPress={() => check('Tetants')}>
          <View style={DrawerStyle.IconView}>
            <MaterialCommunityIcons
              name="shield-account-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
              style={{alignSelf: 'center'}}
            />
          </View>
          <Text style={DrawerStyle.SubHeading}>{'Tenants'}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />

        <Text style={[DrawerStyle.HeaderText, {marginTop: 15}]}>{'Jobs'}</Text>
        <TouchableOpacity
          style={[
            DrawerStyle.SubHeadingView,
            // {
            //   backgroundColor:
            //     selectedId == "MaintenanceJobs"
            //       ? _COLORS.Kodie_LiteWhiteColor
            //       : _COLORS.Kodie_WhiteColor,
            // },
          ]}
          onPress={() => check('MaintenanceJobs')}
          // onPress={handleGeneralSettingsPress}
        >
          <View style={DrawerStyle.IconView}>
            <Feather
              name="list"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
              style={{alignSelf: 'center'}}
            />
          </View>
          <Text style={DrawerStyle.SubHeading}>{'Maintenance  jobs'}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />
        <TouchableOpacity
          style={[
            DrawerStyle.rowFlex,
            // {
            //   backgroundColor:
            //     selectedId == "Contractors"
            //       ? _COLORS.Kodie_LiteWhiteColor
            //       : _COLORS.Kodie_WhiteColor,
            // },
          ]}
          onPress={() => check('Contractors')}>
          <View style={DrawerStyle.IconView}>
            <MaterialIcons
              name="engineering"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
              style={{alignSelf: 'center'}}
            />
          </View>
          <Text style={DrawerStyle.SubHeading}>{'Contractors'}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />
        <Text style={[DrawerStyle.HeaderText, {marginTop: 15}]}>{'Other'}</Text>
        <TouchableOpacity
          style={[
            DrawerStyle.SubHeadingView,
            // {
            //   backgroundColor:
            //     selectedId == "Notices"
            //       ? _COLORS.Kodie_LiteWhiteColor
            //       : _COLORS.Kodie_WhiteColor,
            // },
          ]}
          onPress={() => check('Notices')}
          // onPress={handleGeneralSettingsPress}
        >
          <View style={DrawerStyle.IconView}>
            <Ionicons
              name="mail-unread-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
              style={{alignSelf: 'center'}}
            />
          </View>
          <Text style={DrawerStyle.SubHeading}>{'Notices & reminders'}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />

        <TouchableOpacity
          style={[
            DrawerStyle.rowFlex,
            // {
            //   backgroundColor:
            //     selectedId == "Documents"
            //       ? _COLORS.Kodie_LiteWhiteColor
            //       : _COLORS.Kodie_WhiteColor,
            // },
          ]}
          onPress={() => check('Documents')}>
          <View style={DrawerStyle.IconView}>
            <MaterialCommunityIcons
              name="file-download-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
              style={{alignSelf: 'center'}}
            />
          </View>
          <Text style={DrawerStyle.SubHeading}>{'Documents'}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />

        <TouchableOpacity
          style={[
            DrawerStyle.rowFlex,
            // {
            //   backgroundColor:
            //     selectedId == "Reports"
            //       ? _COLORS.Kodie_LiteWhiteColor
            //       : _COLORS.Kodie_WhiteColor,
            // },
          ]}
          onPress={() => check('Reports')}
          // onPress={handleGeneralSettingsPress}
        >
          <View style={DrawerStyle.IconView}>
            <MaterialIcons
              name="bar-chart"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
              style={{alignSelf: 'center'}}
            />
          </View>
          <Text style={DrawerStyle.SubHeading}>{'Reports'}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />
        <TouchableOpacity
          style={[
            DrawerStyle.rowFlex,
            // {
            //   backgroundColor:
            //     selectedId == "Partners"
            //       ? _COLORS.Kodie_LiteWhiteColor
            //       : _COLORS.Kodie_WhiteColor,
            // },
          ]}
          onPress={() => check('Partners')}
          // Navigate To Confirm Job
          // onPress={handleGeneralSettingsPress}
        >
          <View style={DrawerStyle.IconView}>
            <MaterialCommunityIcons
              name="seal"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
              style={{alignSelf: 'center'}}
            />
          </View>
          <Text style={DrawerStyle.SubHeading}>{'Partners'}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />
        {/* <TouchableOpacity
          style={[
            DrawerStyle.rowFlex,
            // {
            //   backgroundColor:
            //     selectedId == "Partners"
            //       ? _COLORS.Kodie_LiteWhiteColor
            //       : _COLORS.Kodie_WhiteColor,
            // },
          ]}
          onPress={() => check('Logout')}>
          <View style={DrawerStyle.IconView}>
            <MaterialCommunityIcons
              name="logout"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
              style={{alignSelf: 'center'}}
            />
          </View>
          <Text style={DrawerStyle.SubHeading}>{'Logout'}</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default CustomSidebarMenu;
