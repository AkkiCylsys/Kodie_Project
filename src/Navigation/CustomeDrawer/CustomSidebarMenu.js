import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
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
        props.navigation.navigate('RantalOffer');
        break;
      case 'vacantProperties':
        setselectedId('vacantProperties');
        props.navigation.navigate('VacantPropertiesList');
        break;
      case 'Inspection':
        setselectedId('Inspection');
        props.navigation.navigate('NewInspection');
        break;
      case 'Tetants':
        setselectedId('Tetants');
        // props.navigation.navigate("TwoStepVerification");
        props.navigation.navigate('TenantList');
        break;
      case 'MaintenanceJobs':
        setselectedId('MaintenanceJobs');
        props.navigation.navigate('Jobs');
        break;
      case 'Contractors':
        setselectedId('Contractors');
        props.navigation.navigate('Managingcontractors');
        break;
      case 'Notices':
        setselectedId('Notices');
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
        props.navigation.navigate('Reports');
        break;
      case 'Partners':
        setselectedId('Partners');
        // props.navigation.navigate("Partners");
        props.navigation.navigate('ConfirmJobCompletion');
        break;
      case 'Logout':
        setselectedId('LogOut');
        // props.navigation.navigate("LoginScreen");
        LogOut();
        break;

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
  return (
    <SafeAreaView style={DrawerStyle.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={DrawerStyle.Container}>
        <Text style={DrawerStyle.HeaderText}>{'Properties'}</Text>
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
          onPress={() => check('MaintenanceJobs')}>
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
          onPress={() => check('Notices')}>
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
          onPress={() => check('Reports')}>
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
          onPress={() => check('Partners')}>
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
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default CustomSidebarMenu;
