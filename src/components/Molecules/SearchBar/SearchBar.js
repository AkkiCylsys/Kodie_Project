import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { SearchBarStyle } from "./SearchBarStyle";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { _COLORS, IMAGES } from "../../../Themes/index";
const SearchBar = () => {
  const [search, setSearch] = useState("");
  return (
    <View style={SearchBarStyle.serchheaderView}>
      <View style={SearchBarStyle.container}>
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
      <TouchableOpacity style={SearchBarStyle.filterView}>
        <Image source={IMAGES.filter} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
