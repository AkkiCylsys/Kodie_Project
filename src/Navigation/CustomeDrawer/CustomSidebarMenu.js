import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {_COLORS} from '../../Themes';
import DividerIcon from '../../components/Atoms/Devider/DividerIcon';
import {DrawerStyle} from './DrawerStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {logoutActionCreator} from '../../redux/Actions/Authentication/AuthenticationApiCreator';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerActions} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
const CustomSidebarMenu = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const userRole = loginData?.Account_details[0]?.user_role_id;
  // const userRole = '2';
  const roleArray = userRole.split(',');
  const hasLandlordRole = roleArray.includes('3');
  const refRBSheet = useRef();
  const [selectedId, setselectedId] = useState('');
  const dispatch = useDispatch();
  const check = data => {
    switch (data) {
      case 'PropertyLinking':
        setselectedId('PropertyLinking');
        props.navigation.navigate('Properties');
        break;
      case 'MarketplacePropertyListing':
        setselectedId('MarketplacePropertyListing');
        props.navigation.navigate('MarketplacePropertyListing');
        break;
      case 'RentalOffers':
        setselectedId('RentalOffers');
        props.navigation.navigate('Properties', {
          tab3: 'tab3',
        });
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
        props.navigation.navigate('TenantScreening');
        break;
      case 'ManagingTenants':
        setselectedId('ManagingTenants');
        props.navigation.navigate('ManagingTenantsScreen');
        break;
      case 'MaintenanceJobs':
        setselectedId('MaintenanceJobs');
        Alert.alert('Maintenance Jobs!', 'Coming soon');
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
        Alert.alert('Reports!', 'Coming soon');
        break;
      case 'Partners':
        setselectedId('Partners');
        props.navigation.navigate('Partners');
        break;
      case 'Logout':
        setselectedId('LogOut');
        LogOut();
        break;

      default:
        setselectedId('Dashboard');
        break;
    }
  };
  const LogOut = () => {
    props.navigation.dispatch(DrawerActions.closeDrawer());
    props.navigation.navigate('LoginScreen');
    setTimeout(() => {
      dispatch(logoutActionCreator());
    }, 3000);
    refRBSheet.current.close();
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
        {hasLandlordRole ? (
          <>
            <TouchableOpacity
              style={[DrawerStyle.SubHeadingView]}
              onPress={() => check('MarketplacePropertyListing')}>
              <View style={DrawerStyle.IconView}>
                <MaterialCommunityIcons
                  name="calendar-text-outline"
                  size={25}
                  color={_COLORS.Kodie_GreenColor}
                  resizeMode={'contain'}
                  style={{alignSelf: 'center'}}
                />
              </View>
              <Text style={DrawerStyle.SubHeading}>{'Property listings'}</Text>
            </TouchableOpacity>
            <DividerIcon marginBottom={3} marginTop={5} />
          </>
        ) : null}

        <TouchableOpacity
          style={[DrawerStyle.rowFlex]}
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
        {hasLandlordRole ? (
          <>
            <TouchableOpacity
              style={[DrawerStyle.rowFlex]}
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
          </>
        ) : null}

        <TouchableOpacity
          style={[DrawerStyle.rowFlex]}
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
          style={[DrawerStyle.rowFlex]}
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
        {hasLandlordRole ? (
          <>
            <TouchableOpacity
              style={[DrawerStyle.rowFlex]}
              onPress={() => check('ManagingTenants')}>
              <View style={DrawerStyle.IconView}>
                <MaterialCommunityIcons
                  name="shield-account"
                  size={25}
                  color={_COLORS.Kodie_GreenColor}
                  resizeMode={'contain'}
                  style={{alignSelf: 'center'}}
                />
              </View>
              <Text style={DrawerStyle.SubHeading}>{'Managing tenants'}</Text>
            </TouchableOpacity>
            <DividerIcon marginBottom={3} marginTop={5} />
          </>
        ) : null}

        <Text style={[DrawerStyle.HeaderText, {marginTop: 15}]}>{'Jobs'}</Text>
        <TouchableOpacity
          style={[DrawerStyle.SubHeadingView]}
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
          style={[DrawerStyle.rowFlex]}
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
          style={[DrawerStyle.SubHeadingView]}
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
          style={[DrawerStyle.rowFlex]}
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
          style={[DrawerStyle.rowFlex]}
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
          style={[DrawerStyle.rowFlex]}
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
          style={[DrawerStyle.rowFlex]}
          onPress={() => {
            refRBSheet.current.open();
          }}>
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
        <DividerIcon marginBottom={3} marginTop={5} />
        <RBSheet
          ref={refRBSheet}
          height={150}
          closeOnDragDown={false}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: DrawerStyle.bottomModal_container,
          }}>
          <View style={DrawerStyle.popupcantainer}>
            <Text style={DrawerStyle.popuptext}>Logout from device ?</Text>
            <MaterialIcons
              name="close"
              size={24}
              color="black"
              onPress={() => {
                refRBSheet.current.close();
              }}
              style={{marginTop: 8}}
            />
          </View>
          <View style={DrawerStyle.ViewBtn}>
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.close();
              }}
              style={{height: 68}}>
              <Text style={DrawerStyle.CancelBtn}>Cancel</Text>
            </TouchableOpacity>
            <View style={{margin: 5}} />
            <TouchableOpacity
              onPress={LogOut}
              // onPress={check('Logout')}
              style={{height: 68, alignSelf: 'center'}}>
              <Text style={DrawerStyle.LogoutBtn}>Logout</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </ScrollView>
    </SafeAreaView>
  );
};
export default CustomSidebarMenu;
