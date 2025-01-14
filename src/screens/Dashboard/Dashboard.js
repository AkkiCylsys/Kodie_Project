import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  Modal,
  Alert,
  SafeAreaView,
} from 'react-native';

import {userSubscribedCreator} from '../../redux/Actions/Subscription/SubscriptionApiCreator';
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {DashboardStyle} from './DashboardStyle';
import TopHeader from '../../components/Molecules/Header/Header';
import {_goBack} from '../../services/CommonServices';
import {Dropdown} from 'react-native-element-dropdown';
import {IMAGES, SMALLICON, _COLORS} from '../../Themes/index';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomSingleButton from '../../components/Atoms/CustomButton/CustomSingleButton';
import DeshboardNotice from '../../components/Molecules/deshboardNoice/DeshboardNotice';
import {LineChart} from 'react-native-chart-kit';
import {Card} from 'react-native-paper';
import {logos} from '../../Themes/CommonVectors/Images';
import CircleProgress from '../../components/Molecules/CircleProgress/CircleProgress';
import SelectProperties from '../../components/Molecules/SelectProperties/SelectProperties';
import SelectDate from '../../components/Molecules/SelectDate/SelectDate';
import RBSheet from 'react-native-raw-bottom-sheet';
import {BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FloatingActionButton from '../../components/Molecules/FloatingActionButton/FloatingActionButton';
import {Config} from '../../Config';
import {useIsFocused, CommonActions} from '@react-navigation/native';
import {onPress} from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';
import {setToken} from '../../services/TokenManagments';
import axiosInstance from '../../services/axiosInstance';
import {useCallback} from 'react';

const IncomeData = [
  {
    id: '1',
    icm_heading: 'Income',
    percentage: '+2.5%',
    price: '$0',
    compare_text: 'Compared to ($10 000 last month)',
  },
  {
    id: '2',
    icm_heading: 'Expenses',
    percentage: '-1.5%',
    price: '$0',
    compare_text: 'Compared to ($10 000 last month)',
  },
  {
    id: '3',
    icm_heading: 'Profit',
    percentage: '+2.5%',
    price: '$0',
    compare_text: 'Compared to ($10 000 last month)',
  },
];
const Notice = [
  {
    id: '1',
    image: IMAGES.redLine,
    notice: 'Lease agreement expiring in 30 days',
    location: '2118 Thornridge Cir. Syracuse,',
  },
  {
    id: '2',
    image: IMAGES.greenLine,
    notice: 'Pre move inspection due',
    location: '8502 Preston Rd. Inglewood',
  },
  {
    id: '3',
    image: IMAGES.blueLine,
    notice: 'Post move inspection due',
    location: '65 Mountain View Parade',
  },
];

const data = [
  {label: 'India', value: '1'},
  {label: 'Australia', value: '2'},
  {label: 'America', value: '3'},
];

export default Dashboard = props => {
  const signUp_account_response = useSelector(
    state => state?.authenticationReducer?.data,
  );

  // console.log('signUp_account_response.....', signUp_account_response);
  const singup_Data = signUp_account_response;
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [upsheet, setUpsheet] = useState('');
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState('');
  const dispatch = useDispatch();
  const isvisible = useIsFocused();
  const handlegetCalenderid = Calenderid => {
    console.log('Calenderid....', Calenderid);
    setUpsheet(Calenderid);
  };
  const CloseUp = () => {
    refRBSheet.current.close();
    setOverlayVisible(false);
  };
  const loginData = useSelector(state => state.authenticationReducer.data);
  const SubscriptionData = useSelector(
    state => state.subscriptionReducer.data?.data,
  );
  useFocusEffect(
    useCallback(() => {
      // fetchData();

      const handleBackPress = () => {
        if (navigation.isFocused()) {
          BackHandler.exitApp();
          return true;
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, [navigation]),
  );
  const token = loginData?.Login_details?.token; // Get this from your login process
  const deviceId = loginData?.Login_details?.device_id; // Get this from device information
  const deviceType = loginData?.Login_details?.device_os_type || loginData?.Login_details?.device_type;

  console.log("token..",token)
  console.log("deviceId..",deviceId)
  console.log("deviceType..",deviceType)

  useEffect(() => {
    if (loginData?.Login_details?.user_id) {
      fetchData();
    }
  }, [loginData?.Login_details?.user_id]);

  const fetchData = async () => {
    if (
      loginData?.Login_details?.user_id ||
      loginData?.Login_details?.user_account_id
    ) {
      await setToken(token, deviceId, deviceType);
      await getPersonalDetails();
      await handleprofileCompletion();
      await check_subscription();

      // Save token, device ID, and device type
    }
  };

  const handleprofileCompletion = async () => {
    const url = Config.BASE_URL;
    const profileCompletion_url = 'Profile_Completion';
    console.log('requested url..', profileCompletion_url);
    setIsLoading(true);
    const profileCompletion_urlBody = {
      user_id: loginData?.Login_details?.user_id,
    };
    await axiosInstance
      .post(profileCompletion_url, profileCompletion_urlBody)
      .then(response => {
        console.log('profileCompletion response....', response?.data);
        setProfileCompletion(response?.data?.data[0]?.result);
        let profile_Completion = response?.data?.data[0]?.result;
        console.log('profileCompletion..', response?.data?.data[0]?.result);
        const profileValueWithoutPercent = profile_Completion.replace('%', '');
        const progressValue = profileValueWithoutPercent / 100;
        console.log('progressValue7...', progressValue);
        setProgressPercentage(progressValue);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('profileCompletion error...', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const check_subscription = async () => {
    let check_Subs = {
      account_id: loginData?.Login_details?.user_account_id,
    };
    console.log('checkid99', check_Subs);
    const res = await dispatch(userSubscribedCreator(check_Subs));
  };

  const Income_render = ({item, index}) => {
    return (
      <>
        <View style={DashboardStyle.income_Box_View}>
          <View style={DashboardStyle.inc_view}>
            <Text style={DashboardStyle.income_text}>{item.icm_heading}</Text>
            <Text style={DashboardStyle.income_percent}>{item.percentage}</Text>
            <TouchableOpacity>
              <AntDesign
                name="arrowup"
                size={20}
                color={_COLORS.Kodie_ExtralightGreenColor}
              />
            </TouchableOpacity>
          </View>
          <Text style={DashboardStyle.Price_Text}>{item.price}</Text>
          <Text style={DashboardStyle.compare_Text}>{item.compare_text}</Text>
        </View>
      </>
    );
  };
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  };

  const NoticeData = ({item, index}) => {
    return (
      <>
        <View style={DashboardStyle.pdf_container}>
          <View style={DashboardStyle.pdfInfo}>
            <Image source={item.image} style={DashboardStyle.lines} />
            <View style={DashboardStyle.textContainer}>
              <Text
                style={DashboardStyle.note}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.notice}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={DashboardStyle.crossIcon}>
            <Entypo
              name="chevron-small-right"
              size={20}
              color={_COLORS.Kodie_BlackColor}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  const userProfileImageUri =
    loginData?.Login_details?.profile_photo_path ||
    signUp_account_response?.Login_details?.profile_photo_path;
  const getPersonalDetails = async () => {
    setIsLoading(true);
    const url = Config.BASE_URL;
    const apiUrl = `getAccount_details/${loginData?.Login_details?.user_account_id}`;
    console.log('PersonalDetails_url..', apiUrl);
    await axiosInstance
      .get(apiUrl)
      .then(response => {
        console.log('API Response:', response?.data?.data[0]);
        if (
          response?.data?.data &&
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          setAccountDetails(response?.data?.data[0]);
        } else {
          console.error('Invalid response data format:', response?.data);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('API Error PersonalDetails Dash:', error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <SafeAreaView style={DashboardStyle.mainContainer}>
        <TopHeader
          isMiddleImage={true}
          IsNotification={true}
          isprofileImage
          MiddleImage={logos.mainLogo}
          leftImage={'menu'}
          MiddleText={'Kodie'}
          Text_Color={_COLORS.Kodie_BlackColor}
          onPressLeftButton={() => props.navigation.openDrawer()}
          onPressRightImgProfile={() =>
            props.navigation.navigate('LandlordProfile')
          }
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <DeshboardNotice
            PerprofileCompletion={profileCompletion}
            progressPercentage={progressPercentage}
            ShowUpgradeButton={
              SubscriptionData?.status == 'active' ? false : true
            }
            onClose={CloseUp}
            onPress={() => {
              props.navigation.navigate('ManageSubscription');
            }}
            continue={() => {
              props.navigation.navigate('EditProfile');
            }}
          />
          <View style={DashboardStyle.container}>
            <Text style={DashboardStyle.Name_Text}>{`Hi ${
              accountDetails?.UAD_FIRST_NAME || ''
            }! `}</Text>
            <Text style={DashboardStyle.welcome_Text}>{'Welcome Back'}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Dropdown
                style={[DashboardStyle.dropdown, {flex: 1}]}
                placeholderStyle={DashboardStyle.placeholderStyle}
                selectedTextStyle={DashboardStyle.selectedTextStyle}
                inputSearchStyle={DashboardStyle.inputSearchStyle}
                iconStyle={DashboardStyle.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={truncateText('All Properties', 12)}
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />

              <Dropdown
                style={[DashboardStyle.dropdown, {flex: 1}]}
                placeholderStyle={DashboardStyle.placeholderStyle}
                selectedTextStyle={DashboardStyle.selectedTextStyle}
                inputSearchStyle={DashboardStyle.inputSearchStyle}
                iconStyle={DashboardStyle.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={truncateText('Year to date', 12)}
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
            <Card style={DashboardStyle.card}>
              <Card.Content>
                <View style={DashboardStyle.headerView}>
                  <Text style={DashboardStyle.header}>Cash flow overview</Text>
                  <TouchableOpacity>
                    <Entypo
                      name={'dots-three-horizontal'}
                      size={20}
                      color={_COLORS.Kodie_GrayColor}
                      style={DashboardStyle.icon}
                    />
                  </TouchableOpacity>
                </View>
                <LineChart
                  data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
                    datasets: [
                      {
                        data: [
                          Math.random(),
                          Math.random() * 0,
                          Math.random() * 0,
                          Math.random() * 0,
                          Math.random() * 0,
                        ],
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width - 56} // from react-native
                  height={160}
                  yAxisLabel={'$'}
                  chartConfig={{
                    backgroundColor: _COLORS.Kodie_WhiteColor,
                    backgroundGradientFrom: _COLORS.Kodie_WhiteColor,
                    backgroundGradientTo: _COLORS.Kodie_WhiteColor,
                    color: (opacity = 255) => `	rgb(0, 0, ${opacity})`,
                  }}
                  bezier
                  style={DashboardStyle.lineChartStl}
                />
                <View style={DashboardStyle.chartfooterView}>
                  <View style={DashboardStyle.headerView}>
                    <View style={DashboardStyle.incomeBox} />
                    <Text style={DashboardStyle.incomeText}>Total income</Text>
                  </View>
                  <View style={DashboardStyle.headerView}>
                    <View style={DashboardStyle.expBox} />
                    <Text style={DashboardStyle.incomeText}>
                      Total expenses
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>

            <View>
              <CircleProgress />
            </View>

            <View>
              <FlatList
                data={IncomeData}
                scrollEnabled
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{}}
                keyExtractor={item => item?.id}
                renderItem={Income_render}
              />
            </View>

            <View style={DashboardStyle.maintenance_statusView}>
              <View style={DashboardStyle.maintenance_view}>
                <Text style={DashboardStyle.maintenance_Text}>
                  {'Maintenance status'}
                </Text>
                <TouchableOpacity
                // onPress={() => {
                //   setModalVisible(true);
                // }}
                >
                  <Entypo
                    name="dots-three-horizontal"
                    size={20}
                    color={_COLORS.Kodie_GrayColor}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <View style={DashboardStyle.maintenance_main_menu}>
                  <View style={DashboardStyle.maintenance_menu}>
                    <View>
                      <AntDesign
                        name="infocirlce"
                        size={18}
                        color={_COLORS.Kodie_yellow}
                      />
                      <Text style={DashboardStyle.maintenance_sts_NOText}>
                        {'0'}
                      </Text>
                    </View>

                    <Text style={DashboardStyle.request_Text}>
                      {'Requested'}
                    </Text>
                  </View>

                  <View style={DashboardStyle.maintenance_menu}>
                    <View>
                      <AntDesign
                        name="checkcircle"
                        size={18}
                        color={_COLORS.Kodie_GreenColor}
                      />
                      <Text style={DashboardStyle.maintenance_sts_NOText}>
                        {'0'}
                      </Text>
                    </View>
                    <Text style={DashboardStyle.request_Text}>
                      {'Approved'}
                    </Text>
                  </View>
                  <View style={DashboardStyle.maintenance_menu}>
                    <View>
                      <Entypo
                        name="circle-with-cross"
                        size={18}
                        color={_COLORS.Kodie_redColor}
                      />
                      <Text style={DashboardStyle.maintenance_sts_NOText}>
                        {'0'}
                      </Text>
                    </View>

                    <Text style={DashboardStyle.request_Text}>
                      {'Rejected'}
                    </Text>
                  </View>
                </View>
                <CustomSingleButton
                  _ButtonText={'View all jobs'}
                  Text_Color={_COLORS.Kodie_BlackColor}
                  backgroundColor={_COLORS.Kodie_lightGreenColor}
                  borderColor={_COLORS.Kodie_GreenColor}
                  height={45}
                  onPress={() => {
                    props.navigation.navigate('Jobs');
                  }}
                />
              </View>
            </View>
            <View style={DashboardStyle.Noticemain_View}>
              <View style={DashboardStyle.Notice_view}>
                <Text style={DashboardStyle.maintenance_Text}>{'Notices'}</Text>
                <TouchableOpacity
                // onPress={() => {
                //   refRBSheet.current.open();
                // }}
                >
                  <Entypo
                    name="dots-three-horizontal"
                    size={20}
                    color={_COLORS.Kodie_GrayColor}
                  />
                </TouchableOpacity>
              </View>

              <FlatList
                data={Notice}
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{}}
                keyExtractor={item => item?.id}
                renderItem={NoticeData}
              />
              <View style={DashboardStyle.btnView}>
                <CustomSingleButton
                  height={45}
                  _ButtonText={'View all notices'}
                  backgroundColor={_COLORS.Kodie_lightGreenColor}
                  Text_Color={_COLORS.Kodie_BlackColor}
                  borderColor={_COLORS.Kodie_GreenColor}
                  onPress={() => {
                    props.navigation.navigate('Notices');
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <RBSheet
          ref={refRBSheet}
          height={250}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: DashboardStyle.bottomModal_container,
          }}>
          <SelectProperties onClose={CloseUp} />
        </RBSheet>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          }}></View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <ScrollView
            style={{
              position: 'absolute',
              // left: -20,
              bottom: -30,
              width: '100%',
              height: upsheet == true ? '100%' : '65%',
              backgroundColor: 'white',
              borderRadius: 15,
              paddingVertical: 8,
              borderWidth: 1,
              borderColor: _COLORS.Kodie_GrayColor,
            }}>
            <SelectDate
              onClose={() => setModalVisible(false)}
              CalenderId={handlegetCalenderid}
            />
          </ScrollView>
        </Modal>
      </SafeAreaView>
      <FloatingActionButton />
    </>
  );
};
