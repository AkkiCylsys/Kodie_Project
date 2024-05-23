import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {SearchBarStyle} from './SearchBarStyle';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {_COLORS, IMAGES} from '../../../Themes/index';
const SearchBar = props => {
  let IconComponent;

  switch (props?.iconSet) {
    case 'AntDesign':
      IconComponent = AntDesign;
      break;
    case 'EvilIcons':
    default:
      IconComponent = EvilIcons;
      break;
  }
  const [search, setSearch] = useState('');

  const handleSearchChange = text => {
    setSearch(text);
    props.searchData(text);
  };
  const truncatePlaceholder = (placeholder, maxLength) => {
    if (placeholder.length > maxLength) {
      return placeholder.substring(0, maxLength - 3) + '...';
    }
    return placeholder;
  };
  return (
    <View style={SearchBarStyle.serchheaderView}>
      <View
        style={[
          SearchBarStyle.container,
          {
            height: props.height ? props.height : 45,
            marginTop: props.marginTop ? props.marginTop : 20,
          },
        ]}>
        {props.frontSearchIcon ? (
          <EvilIcons
            name="search"
            size={28}
            color={_COLORS.Kodie_MediumGrayColor}
          />
        ) : null}

        <TextInput
          style={SearchBarStyle.input}
          value={props.textvalue}
          // onChangeText={(text) =>
          //   text ? handleSearchChange(text) : setSearch()
          // }
          onChangeText={handleSearchChange}
          placeholder={truncatePlaceholder(props.placeholder, 15)}
          placeholderTextColor={_COLORS.Kodie_MediumGrayColor}
        />
        {props.backSearchIcon ? (
          <EvilIcons
            name="search"
            size={28}
            color={_COLORS.Kodie_MediumGrayColor}
          />
        ) : null}
      </View>
      {props.isFilterImage ? (
        <TouchableOpacity
          style={[
            SearchBarStyle.filterView,
            {
              height: props.height,
              marginTop: props.marginTop ? props.marginTop : 20,
            },
          ]}>
          <IconComponent
            name={props?.filterIcon || 'location'}
            size={28}
            color={_COLORS.Kodie_MediumGrayColor}
          />
        </TouchableOpacity>
      ) : null}
      {props.updownSearch ? (
        <TouchableOpacity
          style={[
            SearchBarStyle.filterView,
            {
              flexDirection: 'row',
              height: props.height,
              marginTop: props.marginTop ? props.marginTop : 20,
            },
          ]}>
          <FontAwesome
            // name="location"
            name={'long-arrow-up'}
            size={20}
            color={_COLORS.Kodie_MediumGrayColor}
          />
          <FontAwesome
            // name="location"
            name={'long-arrow-down'}
            size={20}
            color={_COLORS.Kodie_MediumGrayColor}
          />
        </TouchableOpacity>
      ) : null}
      {props.mapIcon ? (
        <TouchableOpacity style={SearchBarStyle.filterView}>
          <View style={SearchBarStyle.groupIconView}>
            <Icon
              name="map-outline"
              size={30}
              color={_COLORS.Kodie_MediumGrayColor}
            />
            <Icon
              name="location-outline"
              size={9}
              color={_COLORS.Kodie_MediumGrayColor}
              style={SearchBarStyle.groupIcon}
            />
          </View>
        </TouchableOpacity>
      ) : null}

      {props.isButtonShow ? (
        <TouchableOpacity
          style={SearchBarStyle.buttonView}
          onPress={props.onPress}>
          <Text style={SearchBarStyle.buttonText}>{props.buttonName}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
SearchBar.defaultProps = {
  placeholder: 'Search',
  // SearchIcon:"location"
  //  RightImage: IMAGES.rightarrow,
};
export default SearchBar;
