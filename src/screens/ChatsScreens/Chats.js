import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useRef } from "react";
import TopHeader from "../../components/Molecules/Header/Header";
import { _goBack } from "../../services/CommonServices";
import { _COLORS, IMAGES } from "../../Themes";
import Chat from "../../components/Molecules/Chats/Chat";
import { ChatsStyle } from "./ChatsStyle";
import { Divider } from "react-native-paper";
import SearchBar from "../../components/Molecules/SearchBar/SearchBar";
import RBSheet from "react-native-raw-bottom-sheet";
// import UploadImageData from "../../components/Molecules/UploadImage/UploadImage";
import ChatPopup from "../../components/Molecules/Chats/ChatPop/ChatPopup";
import { SwipeListView } from "react-native-swipe-list-view";
const Chats = (props) => {
  const refRBSheet = useRef();
  const toggleView = () => {
    setVisible(!visible);
  };
  return (
    <View style={ChatsStyle.container}>
      <TopHeader
        // onPressLeftButton={() => _goBack(props)}
        onPressLeftButton={() => props.navigation.navigate("Dashboard")}
        MiddleText={"Chats"}
      />
      <ScrollView>
      
        <View style={ChatsStyle.maincontainer}>
          <View style={ChatsStyle.searchview}>
            <SearchBar
              filterImage={IMAGES.filter}
              frontSearchIcon
              marginTop={3}
            />
          </View>
          <TouchableOpacity
            style={ChatsStyle.componentview}
            onPress={() => {
              refRBSheet.current.open();
            }}
          >
            
            <Chat
              imagesource={IMAGES.userImage}
              heading="Tom’s property"
              description="Tom’s send file"
              time="11:30 PM"
            />
          </TouchableOpacity>
          <Divider style={ChatsStyle.divider} />

          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.open();
            }}
          >
            <Chat
              imagesource={IMAGES.userImage}
              heading="Fred’s property"
              description="You send an image"
              time="Yesterday"
            />
          </TouchableOpacity>
          <Divider style={ChatsStyle.divider} />

          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.open();
            }}
          >
            <Chat
              imagesource={IMAGES.userImage}
              heading="Ralph’s property"
              description="contractor send video"
              time="March 20"
            />
          </TouchableOpacity>
          <Divider style={ChatsStyle.divider} />
        </View>

        <RBSheet
          ref={refRBSheet}
          height={170}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: ChatsStyle.bottomModal_container,
          }}
        >
          <ChatPopup onPress={toggleView} />
        </RBSheet>
      
      </ScrollView>
    </View>
  );
};

export default Chats;
