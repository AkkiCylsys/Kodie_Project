import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { SearchBarStyle } from "./SearchBarStyle";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Icon from "react-native-vector-icons/Ionicons";
import { _COLORS, IMAGES } from "../../../Themes/index";
const SearchBar = (props) => {
  const [search, setSearch] = useState("");
  return (
    <View style={SearchBarStyle.serchheaderView}>
      <View
        style={[
          SearchBarStyle.container,
          {
            height: props.height,
            marginTop: props.marginTop ? props.marginTop : 20,
          },
        ]}
      >
        {props.frontSearchIcon ? (
          <EvilIcons
            name="search"
            size={28}
            color={_COLORS.Kodie_MediumGrayColor}
          />
        ) : null}

        <TextInput
          style={SearchBarStyle.input}
          value={search}
          onChange={(text) => setSearch(text)}
          placeholder={props.placeholder}
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
        <TouchableOpacity style={SearchBarStyle.filterView}>
          <Image source={props.filterImage} />
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
          onPress={props.onPress}
        >
          <Text style={SearchBarStyle.buttonText}>{props.buttonName}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
SearchBar.defaultProps = {
  placeholder: "Search",
//  RightImage: IMAGES.rightarrow,

};
export default SearchBar;
