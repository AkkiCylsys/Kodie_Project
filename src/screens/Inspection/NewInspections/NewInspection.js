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
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import { _COLORS, BANNERS, FONTFAMILY, IMAGES } from "../../../Themes";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import SearchBar from "../../../components/Molecules/SearchBar/SearchBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import axios from "axios";
import { Config } from "../../../Config";
import { CommonLoader } from "../../../components/Molecules/ActiveLoader/ActiveLoader";
import { NewInspectionStyle } from "../../Inspection/NewInspections/NewInspectionStyle";
const HorizontalData = ["All", "Scheduled", "inProgress", "Complete", "Cancelled"];
export default NewInspection = (props) => {
  const navigation = useNavigation();
  const loginData = useSelector((state) => state.authenticationReducer.data);
  const [page, setPage] = useState(1);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [_selectedMonthId, set_selectedMonthId] = useState(
    new Date().getMonth() + 1
  );
  const [_selectedYear, set_selectedYear] = useState(new Date().getFullYear());
  const [_MONTHS, set_MONTHS] = useState([
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ]);
  const [InspectionDetails, setInspectionDetails] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  useEffect(() => {
    if (isFocused) {
      getInspectionDeatilsByFilter({
        monthId: _selectedMonthId,
        year: _selectedYear,
        filter: selectedFilter,
      });
    }
  }, [isFocused, _selectedMonthId, _selectedYear, selectedFilter]);

  const getInspectionDeatilsByFilter = async ({ monthId, year, page, filter }) => {
    setIsLoading(true);
    try {
      const url = Config.BASE_URL;
      const InspectionDeatilsByFilter_url = url + "get/AllInspectionDetails/ByFilter";
      const data = {
        v_Filter: filter,
        P_TIM_CREATED_BY: loginData?.Login_details?.user_account_id,
        p_limit: 10,
        p_order_wise: "DESC",
        P_TIM_IS_MONTHS: monthId.toString(),
        P_TIM_IS_YEAR: year,
        p_page: 1,
      };
      console.log(data);
      const response = await axios.post(InspectionDeatilsByFilter_url, data);
      if (response?.data?.success === true) {
        setInspectionDetails(response?.data?.data);
      }
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        Alert.alert(
          "Warning",
          error.response.data.message || "Internal server issue"
        );
        setIsLoading(false);
      } else if (error.response.status === 404) {
        setInspectionDetails([]);
        setIsLoading(false);
      }
      console.error("API Error InspectionDeatilsByFilter:", error);
      setIsLoading(false);
    }
  };
  const loadMoreData = () => {
    if (!isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      getInspectionDeatilsByFilter({
        monthId: _selectedMonthId,
        year: _selectedYear,
        page: nextPage, 
        filter: selectedFilter,
      });
    }
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
      filter: selectedFilter,
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
      filter: selectedFilter,
    });
  };
  const horizontal_render = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          NewInspectionStyle.flatlistView,
          selectedFilter === item && NewInspectionStyle.selectedFilter,
          {
            backgroundColor: selectedFilter === item
              ? _COLORS?.Kodie_BlackColor
              : _COLORS?.Kodie_WhiteColor,
          },
        ]}
        onPress={() => {
          setSelectedFilter(item);
          setPage(1); // Reset to the first page when changing the filter
          getInspectionDeatilsByFilter({
            monthId: _selectedMonthId,
            year: _selectedYear,
            page: 1,
            filter: item,
          });
        }}
      >
        {selectedFilter == item ? null : (
          <View
            style={[
              NewInspectionStyle.round,
              {
                backgroundColor: selectedFilter == item
                  ? _COLORS?.Kodie_WhiteColor
                  : _COLORS?.Kodie_BlackColor,
              },
            ]}
          />
        )}
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}></View>

        <Text style={[NewInspectionStyle.item_style, {
          color: selectedFilter == item ? 'white' : 'black',
        },]}>{item}</Text>
        {selectedFilter == item ? (
          <MaterialCommunityIcons
            name={'check'}
            size={18}
            color={_COLORS.Kodie_WhiteColor}
          />
        ) : null}
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
        <TouchableOpacity style={NewInspectionStyle.insp_data_View} onPress={() => {
          props.navigation.navigate('PropertyInspection', {
            TIM_KEY: item.tim_key,
            ViewInspection: "ViewInspection",
            PropertyId: item?.inspection_id,
          })
        }}>
          <View style={NewInspectionStyle.insp_cld_main_view}>
            <Text style={NewInspectionStyle.insp_cld_date}>{dayOfMonth}</Text>
            <Text style={NewInspectionStyle.insp_cld_Text}>{dayOfWeek}</Text>
            <Text style={NewInspectionStyle.insp_cld_Text}>{item?.scheduled_time}</Text>
          </View>
          <View style={{ flex: 0.4 }}>
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
          <View style={{ flex: 1, marginLeft: 2 }}>
            <View style={NewInspectionStyle.location_main_view}>
              <Entypo
                name="location-pin"
                size={18}
                color={_COLORS.Kodie_GreenColor}
                style={{ alignSelf: 'center' }}
              />
              <Text style={NewInspectionStyle.location_text}>
                {item.location}
              </Text>
              <TouchableOpacity onPress={() => {
                navigation?.navigate('CreateNewInspection', { TIM_KEY: item.tim_key, Ins_editMode: "Ins_editMode" })
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
        </TouchableOpacity>
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
        frontSearchIcon
        filterImage={IMAGES.up_down_Arrow}
        updownSearch
        height={48}
        marginTop={20}
        searchData={searchInspection}
        placeholder="Search inspections"
      />
      <View style={NewInspectionStyle.flat_MainView}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={HorizontalData}
          renderItem={horizontal_render}
          keyExtractor={(item) => item}
        />
      </View>
      <DividerIcon />
      <View style={NewInspectionStyle.containerStyle}>
        <TouchableOpacity onPress={navigateToPreviousMonth} style={NewInspectionStyle.leftButtonStyle}>
          <Entypo name={"chevron-left"} size={22} color={"black"} />
        </TouchableOpacity>
        <View style={NewInspectionStyle.textContainerStyle}>
          <View style={NewInspectionStyle.textItemStyle}>
            <Text style={NewInspectionStyle.textStyle}>
              {_MONTHS.find((month) => month.id === _selectedMonthId)?.name}{" "}
            </Text>
          </View>
          <View style={NewInspectionStyle.textItemStyle}>
            <Text style={NewInspectionStyle.textStyle}>{_selectedYear}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={navigateToNextMonth} style={NewInspectionStyle.rightButtonStyle}>
          <Entypo name={"chevron-right"} size={22} color={"black"} />
        </TouchableOpacity>
      </View>
      <DividerIcon />
      <ScrollView>
        <FlatList
          data={InspectionDetails}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          // keyExtractor={(item) => item.inspection_id.toString()}
          renderItem={Inspection_render}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
        // ListFooterComponent={isLoading && page > 1 ? <CommonLoader /> : null}
        />
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
