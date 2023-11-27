import { View, Text, Image, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { _COLORS, IMAGES, LABEL_STYLES } from "../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
import SearchBar from "../SearchBar/SearchBar";
import { AddguestsComponentStyle } from "./AddguestsComponentStyle";
const AddguestsComponent = (props) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.Visible}
        onRequestClose={props.onRequestClose}
      >
        <View style={AddguestsComponentStyle.modalContainer}>
          <View style={AddguestsComponentStyle.modalContent}>
            <View style={AddguestsComponentStyle.headingView}>
              <Text style={AddguestsComponentStyle.addguestetext}>
                {"Add guests"}
              </Text>
              <TouchableOpacity onPress={props.onRequestClose}>
                <Entypo
                  name="cross"
                  size={25}
                  color={_COLORS.Kodie_BlackColor}
                />
              </TouchableOpacity>
            </View>
            <SearchBar frontSearchIcon height={45} marginTop={20} />
            <View style={AddguestsComponentStyle.Imageview}>
              <View style={AddguestsComponentStyle.imagetext}>
                <Image
                  source={IMAGES.userImage}
                  style={AddguestsComponentStyle.profileimage}
                />
                <Text style={AddguestsComponentStyle.camerontext}>Cameron</Text>
                <Text>(contractor)</Text>
              </View>
              <TouchableOpacity>
                <View style={AddguestsComponentStyle.addbtn}>
                  <Text>Add</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={AddguestsComponentStyle.Imageview}>
              <View style={AddguestsComponentStyle.imagetext}>
                <Image
                  source={IMAGES.userImage}
                  style={AddguestsComponentStyle.profileimage}
                />
                <Text style={AddguestsComponentStyle.camerontext}>Eleanor</Text>
                <Text>(tenant)</Text>
              </View>
              <TouchableOpacity>
                <View style={AddguestsComponentStyle.addbtn}>
                  <Text>Add</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={AddguestsComponentStyle.Imageview}>
              <View style={AddguestsComponentStyle.imagetext}>
                <Image
                  source={IMAGES.userImage}
                  style={AddguestsComponentStyle.profileimage}
                />
                <Text style={AddguestsComponentStyle.camerontext}>Darrell</Text>
              </View>
              <TouchableOpacity>
                <View style={AddguestsComponentStyle.addbtn1}>
                  <Text>Add</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={AddguestsComponentStyle.Imageview}>
              <View style={AddguestsComponentStyle.imagetext}>
                <Image
                  source={IMAGES.userImage}
                  style={AddguestsComponentStyle.profileimage}
                />
                <Text style={AddguestsComponentStyle.camerontext}>Dianne</Text>
              </View>
              <TouchableOpacity>
                <View style={AddguestsComponentStyle.addbtn1}>
                  <Text>Add</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={AddguestsComponentStyle.ButtonView}>
              <TouchableOpacity
                style={[
                  AddguestsComponentStyle.closeButton,
                  AddguestsComponentStyle.closeText,
                ]}
              >
                <Text style={LABEL_STYLES.commontext}>cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  AddguestsComponentStyle.closeButton,
                  AddguestsComponentStyle.applyText,
                ]}
              >
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    AddguestsComponentStyle.text,
                  ]}
                >
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddguestsComponent;
