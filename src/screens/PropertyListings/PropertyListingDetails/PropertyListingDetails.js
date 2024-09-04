import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import { _COLORS } from "../../../Themes";
import { DetailsStyle } from "../../Landlord/AddNewProperty/PropertyReview/Details/DetailsStyles";
import TopHeader from "../../../components/Molecules/Header/Header";
import { LABEL_STYLES, LabelStyles } from "../../../Themes/CommonStyles/CommonStyles";
import CalendarModal from "../../../components/Molecules/CalenderModal/CalenderModal";
import { SignupLookupDetails } from "../../../APIs/AllApi";
import SectionToggle from "../../../components/Molecules/SectionToggle/SectionToggle";
import DropdownField from "../../../components/Molecules/DropdownField/DropdownField";
import InputField from "../../../components/Molecules/InputField/InputField";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import ToggleButton from "../../../components/Molecules/ToggleButton/ToggleButton";
import { Divider } from "react-native-paper";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import { insertMarketDetails } from "../../../services/PropertyListing/ListingServices";
import { useSelector } from "react-redux";

const PropertyListingDetail = (props) => {
  const [propertyDetailsVisible, setPropertyDetailsVisible] = useState(false);
  const [preferencesVisible, setPreferencesVisible] = useState(false);
  const [propertyDescription, setPropertyDescription] = useState("");
  const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [leaseEndData, setLeaseEndData] = useState([]);
  const [leaseEndValue, setLeaseEndValue] = useState("");
  const [leaseTermData, setLeaseTermData] = useState([]);
  const [leaseTermValue, setLeaseTermValue] = useState("");
  const [selectedButtonSmokingId, setSelectedButtonSmokingId] = useState(0);
  const [selectedButtonPetId, setSelectedButtonPetId] = useState(0);
  const [selectedButtonconsideredId, setSelectedButtonconsideredId] = useState(0);
  const [maxOccupantsError, setMaxOccupantsError] = useState("");
  const [listPriceError, setListPriceError] = useState("");
  const [Occupant, setOccupant] = useState("");
  const [ListPrice, setListPrice] = useState("");
  const [Otherpreference, setOtherpreference] = useState("");
  const [isLoading,setIsLoading] = useState(false)
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginData', loginData);
  const propertyid = props?.route?.params?.propertyid;
  console.log("propertyid", propertyid);

  useEffect(() => {
    fetchLeaseOptions();
    fetchLeaseTermOptions();
  }, []);

  const fetchLeaseOptions = async () => {
    try {
      const res = await SignupLookupDetails({
        P_PARENT_CODE: "RENT_PAID",
        P_TYPE: "OPTION",
      });
      setLeaseEndData(res?.lookup_details || []);
    } catch (error) {
      console.error("Error fetching lease end options:", error);
    }
  };

  const fetchLeaseTermOptions = async () => {
    try {
      const res = await SignupLookupDetails({
        P_PARENT_CODE: "RLT",
        P_TYPE: "OPTION",
      });
      setLeaseTermData(res?.lookup_details || []);
    } catch (error) {
      console.error("Error fetching lease term options:", error);
    }
  };

  const toggleVisibility = (setter) => setter((prev) => !prev);

  const handleDateSelection = (day) => {
    setSelectedDate(day.dateString);
  };
  const handleMaxOccupantsChange = (text) => {
    setOccupant(text);
    if (text.trim() === '') {
      setMaxOccupantsError("Maximum number of occupants is required.");
    } else {
      setMaxOccupantsError("");
    }
  };

  const handleListPriceChange = (text) => {
    setListPrice(text);
    if (text.trim() === '') {
      setListPriceError("List price is required.");
    } else {
      setListPriceError("");
    }
  };
  const renderDropdownItem = (item, selectedItemKey) => (
    <View
      style={[
        DetailsStyle.itemView,
        {
          backgroundColor:
            item.lookup_key === selectedItemKey
              ? _COLORS.Kodie_MidLightGreenColor
              : _COLORS.Kodie_WhiteColor,
        },
      ]}
    >
      {item.lookup_key === selectedItemKey ? (
        <AntDesign
          color={_COLORS.Kodie_GreenColor}
          name="checkcircle"
          size={20}
        />
      ) : (
        <Fontisto
          color={_COLORS.Kodie_GrayColor}
          name="radio-btn-passive"
          size={20}
        />
      )}
      <Text style={DetailsStyle.textItem}>{item.lookup_description}</Text>
    </View>
  );
  const prereference = `${selectedButtonSmokingId}, ${selectedButtonPetId}, ${selectedButtonconsideredId}`
  const validateInputs = () => {
    let isValid = true;
    if (Occupant.trim() === '') {
      setMaxOccupantsError("Maximum number of occupants is required.");
      isValid = false;
    } else if (ListPrice.trim() === '') {
      setListPriceError("List price is required.");
      isValid = false;
    } else {
      setMaxOccupantsError("")
      setListPriceError("");
    }
    if (isValid) {
      handleInsertList();
     }
  }

  const handleInsertList = async () => {
    console.log("dsdsadfgds");
    setIsLoading(true)
    const data = {
      user_key: loginData?.Login_details?.user_id,
      account_id: loginData?.Login_details?.user_account_id,
      property_id: propertyid,
      pitch_property: propertyDescription,
      property_available_from: selectedDate,
      rental_lease_term: leaseTermValue,
      maximum_occupant: Occupant,
      list_price: ListPrice,
      frequency_payment: leaseEndValue,
      prereference: prereference,
      other: Otherpreference,
    };
console.log(data);
    try {
      const response = await insertMarketDetails(data);
      Alert.alert('Success', 'Market details have been inserted successfully.');
      props.navigation.navigate("Properties");
      setLeaseEndValue('');
      setLeaseTermValue('');
      setOccupant('');
      setListPrice('');
      setSelectedDate('');
      setOtherpreference('');
      setPropertyDescription('');
      console.log(response);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to insert market details.');
      setIsLoading(false)
    }
  };

  return (
    <SafeAreaView style={DetailsStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => props.navigation.navigate("Properties")}
        MiddleText="Property Listing Details"
      />

      <View style={DetailsStyle.headingView}>
        <Text style={LabelStyles.largeTextBold}>Property Listing Details</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={DetailsStyle.subContainer}>
          {/* Property Details Section */}
          <SectionToggle
            title="Other Property Details"
            isVisible={propertyDetailsVisible}
            onPress={() => toggleVisibility(setPropertyDetailsVisible)}
          >
            <Text style={[LABEL_STYLES.commontext, { marginBottom: 12 }]}>Pitch Your Property</Text>
            <TextInput
              style={[DetailsStyle.input, { height: 100 }]}
              placeholder="Enter a sales description of your property"
              value={propertyDescription}
              onChangeText={setPropertyDescription}
              multiline
              numberOfLines={5}
              maxLength={1000}
              textAlignVertical="top"
            />

            <View style={DetailsStyle.section}>
              <Text style={[LABEL_STYLES.commontext, { marginBottom: 12 }]}>
                Property Available From
              </Text>
              <CalendarModal
                current={selectedDate}
                SelectDate={selectedDate || "Select Date"}
                _textInputStyle={{
                  color: selectedDate
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_GrayColor,
                }}
                calenderIcon={() => toggleVisibility(setCalendarModalVisible)}
                onDayPress={handleDateSelection}
                Visible={isCalendarModalVisible}
                onRequestClose={() => setCalendarModalVisible(false)}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    selectedColor: _COLORS.Kodie_lightGreenColor,
                    selectedTextColor: _COLORS.Kodie_BlackColor,
                  },
                }}
                _closeButton={() => setCalendarModalVisible(false)}
                _ApplyButton={() => setCalendarModalVisible(false)}
                calenderStyle={{ marginTop: 0, height: 48 }}
              />
            </View>

            <DropdownField
              label="Rental Lease Term"
              placeholder="Select Length of Lease"
              data={leaseTermData}
              value={leaseTermValue}
              onChange={(item) => setLeaseTermValue(item.lookup_key)}
              renderItem={(item) => renderDropdownItem(item, leaseTermValue)}
            />
            <InputField
              label="Maximum Number of Occupants"
              placeholder="Enter the maximum number of tenants"
              value={Occupant}
              onChangeText={handleMaxOccupantsChange}
              keyboardType="number-pad"
            />
            {maxOccupantsError ? (
              <Text style={{ color: 'red', marginBottom: 10 }}>{maxOccupantsError}</Text>
            ) : null}

            <InputField
              label="List Price"
              placeholder="Enter the rental amount"
              value={ListPrice}
              onChangeText={handleListPriceChange}
              keyboardType="number-pad"
            />
            {listPriceError ? (
              <Text style={{ color: 'red', marginBottom: 10 }}>{listPriceError}</Text>
            ) : null}

            <DropdownField
              label="Frequency of Rental Payments"
              placeholder="Select Rental Lease Term"
              data={leaseEndData}
              value={leaseEndValue}
              onChange={(item) => setLeaseEndValue(item.lookup_key)}
              renderItem={(item) => renderDropdownItem(item, leaseEndValue)}
            />
            <DividerIcon />
          </SectionToggle>

          {/* Preferences Section */}
          <SectionToggle
            title="Preferences"
            isVisible={preferencesVisible}
            onPress={() => toggleVisibility(setPreferencesVisible)}
          >
            <View style={[DetailsStyle.addition_featureView]}>
              <View style={{ flex: 1 }}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Smoking allowed?'}
                </Text>
                <ToggleButton
                  tabValue={selectedButtonSmokingId}
                  setTabValue={setSelectedButtonSmokingId}
                  activeColor={_COLORS.Kodie_GreenColor}
                  inactiveColor={_COLORS.Kodie_WhiteColor}
                  activeTextColor={_COLORS.Kodie_WhiteColor}
                  inactiveTextColor={_COLORS.Kodie_BlackColor}
                  firstTabLabel="Yes"
                  secondTabLabel="No"
                />
              </View>
              <View style={{ margin: 11 }} />
              <View style={{ flex: 1 }}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Pets allowed?'}
                </Text>
                <ToggleButton
                  tabValue={selectedButtonPetId}
                  setTabValue={setSelectedButtonPetId}
                  activeColor={_COLORS.Kodie_GreenColor}
                  inactiveColor={_COLORS.Kodie_WhiteColor}
                  activeTextColor={_COLORS.Kodie_WhiteColor}
                  inactiveTextColor={_COLORS.Kodie_BlackColor}
                  firstTabLabel="Yes"
                  secondTabLabel="No"
                />
              </View>

            </View>
            <View style={[DetailsStyle.addition_featureView]}>
              <View style={{ flex: 1 }}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Short term rental considered?'}
                </Text>
                <ToggleButton
                  tabValue={selectedButtonconsideredId}
                  setTabValue={setSelectedButtonconsideredId}
                  activeColor={_COLORS.Kodie_GreenColor}
                  inactiveColor={_COLORS.Kodie_WhiteColor}
                  activeTextColor={_COLORS.Kodie_WhiteColor}
                  inactiveTextColor={_COLORS.Kodie_BlackColor}
                  firstTabLabel="Yes"
                  secondTabLabel="No"
                  width={'48%'}
                />
              </View>

            </View>
            <InputField
              label="Other"
              placeholder="Type another preference here"
              value={Otherpreference}
              onChangeText={setOtherpreference}
            />
            <View style={{ marginBottom: '10%' }} />
          </SectionToggle>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[DetailsStyle.headingView, { marginTop: 0 }]}>
        <CustomSingleButton
          _ButtonText={"List now"}
          Text_Color={_COLORS.Kodie_WhiteColor}
          text_Size={18}
          marginBottom={12}
          onPress={validateInputs}
        />
      </View>
    </SafeAreaView>
  );
};

export default PropertyListingDetail;
