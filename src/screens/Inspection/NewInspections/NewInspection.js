//ScreenNo:87
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { NewInspectionStyle } from "./NewInspectionStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import { _COLORS, BANNERS, FONTFAMILY, IMAGES } from "../../../Themes";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import SearchBar from "../../../components/Molecules/SearchBar/SearchBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import axios from "axios";
import { Config } from "../../../Config";
import { CommonLoader } from "../../../components/Molecules/ActiveLoader/ActiveLoader";

const HorizontalData = ["Scheduled", "In Progress", "Complete"];

const inspection_data = [
  {
    id: 1,
    location: "8502 Preston Rd. Inglewood",
    img: BANNERS.Apartment,
    userImg: IMAGES.userImage,
    userName: "Alma Alma",
    review: ". In_progress",
  },
  {
    id: 2,
    location: "8502 Preston Rd. Inglewood",
    img: BANNERS.Apartment,
    userImg: IMAGES.userImage,
    userName: "Alma Alma",
    review: ". Scheduled",
  },
  {
    id: 3,
    location: "8502 Preston Rd. Inglewood",
    img: BANNERS.Apartment,
    userImg: IMAGES.userImage,
    userName: "Alma Alma",
    review: ". Cancelled",
  },
];

export default NewInspection = (props) => {
  const navigation = useNavigation()
  const loginData = useSelector(state => state.authenticationReducer.data);
  const [page, setPage] = useState(1);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [_selectedMonthId, set_selectedMonthId] = useState(
    new Date().getMonth() + 1,);
  const [_selectedYear, set_selectedYear] = useState(new Date().getFullYear());
  const [_MONTHS, set_MONTHS] = useState([
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' },
  ]);
  const [InspectionDetails, setInspectionDetails] = useState([])
  useEffect(() => {
    if (isFocused) {
      getInspectionDeatilsByFilter({
        monthId: _selectedMonthId,
        year: _selectedYear,
      });
    }
  }, [isFocused]);
  const getInspectionDeatilsByFilter = async ({ monthId, year, page }) => {
    setIsLoading(true);
    try {
      const url = Config.BASE_URL;
      const InspectionDeatilsByFilter_url = url + 'get/AllInspectionDetails';
      console.log('InspectionDeatilsByFilter_url...', InspectionDeatilsByFilter_url);
      const data = {
        v_Filter: "All",
        P_TIM_CREATED_BY: loginData?.Login_details?.user_account_id,
        p_limit: 10,
        p_order_wise: 'DESC',
        P_TIM_IS_MONTHS: monthId.toString(),
        P_TIM_IS_YEAR: year,
        p_page: 1,
      };
      console.log('monthdatae', data);
      const response = await axios.post(InspectionDeatilsByFilter_url, data);
      console.log('InspectionDeatilsByFilter_Data response...', response?.data);
      if(response?.data?.success === true){
      setInspectionDetails(response?.data?.data)
      }
      // Append new data to the existing list
      // setInspectionDetails(prevDetails => [...prevDetails, ...response?.data?.data]);
      console.log('InspectionDeatilsByFilter_Data..', response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        Alert.alert("Warning", error.response.data.message || "Internal server issue");
        setIsLoading(false);
      } else if(error.response.status === 404) {
        setInspectionDetails([])
        setIsLoading(false);
      }
      console.error('API Error InspectionDeatilsByFilter:', error);
      setIsLoading(false);
    }
  };
  const loadMoreData = () => {
    setPage(prevPage => prevPage + 1);
  };
  const searchInspection = () => { };
  const navigateToPreviousMonth = async () => {
    let newMonthId = _selectedMonthId - 1;
    let newYear = _selectedYear;
    if (newMonthId < 1) {
      newMonthId = 12; // Set to December
      newYear -= 1; // Decrement year
    }
    set_selectedMonthId(newMonthId);
    set_selectedYear(newYear);
    await getInspectionDeatilsByFilter({
      monthId: newMonthId,
      year: newYear,
    });
  };

  const navigateToNextMonth = async () => {
    let newMonthId = _selectedMonthId + 1;
    let newYear = _selectedYear;
    if (newMonthId > 12) {
      newMonthId = 1; // Set to January
      newYear += 1; // Increment year
    }
    set_selectedMonthId(newMonthId);
    set_selectedYear(newYear);
    await getInspectionDeatilsByFilter({
      monthId: newMonthId,
      year: newYear,
    });
  };



  const horizontal_render = ({ item }) => {
    return (
      <TouchableOpacity style={NewInspectionStyle.flatlistView}>
        <View style={NewInspectionStyle.round} />
        <Text style={NewInspectionStyle.item_style}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const Inspection_render = ({ item, index }) => {
    const getDate = new Date(item.scheduled_date);

    const dayOfMonth = getDate.getDate(); // Extracts the day of the month
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[getDate.getDay()];
    return (
      <>
        <View style={NewInspectionStyle.insp_data_View}>
          <View style={NewInspectionStyle.insp_cld_main_view}>
            <Text style={NewInspectionStyle.insp_cld_date}>{dayOfMonth}</Text>
            <Text style={NewInspectionStyle.insp_cld_Text}>{dayOfWeek}</Text>
            <Text style={NewInspectionStyle.insp_cld_Text}>{item?.scheduled_time}</Text>
          </View>
          <View style={{flex:0.4}}>
            {item.image_path && item.image_path.length > 0 ? (
              <Image source={{ uri: item?.image_path[0] }} style={NewInspectionStyle.img_Sty} />
            ) : (<View
              style={[
                NewInspectionStyle.img_Sty,
                { justifyContent: 'center' },
              ]}>
              <Text style={{
                fontSize: 12,
                color: _COLORS?.Kodie_BlackColor,
                textAlign: 'center',
                alignSelf: 'center',
              }}>
                {'Image not found'}
              </Text>
            </View>)}
          </View>
          <View style={{ flex: 1,marginLeft:2 }}>
            <View style={NewInspectionStyle.location_main_view}>
              <Entypo
                name="location-pin"
                size={18}
                color={_COLORS.Kodie_GreenColor}
                style={{alignSelf:'center'}}
              />
              <Text style={NewInspectionStyle.location_text}>
                {item.location}
              </Text>
              <TouchableOpacity onPress={()=>{
              navigation?.navigate('CreateNewInspection',{TIM_KEY:item.tim_key,Ins_editMode:"Ins_editMode"})
              }}>
                <SimpleLineIcons
                  name="note"
                  size={25}
                  color={_COLORS.Kodie_LightGrayColor}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
              <View style={{ margin: 6 }} />
              <TouchableOpacity>
                <Entypo
                  name="dots-three-horizontal"
                  size={18}
                  color={_COLORS.Kodie_GrayColor}
                />
              </TouchableOpacity>
            </View>
            <View style={NewInspectionStyle.user_main_view}>
              <View style={NewInspectionStyle.user_main_view}>
                <Image
                  source={item.userImg}
                  style={NewInspectionStyle.user_img_sty}
                />
                <Text style={NewInspectionStyle.user_name_text}>
                  {item.userName}
                </Text>
              </View>
              <TouchableOpacity style={NewInspectionStyle.in_progress_view}>
                <Text style={NewInspectionStyle.in_progress_txt}>
                  {"Schedule"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={NewInspectionStyle.subContainer}>
          <DividerIcon />
        </View>
      </>
    );
  };
  return (
    <SafeAreaView style={NewInspectionStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Inspections"}
      />
     
        <View style={NewInspectionStyle.subContainer}>
          <CustomSingleButton
            _ButtonText={"Create new inspection"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            onPress={() => {
              props.navigation.navigate("CreateNewInspection");
            }}
            disabled={isLoading ? true : false}
          />
        </View>
        <DividerIcon borderBottomWidth={4} color={_COLORS.Kodie_GrayColor} />
        <SearchBar
          filterImage={IMAGES.up_down_Arrow}
          isFilterImage
          height={48}
          marginTop={20}
          searchData={searchInspection}
        />
        <View style={NewInspectionStyle.flat_MainView}>
          <TouchableOpacity style={NewInspectionStyle.AllView}>
            <Text style={NewInspectionStyle.item_style}>ALL</Text>
            <MaterialCommunityIcons
              name={"check"}
              size={18}
              color={_COLORS.Kodie_WhiteColor}
            />
          </TouchableOpacity>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={HorizontalData}
            renderItem={horizontal_render}
          />
        </View>
        <DividerIcon />
        {/* <View style={NewInspectionStyle.month_View}>
          <TouchableOpacity style={NewInspectionStyle.backIconSty}>
            <AntDesign name="left" size={25} color={_COLORS.Kodie_BlackColor} />
          </TouchableOpacity>
          <Text style={NewInspectionStyle.Month_Text}>{"September 2023"}</Text>
          <TouchableOpacity style={NewInspectionStyle.backIconSty}>
            <AntDesign
              name="right"
              size={25}
              color={_COLORS.Kodie_BlackColor}
            />
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 16,
            marginVertical: 10,
          }}>
          <TouchableOpacity
            onPress={navigateToPreviousMonth}
            style={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Entypo name={'chevron-left'} size={22} color={'black'} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              // onPress={toggleModal}
              style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 18,
                  alignSelf: 'center',
                  fontFamily: FONTFAMILY?.K_Bold,
                  color: _COLORS.Kodie_BlackColor,
                }}>
                {_MONTHS.find(month => month.id === _selectedMonthId)?.name}{' '}
              </Text>
            </View>
            <View
              // onPress={toggleYearModal}
              style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 18,
                  alignSelf: 'center',
                  fontFamily: FONTFAMILY?.K_Bold,
                  color: _COLORS.Kodie_BlackColor,
                }}>
                {_selectedYear}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={navigateToNextMonth}
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Entypo name={'chevron-right'} size={22} color={'black'} />
          </TouchableOpacity>
        </View>
        <DividerIcon />
        <ScrollView>
        <FlatList
          data={InspectionDetails}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          keyExtractor={(item) => item?.id}
          renderItem={Inspection_render}
         
        />
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
