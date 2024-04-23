import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';

import SearchBar from '../../../../components/Molecules/SearchBar/SearchBar';
import {FONTFAMILY, _COLORS} from '../../../../Themes';
import {PropertyList2Css} from './PropertyList2Css';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import {SignupLookupDetails} from '../../../../APIs/AllApi';
import {Config} from '../../../../Config';
import axios from 'axios';
const data = [
  {label: 'Bharat', value: '1'},
  {label: 'Australia', value: '2'},
  {label: 'America', value: '3'},
];
const AdditionalKeyFeatures = [
  {label: 'Pool', value: '1'},
  {label: 'Garage', value: '2'},
  {label: 'Balcony', value: '3'},
  {label: 'Ensuite', value: '4'},
  {label: 'Dishwasher', value: '5'},
  {label: 'Study', value: '6'},
  {label: 'Built in robes', value: '7'},
  {label: 'Climate Control & energy', value: '8'},
  {label: 'Air conditioning', value: '8'},
  {label: 'Solar panels', value: '8'},
  {label: 'Heating', value: '8'},
  {label: 'High energy efficiency', value: '8'},
];
const PropertyList2 = props => {
  const [value, setValue] = useState(null);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [proteryTypeData, setProteryTypeData] = useState([]);
  const [proteryTypeValue, setProteryTypeValue] = useState([]);
  const [additionalfeatureskey, setAdditionalfeatureskey] = useState([]);
  const [additionalfeatureskeyvalue, setAdditionalFeaturesKeyValue] = useState(
    [],
  );
  const [selectedButtonFurnished, setSelectedButtonFurnished] = useState(false);
  const [selectedButtonFurnishedId, setSelectedButtonFurnishedId] =
    useState(67);
  const [selectPetFriendlyBtn, setSelectPetFriendlyBtn] = useState(false);
  const [selectPetFriendlyBtnId, setSelectPetFriendlyBtnId] = useState(0);
  const [secureByDepositBtn, setSecureByDepositBtn] = useState(false);
  const [secureByDepositBtnId, setSecureByDepositBtnId] = useState(0);

  useEffect(() => {
    handle_property_Type();
    additional_key_features();
  }, []);
  // renderItem....
  const additional_key_feature_render = item => {
    return (
      <View style={PropertyList2Css.item}>
        <Text
          style={[
            PropertyList2Css.selectedTextStyle,
            {color: _COLORS.Kodie_BlackColor},
          ]}>
          {item.features_name}
        </Text>
        <AntDesign
          style={PropertyList2Css.icon}
          color={_COLORS.Kodie_BlackColor}
          name="check"
          size={20}
        />
      </View>
    );
  };
  // Api intrigation....
  const handle_property_Type = async () => {
    setIsLoading(true);
    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'PROP_TYPE',
      P_TYPE: 'OPTION',
    });
    console.log('handle_property_Type', res);
    setProteryTypeData(res?.lookup_details);
    setIsLoading(false);
  };

  const additional_key_features = () => {
    const url = Config.BASE_URL;
    const additionalApi = url + 'get_key_features';
    console.log('Request URL:', additionalApi);
    setIsLoading(true);
    axios
      .get(additionalApi)
      .then(response => {
        console.log('additional_Data', response?.data);
        if (response?.data?.success === true) {
          setIsLoading(false);
          console.log('additional key_features....', response?.data);
          setAdditionalfeatureskey(response?.data?.key_features_details);
          console.log(
            'AdditionalFeaturesKey....',
            response?.data?.key_features_details,
          );
        } else {
          console.error('additional_features_error:', response?.data?.error);
          // alert('Oops something went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('additional_features error:', error);
        // alert(error);
        setIsLoading(false);
      });
  };

  const searchForRental = () => {
    const url = Config.BASE_URL;
    const serchForrental_url = url + 'Search_For_Rental';
    console.log('Request URL:', serchForrental_url);
    setIsLoading(true);
    const searchForrental_Data = {
      property_type: 22,
      min_price: 'string',
      max_price: 'string',
      bedrooms: 'string',
      bathrooms: 'string',
      carspaces: 'string',
      on_street_parking: 'string',
      furn_unfurn: 'string',
      pet_friendly: 'string',
    };
    axios
      .post(serchForrental_url, searchForrental_Data)
      .then(response => {
        console.log('API Response searchForRental..', response?.data);
        if (response?.data?.success === true) {
          alert(response?.data?.message);
        } else {
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed searchForRental', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <ScrollView contentContainerStyle={PropertyList2Css.scrollViewStl}>
        <SearchBar
          frontSearchIcon
          placeholder="Start typing"
          height={48}
          mapIcon
        />
        <View style={PropertyList2Css.Container}>
          <Text style={PropertyList2Css.inputText}>Property Type:</Text>
          <Dropdown
            style={PropertyList2Css.dropdown}
            placeholderStyle={PropertyList2Css.placeholderStyle}
            selectedTextStyle={PropertyList2Css.selectedTextStyle}
            inputSearchStyle={PropertyList2Css.inputSearchStyle}
            iconStyle={PropertyList2Css.iconStyle}
            data={proteryTypeData}
            search
            maxHeight={300}
            labelField="lookup_description"
            valueField="lookup_key"
            placeholder="Apartment"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
              setProteryTypeValue(item.lookup_key);
            }}
          />
          <View style={PropertyList2Css.rowView}>
            <View style={PropertyList2Css.flexContainer}>
              <Text style={PropertyList2Css.inputText}>Min Price:</Text>
              <Dropdown
                style={PropertyList2Css.dropdown}
                placeholderStyle={PropertyList2Css.placeholderStyle}
                selectedTextStyle={PropertyList2Css.selectedTextStyle}
                inputSearchStyle={PropertyList2Css.inputSearchStyle}
                iconStyle={PropertyList2Css.iconStyle}
                data={proteryTypeData}
                search
                maxHeight={300}
                labelField="lookup_description"
                valueField="lookup_key"
                placeholder="$300 per week"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                  setProteryTypeValue(item.lookup_key);
                }}
              />
            </View>
            <View style={PropertyList2Css.spaceView} />

            <View style={PropertyList2Css.flexContainer}>
              <Text style={PropertyList2Css.inputText}>Max Price:</Text>
              <Dropdown
                style={PropertyList2Css.dropdown}
                placeholderStyle={PropertyList2Css.placeholderStyle}
                selectedTextStyle={PropertyList2Css.selectedTextStyle}
                inputSearchStyle={PropertyList2Css.inputSearchStyle}
                iconStyle={PropertyList2Css.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="$1000 per week"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <View style={PropertyList2Css.rowView}>
            <View style={PropertyList2Css.flexContainer}>
              <Text style={PropertyList2Css.inputText}>Bedrooms:</Text>
              <Dropdown
                style={PropertyList2Css.dropdown}
                placeholderStyle={PropertyList2Css.placeholderStyle}
                selectedTextStyle={PropertyList2Css.selectedTextStyle}
                inputSearchStyle={PropertyList2Css.inputSearchStyle}
                iconStyle={PropertyList2Css.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="3+"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
            <View style={PropertyList2Css.spaceView} />

            <View style={PropertyList2Css.flexContainer}>
              <Text style={PropertyList2Css.inputText}>Bathrooms:</Text>
              <Dropdown
                style={PropertyList2Css.dropdown}
                placeholderStyle={PropertyList2Css.placeholderStyle}
                selectedTextStyle={PropertyList2Css.selectedTextStyle}
                inputSearchStyle={PropertyList2Css.inputSearchStyle}
                iconStyle={PropertyList2Css.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="2+"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <View style={PropertyList2Css.rowView}>
            <View style={PropertyList2Css.flexContainer}>
              <Text style={PropertyList2Css.inputText}>Car spaces:</Text>
              <Dropdown
                style={PropertyList2Css.dropdown}
                placeholderStyle={PropertyList2Css.placeholderStyle}
                selectedTextStyle={PropertyList2Css.selectedTextStyle}
                inputSearchStyle={PropertyList2Css.inputSearchStyle}
                iconStyle={PropertyList2Css.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="1+"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
            <View style={PropertyList2Css.spaceView} />

            <View style={PropertyList2Css.flexContainer}>
              <Text style={PropertyList2Css.inputText}>
                On-street parking spaces:
              </Text>
              <Dropdown
                style={PropertyList2Css.dropdown}
                placeholderStyle={PropertyList2Css.placeholderStyle}
                selectedTextStyle={PropertyList2Css.selectedTextStyle}
                inputSearchStyle={PropertyList2Css.inputSearchStyle}
                iconStyle={PropertyList2Css.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="1+"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <Text style={PropertyList2Css.inputText}>
            {'Furnished or unfurnished? '}
          </Text>
          <RowButtons
            LeftButtonText={'Furnished'}
            leftButtonbackgroundColor={
              !selectedButtonFurnished
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            LeftButtonTextColor={
              !selectedButtonFurnished
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            LeftButtonborderColor={
              !selectedButtonFurnished
                ? _COLORS.Kodie_GrayColor
                : _COLORS.Kodie_LightWhiteColor
            }
            onPressLeftButton={() => {
              setSelectedButtonFurnished(false);
              setSelectedButtonFurnishedId(67);
              // alert(selectedButtonFurnishedId)
            }}
            RightButtonText={'Unfurnished'}
            RightButtonbackgroundColor={
              selectedButtonFurnished
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            RightButtonTextColor={
              selectedButtonFurnished
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            RightButtonborderColor={
              selectedButtonFurnished
                ? _COLORS.Kodie_GrayColor
                : _COLORS.Kodie_LightWhiteColor
            }
            onPressRightButton={() => {
              setSelectedButtonFurnished(true);
              setSelectedButtonFurnishedId(68);
              // alert(selectedButtonFurnishedId)
            }}
          />
          <Text style={PropertyList2Css.inputText}>{'Pet friendly?'}</Text>
          <RowButtons
            LeftButtonText={'Yes'}
            leftButtonbackgroundColor={
              !selectPetFriendlyBtn
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            LeftButtonTextColor={
              !selectPetFriendlyBtn
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            LeftButtonborderColor={
              !selectPetFriendlyBtn
                ? _COLORS.Kodie_GrayColor
                : _COLORS.Kodie_LightWhiteColor
            }
            onPressLeftButton={() => {
              setSelectPetFriendlyBtn(false);
              setSelectPetFriendlyBtnId(0);
              // alert(selectPetFriendlyBtnId)
            }}
            RightButtonText={'No'}
            RightButtonbackgroundColor={
              selectPetFriendlyBtn
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            RightButtonTextColor={
              selectPetFriendlyBtn
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            RightButtonborderColor={
              selectPetFriendlyBtn
                ? _COLORS.Kodie_GrayColor
                : _COLORS.Kodie_LightWhiteColor
            }
            onPressRightButton={() => {
              setSelectPetFriendlyBtn(true);
              setSelectPetFriendlyBtnId(1);
              // alert(selectPetFriendlyBtnId)
            }}
          />
          <Text style={PropertyList2Css.inputText}>
            {'Exclude properties secured by deposit?'}
          </Text>
          {/* <RowButtons
            LeftButtonText={'Yes'}
            leftButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            LeftButtonborderColor={_COLORS.Kodie_GrayColor}
            RightButtonText={'No'}
            RightButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            RightButtonTextColor={_COLORS.Kodie_MediumGrayColor}
            RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
          /> */}
          <RowButtons
            LeftButtonText={'Yes'}
            leftButtonbackgroundColor={
              !secureByDepositBtn
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            LeftButtonTextColor={
              !secureByDepositBtn
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            LeftButtonborderColor={
              !secureByDepositBtn
                ? _COLORS.Kodie_GrayColor
                : _COLORS.Kodie_LightWhiteColor
            }
            onPressLeftButton={() => {
              setSecureByDepositBtn(false);
              setSecureByDepositBtnId(0);
              // alert(selectPetFriendlyBtnId)
            }}
            RightButtonText={'No'}
            RightButtonbackgroundColor={
              secureByDepositBtn
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            RightButtonTextColor={
              secureByDepositBtn
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            RightButtonborderColor={
              secureByDepositBtn
                ? _COLORS.Kodie_GrayColor
                : _COLORS.Kodie_LightWhiteColor
            }
            onPressRightButton={() => {
              setSecureByDepositBtn(true);
              setSecureByDepositBtnId(1);
              // alert(selectPetFriendlyBtnId)
            }}
          />
          <Text style={PropertyList2Css.inputText}>
            {'Additional key features'}
          </Text>
          <MultiSelect
            style={PropertyList2Css.dropdown}
            placeholderStyle={PropertyList2Css.placeholderStyle}
            selectedTextStyle={PropertyList2Css.selectedTextStyle}
            inputSearchStyle={PropertyList2Css.inputSearchStyle}
            iconStyle={PropertyList2Css.iconStyle}
            data={additionalfeatureskey}
            labelField="features_name"
            valueField="paf_key"
            placeholder="Search features "
            activeColor={_COLORS.Kodie_MidLightGreenColor}
            value={additionalfeatureskeyvalue}
            search
            searchPlaceholder="Search..."
            onChange={item => {
              setAdditionalFeaturesKeyValue(item);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={PropertyList2Css.icon}
                color={_COLORS.Kodie_GrayColor}
                name="search1"
                size={20}
              />
            )}
            renderRightIcon={() => <></>}
            renderItem={additional_key_feature_render}
            renderSelectedItem={(item, unSelect) => (
              <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                <View style={PropertyList2Css.selectedStyle}>
                  <Text style={PropertyList2Css.textSelectedStyle}>
                    {item.features_name}
                  </Text>
                  <AntDesign
                    color={_COLORS.Kodie_WhiteColor}
                    name="close"
                    size={15}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
          <CustomSingleButton
            _ButtonText={'Search'}
            Text_Color={_COLORS.Kodie_WhiteColor}
            backgroundColor={_COLORS.Kodie_BlackColor}
            onPress={props.SearchButton}
            disabled={isLoading ? true : false}
          />
        </View>
      </ScrollView>
    </>
  );
};
export default PropertyList2;
