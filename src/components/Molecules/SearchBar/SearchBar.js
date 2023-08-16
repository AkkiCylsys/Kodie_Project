import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { SearchBarStyle } from "./SearchBarStyle";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { _COLORS, IMAGES } from "../../../Themes/index";
const SearchBar = (props) => {
  const [search, setSearch] = useState("");
  return (
    <View style={SearchBarStyle.serchheaderView}>
      <View style={[SearchBarStyle.container, { height: props.height }]}>
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
          placeholder="Search"
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
      {props.isButtonShow ? (
        <TouchableOpacity style={SearchBarStyle.buttonView}>
          <Text style={SearchBarStyle.buttonText}>{props.buttonName}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SearchBar;
