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
        <EvilIcons
          name="search"
          size={28}
          color={_COLORS.Kodie_MediumGrayColor}
        />
        <TextInput
          style={SearchBarStyle.input}
          value={search}
          onChange={(text) => setSearch(text)}
          placeholder="Search"
          placeholderTextColor={_COLORS.Kodie_MediumGrayColor}
        />
      </View>
      {props.isFilterImage ? (
        <TouchableOpacity style={SearchBarStyle.filterView}>
          <Image source={props.filterImage} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SearchBar;
