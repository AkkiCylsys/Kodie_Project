// import React, {useState, useEffect, useFocusEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Linking,
//   Alert,
// } from 'react-native';

// import {useIsFocused, CommonActions} from '@react-navigation/native';
// import {navigationRef} from '../../Navigation/AllRoutes/AllRoutes';
// import {useDispatch, useSelector} from 'react-redux';
// import {APICall, SignOut} from '../../ReduxToolKit/Actions/ApiAction';
// import {resetSomeSlices} from '../../ReduxToolKit/Actions/ActionDispatcherList';
// //import ApiCollection from '../../ReduxToolKit/ApiCollection/ApiCollection';

// import {
//   isANDROID,
//   wpPer,
//   hpPer,
//   WP,
//   HP,
// } from '../../Utilities/DimentionsUtillites';
// import {
//   CommonStyles,
//   ScrollViewStyles,
// } from '../../Themes/CommonStyles/CommonStyles';
// import {Image1, logos} from '../../Themes/CommonVectors/Images';
// import {colors} from '../../Themes/CommonColors/CommonColor';

// import {CustomizeLoader} from '../../Components/ActiveLoader/ActiveLoader';
// import PageGradientView from '../../Components/GradientViews/PageGradientView';

// import {
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from '@react-navigation/drawer';
// import Entypo from 'react-native-vector-icons/Entypo';
// import MacIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {fontFamily} from '../../Themes/FontStyle/FontStyle';

// const CustomeDrawer = props => {
//   const IsFocused = useIsFocused();
//   const dispatch = useDispatch();
//   // let {loginData, profileData} = useSelector(state => state.Login);
//   // let token = loginData?.data?.access_token || '';
//   // let token_type = loginData?.data?.token_type || 'Bearer';

//   const {loginInfo} = useSelector(state => state?.LoginDataSlices);
//   // console.log('loginInfo..........', loginInfo);

//   const [isLoading, setIsLoading] = useState(false);

//   const [selectedId, setselectedId] = useState('');
//   const [isUserFound, SetUserFound] = useState(false);
//   const [userinfo, setUserInfo] = useState({});
//   const [companyData, setCompanyData] = useState({});
//   const [companyImages, setCompanyImages] = useState('');

//   // useEffect(() => {
//   //   // getData();
//   //   return () => {
//   //     getcompanyDetails();
//   //   };
//   //   // }, []);
//   // }, [IsFocused]);

//   useEffect(() => {
//     // getcompanyDetails();
//     // getcompanyLogo();
//   }, [IsFocused]);

//   // useEffect(() => {
//   //   getcompanyDetails();
//   // }, []);

//   const check = data => {
//     switch (data) {
//       case 'LeaveTracker':
//         setselectedId('LeaveTracker');
//         props.navigation.navigate('LeaveTracker');
//         break;
//       case 'Home':
//         setselectedId('Home');
//         props.navigation.navigate('BottomNav', {
//           screen: 'HomeScreen',
//           params: {},
//         });
//         break;
//       default:
//         props.navigation.navigate('BottomNav', {
//           screen: 'HomeScreen',
//           params: {},
//         });
//         break;
//     }
//   };

//   const getData = async () => {
//     let getAllData = {};
//     try {
//       if (loginData?.success && token !== '') {
//         SetUserFound(true);
//         setUserInfo(getAllData);
//       } else {
//         SetUserFound(false);
//         setUserInfo({});
//         // throw {message: 'Username not found'};
//         console.log('Username not found.....');
//       }
//     } catch (error) {
//       console.error('error....', error);
//       SetUserFound(false);
//     }
//   };

//   const logout = () => {
//     setIsLoading(true);
//     SetUserFound(false);
//     setUserInfo({});
//     Alert.alert('Warning', 'Are you sure want to logout', [
//       {
//         text: 'OK',
//         onPress: () => {
//           resetSomeSlices();
//           // props.navigation.navigate('LoginVerify');
//           // props.navigation.navigate('AuthStackRouts');
//           // props.navigation.navigate('AuthStackRouts', {
//           //   screen: 'LoginVerify',
//           //   params: {},
//           // });
//           // props.navigation.dispatch(
//           //   CommonActions.reset({
//           //     index: 1,
//           //     routes: [{name: 'LoginVerify'}],
//           //   }),
//           // );
//           props.navigation.dispatch(
//             CommonActions.reset({
//               index: 1,
//               routes: [{name: 'LoginScreen'}],
//             }),
//           );
//           // navigationRef.current?.dispatch(
//           //   CommonActions.reset({
//           //     index: 1,
//           //     routes: [{name: 'AuthStackRouts'}],
//           //   }),
//           // );
//         },
//       },
//       {
//         text: 'Cancel',
//       },
//     ]);
//   };

 
//   return (
//     <PageGradientView statusColor={colors?.skyBlue}>
//       <View
//         style={{
//           marginHorizontal: WP(4),
//           marginTop: HP(2.3),
//           // alignItems: 'center',
//         }}>
//         <View style={[styles.imgContainer, styles.userimage, {}]}>
//           <Image
//             source={logos?.mainLogo}
//             resizeMode={'center'}
//             style={[styles.userimage, {alignSelf: 'center'}]}
//           />
//         </View>
//       </View>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={[
//           ScrollViewStyles?.scrollContainer,
//           {paddingTop: HP(3.8)},
//         ]}>
//         <View style={[ScrollViewStyles?.upperLayer]}>
//           <View style={styles.parameterview}>
//             <MacIcon
//               name={'home-outline'}
//               size={30}
//               color={colors?.fullWhite}
//             />
//             <TouchableOpacity
//               style={styles.TouchableText}
//               onPress={() => {
//                 check('Home');
//               }}>
//               <Text style={[styles.parameterText, {color: colors?.fullWhite}]}>
//                 {'Dashboard'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.parameterview}>
//             <MacIcon
//               name={'calendar-range'}
//               size={30}
//               color={colors?.fullWhite}
//             />
//             <TouchableOpacity
//               style={styles.TouchableText}
//               onPress={() => {
//                 check('LeaveTracker');
//               }}>
//               <Text style={[styles.parameterText, {color: colors?.fullWhite}]}>
//                 {'Leave Tracker'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={[ScrollViewStyles?.lowerLayer]}>
//           <View style={styles.parameterview}>
//             <MacIcon
//               name={'logout'}
//               size={30}
//               color={colors?.fullWhite}
//               style={{alignSelf: 'center'}}
//             />
//             <TouchableOpacity
//               style={styles.TouchableText}
//               onPress={() => {
//                 logout();
//               }}>
//               <Text style={[styles.parameterText, {color: colors?.fullWhite}]}>
//                 {'Logout'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </PageGradientView>
//   );
// };

// const styles = StyleSheet.create({
//   imgContainer: {
//     borderColor: colors?.grayShade,
//     marginHorizontal: wpPer('6%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   userimage: {
//     height: wpPer('15%'),
//     width: wpPer('15%'),
//     borderRadius: wpPer('15%') / 2,
//   },
//   parameterview: {
//     flexDirection: 'row',
//     marginHorizontal: WP(6),
//     marginVertical: HP(1),
//   },
//   parameterText: {
//     marginLeft: 5,
//     alignSelf: 'center',
//     fontSize: 16,
//     color: colors?.black,
//     fontFamily: fontFamily?.medium,
//   },

//   TouchableText: {alignSelf: 'center', marginLeft: WP(3)},
// });
// export default CustomeDrawer;
