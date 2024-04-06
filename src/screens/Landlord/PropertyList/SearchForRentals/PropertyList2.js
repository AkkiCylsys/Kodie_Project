import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';

import SearchBar from '../../../../components/Molecules/SearchBar/SearchBar';
import {FONTFAMILY, _COLORS} from '../../../../Themes';
import {PropertyList2Css} from './PropertyList2Css';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
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

  const searchpropertyList2 = () => {};
  const renderDataItem = item => {
    return (
      <View style={PropertyList2Css.item}>
        <Text style={PropertyList2Css.selectedTextStyle}>{item.label}</Text>
        <AntDesign
          style={PropertyList2Css.icon}
          color={_COLORS.Kodie_BlackColor}
          name="check"
          size={20}
        />
      </View>
    );
  };

  return (
    <>
      <ScrollView contentContainerStyle={PropertyList2Css.scrollViewStl}>
        <SearchBar
          frontSearchIcon
          height={48}
          mapIcon
          searchData={searchpropertyList2}
        />
        <View style={PropertyList2Css.Container}>
          <Text style={PropertyList2Css.inputText}>Property Type:</Text>
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
            placeholder="Apartment"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
              setValue(item.value);
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
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="$300 per week"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                  setValue(item.value);
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
            leftButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            LeftButtonborderColor={_COLORS.Kodie_GrayColor}
            RightButtonText={'Unfurnished'}
            RightButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            RightButtonTextColor={_COLORS.Kodie_MediumGrayColor}
            RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
          />
          <Text style={PropertyList2Css.inputText}>{'Pet friendly?'}</Text>
          <RowButtons
            LeftButtonText={'Yes'}
            leftButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            LeftButtonborderColor={_COLORS.Kodie_GrayColor}
            RightButtonText={'No'}
            RightButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            RightButtonTextColor={_COLORS.Kodie_MediumGrayColor}
            RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
          />
          <Text style={PropertyList2Css.inputText}>
            {'Exclude properties secured by deposit?'}
          </Text>
          <RowButtons
            LeftButtonText={'Yes'}
            leftButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            LeftButtonborderColor={_COLORS.Kodie_GrayColor}
            RightButtonText={'No'}
            RightButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            RightButtonTextColor={_COLORS.Kodie_MediumGrayColor}
            RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
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
            data={AdditionalKeyFeatures}
            labelField="label"
            valueField="value"
            placeholder="Search features "
            activeColor={_COLORS.Kodie_MidLightGreenColor}
            value={selected}
            search
            searchPlaceholder="Search..."
            onChange={item => {
              setSelected(item);
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
            renderItem={renderDataItem}
            renderSelectedItem={(item, unSelect) => (
              <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                <View style={PropertyList2Css.selectedStyle}>
                  <Text style={PropertyList2Css.textSelectedStyle}>
                    {item.label}
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
