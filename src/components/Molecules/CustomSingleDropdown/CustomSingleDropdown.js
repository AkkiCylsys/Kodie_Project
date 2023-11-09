// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, ScrollView } from "react-native";
// import Entypo from "react-native-vector-icons/Entypo";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { CustomSingleDropdownStyle } from "./CustomSingleDropdownStyle";
// import { _COLORS } from "../../../Themes";


// const CustomSingleDropdown = (props) => {
//   const [show, setShow] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [appliedOptions, setAppliedOptions] = useState([]);

//   // -----all data is show in the dropdown menu
//   const data = props.data || [
//     "All",
//     "House",
//     "Cottage",
//     "Apartment / Flat",
//     "Townhouse",
//     "Farm",
//   ];

//   const toggleOption = (option) => {
//     if (option === "All") {
//       //   -----when you clicked  "All", select all options or clear all if already selected.
//       const updatedOptions =
//         selectedOptions.length === data.length - 1 ? [] : [...data.slice(1)];

//       setSelectedOptions(updatedOptions);
//     } else {
//       const updatedOptions = selectedOptions.includes(option)
//         ? selectedOptions.filter((item) => item !== option)
//         : [...selectedOptions, option];
//       setSelectedOptions(updatedOptions);
//     }
//   };

//   const toggleshow = () => {
//     setShow(!show);
//   };
//   //  -------this is applied data code here
//   const applySelection = () => {
//     setAppliedOptions(selectedOptions);
//     setShow(false);
//     if (props.onApply) {
//       // -------Callback to parent component
//       props.onApply(selectedOptions);
//     }
//   };
//   //  -------this is clearing data code here
//   const clearSelection = () => {
//     setSelectedOptions([]);
//     console.warn("selected");
//     setAppliedOptions([]);
//     if (props.onClear) {
//       //------ Callback to parent component
//       props.onClear();
//     }
//   };
//   return (
//     <View>
//       <View style={CustomSingleDropdownStyle.bindview}>
//         {/* ------------- bydefault hide the options value and showing data in dropdown value  */}
//         <TouchableOpacity
//           style={CustomSingleDropdownStyle.dropmenu}
//           onPress={toggleshow}
//         >
//           {appliedOptions.length > 0 ? (
//             <View style={CustomSingleDropdownStyle.datavisiable}>
//               {appliedOptions.map((option) => (
//                 <Text
//                   key={option}
//                   style={CustomSingleDropdownStyle.selectedOptionText}
//                 >
//                   {option}
//                 </Text>
//               ))}
//             </View>
//           ) : (
//             <Text style={CustomSingleDropdownStyle.placeholdertext}>
//               {props.placeholdertext}
//             </Text>
//           )}

//           <Entypo
//             name={show ? "chevron-up" : "chevron-down"}
//             size={22}
//             color={_COLORS.Kodie_BlackColor}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* ------------------ bydefault hide the options value  */}
//       {show && (
//         <View style={CustomSingleDropdownStyle.dropoptionsview}>
//           <ScrollView>
//             {data.map((option) => (
//               <View style={CustomSingleDropdownStyle.bindselectmenu} key={option}>
//                 <TouchableOpacity
//                   onPress={() => toggleOption(option)}
//                   style={CustomSingleDropdownStyle.checkboxbind}
//                 >
//                   <MaterialCommunityIcons
//                     name={
//                       selectedOptions.includes(option)
//                         ? "checkbox-marked-circle"
//                         : "circle-outline"
//                     }
//                     size={25}
//                     style={CustomSingleDropdownStyle.checkbox}
//                     color={
//                       selectedOptions.includes(option)
//                         ? "_COLORS.Kodie_GreenColor"
//                         : "_COLORS.Kodie_LightGrayColor"
//                     }
//                   />
//                 </TouchableOpacity>
//                 <Text style={CustomSingleDropdownStyle.bindselecttext}>{option}</Text>
//               </View>
//             ))}
//           </ScrollView>

//           {/* ------------------ button selction section here  */}

//           {props.btnview ? (
//             <View style={CustomSingleDropdownStyle.btnview}>
//               <View style={CustomSingleDropdownStyle.cancleview}>
//                 <TouchableOpacity onPress={clearSelection}>
//                   <Text style={CustomSingleDropdownStyle.canclebtn}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>

//               <View style={CustomSingleDropdownStyle.applyview}>
//                 <TouchableOpacity onPress={applySelection}>
//                   <Text style={CustomSingleDropdownStyle.aaplybtn}>Apply</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ) : null}
//         </View>
//       )}
//     </View>
//   );
// };

// CustomSingleDropdown.defaultprops = {
//   btnview: false,
// };

// export default CustomSingleDropdown;

// -------------------------------------------------------
// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, ScrollView } from "react-native";
// import Entypo from "react-native-vector-icons/Entypo";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { CustomSingleDropdownStyle } from "./CustomSingleDropdownStyle";
// import { _COLORS } from "../../../Themes";

// const CustomSingleDropdown = (props) => {
//   const [show, setShow] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(""); // Change this line
//   const [appliedOption, setAppliedOption] = useState(""); // Change this line

//   // -----all data is shown in the dropdown menu
//   const data = props.data || [
//     "All",
//     "House",
//     "Cottage",
//     "Apartment / Flat",
//     "Townhouse",
//     "Farm",
//   ];

//   const toggleOption = (option) => {
//     if (option === "All" || selectedOption === option) {
//       setSelectedOption(""); // Clear the selection if "All" is clicked or the same option is clicked again
//     } else {
//       setSelectedOption(option); // Set the selected option
//     }
//   };

//   const toggleshow = () => {
//     setShow(!show);
//   };

//   //  -------this is applied data code here
//   const applySelection = () => {
//     setAppliedOption(selectedOption);
//     setShow(false);
//     if (props.onApply) {
//       // -------Callback to the parent component
//       props.onApply(selectedOption);
//     }
//   };

//   //  -------this is clearing data code here
//   const clearSelection = () => {
//     setSelectedOption("");
//     setAppliedOption("");
//     if (props.onClear) {
//       //------ Callback to the parent component
//       props.onClear();
//     }
//   };

//   return (
//     <View>
//       <View style={CustomSingleDropdownStyle.bindview}>
//         {/* ------------- by default hide the options value and show data in the dropdown value  */}
//         <TouchableOpacity style={CustomSingleDropdownStyle.dropmenu} onPress={toggleshow}>
//           {appliedOption ? (
//             <Text style={CustomSingleDropdownStyle.selectedOptionText}>
//               {appliedOption}
//             </Text>
//           ) : (
//             <Text style={CustomSingleDropdownStyle.placeholdertext}>
//               {props.placeholdertext}
//             </Text>
//           )}
//           <Entypo
//             name={show ? "chevron-up" : "chevron-down"}
//             size={22}
//             color={_COLORS.Kodie_BlackColor}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* ------------------ by default hide the options value  */}
//       {show && (
//         <View style={CustomSingleDropdownStyle.dropoptionsview}>
//           <ScrollView>
//             {data.map((option) => (
//               <View style={CustomSingleDropdownStyle.bindselectmenu} key={option}>
//                 <TouchableOpacity onPress={() => toggleOption(option)}>
//                   <MaterialCommunityIcons
//                     name={
//                       selectedOption === option
//                         ? "checkbox-marked-circle"
//                         : "circle-outline"
//                     }
//                     size={25}
//                     style={CustomSingleDropdownStyle.checkbox}
//                     color={
//                       selectedOption === option
//                         ? _COLORS.Kodie_GreenColor
//                         : _COLORS.Kodie_LightGrayColor
//                     }
//                   />
//                 </TouchableOpacity>
//                 <Text style={CustomSingleDropdownStyle.bindselecttext}>{option}</Text>
//               </View>
//             ))}
//           </ScrollView>

//           {/* ------------------ button selection section here  */}
//           {props.btnview ? (
//             <View style={CustomSingleDropdownStyle.btnview}>
//               <View style={CustomSingleDropdownStyle.cancleview}>
//                 <TouchableOpacity onPress={clearSelection}>
//                   <Text style={CustomSingleDropdownStyle.canclebtn}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>

//               <View style={CustomSingleDropdownStyle.applyview}>
//                 <TouchableOpacity onPress={applySelection}>
//                   <Text style={CustomSingleDropdownStyle.aaplybtn}>Apply</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ) : null}
//         </View>
//       )}
//     </View>
//   );
// };

// CustomSingleDropdown.defaultprops = {
//   btnview: false,
// };

// export default CustomSingleDropdown;
// -----------------------------------------------------------


import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CustomSingleDropdownStyle } from "./CustomSingleDropdownStyle";
import { _COLORS } from "../../../Themes";

const CustomSingleDropdown = (props) => {
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [appliedOption, setAppliedOption] = useState("");

  // ----- Define the available property types without "All"
  const data = props.data || [
    "House",
    "Cottage",
    "Apartment / Flat",
    "Townhouse",
    "Farm",
  ];

  const toggleOption = (option) => {
    if (selectedOption === option) {
      setSelectedOption("");
    } else {
      setSelectedOption(option);
    }
  };

  const toggleshow = () => {
    setShow(!show);
  };

  const applySelection = () => {
    setAppliedOption(selectedOption);
    setShow(false);
    if (props.onApply) {
      props.onApply(selectedOption);
    }
  };

  const clearSelection = () => {
    setSelectedOption("");
    setAppliedOption("");
    if (props.onClear) {
      props.onClear();
    }
  };

  return (
    <View>
      <View style={CustomSingleDropdownStyle.bindview}>
        <TouchableOpacity style={CustomSingleDropdownStyle.dropmenu} onPress={toggleshow}>
          {appliedOption ? (
            <Text style={CustomSingleDropdownStyle.selectedOptionText}>
              {appliedOption}
            </Text>
          ) : (
            <Text style={CustomSingleDropdownStyle.placeholdertext}>
              {props.placeholdertext}
            </Text>
          )}
          <Entypo
            name={show ? "chevron-up" : "chevron-down"}
            size={22}
            color={_COLORS.Kodie_BlackColor}
          />
        </TouchableOpacity>
      </View>

      {show && (
        <View style={CustomSingleDropdownStyle.dropoptionsview}>
          <ScrollView>
            {data.map((option) => (
              <View style={CustomSingleDropdownStyle.bindselectmenu} key={option}>
                <TouchableOpacity onPress={() => toggleOption(option)}>
                  <MaterialCommunityIcons
                    name={
                      selectedOption === option
                        ? "checkbox-marked-circle"
                        : "circle-outline"
                    }
                    size={25}
                    style={CustomSingleDropdownStyle.checkbox}
                    color={
                      selectedOption === option
                        ? _COLORS.Kodie_GreenColor
                        : _COLORS.Kodie_LightGrayColor
                    }
                  />
                </TouchableOpacity>
                <Text style={CustomSingleDropdownStyle.bindselecttext}>{option}</Text>
              </View>
            ))}
          </ScrollView>

          {props.btnview ? (
            <View style={CustomSingleDropdownStyle.btnview}>
              <View style={CustomSingleDropdownStyle.cancleview}>
                <TouchableOpacity onPress={clearSelection}>
                  <Text style={CustomSingleDropdownStyle.canclebtn}>Cancel</Text>
                </TouchableOpacity>
              </View>

              <View style={CustomSingleDropdownStyle.applyview}>
                <TouchableOpacity onPress={applySelection}>
                  <Text style={CustomSingleDropdownStyle.aaplybtn}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
};

CustomSingleDropdown.defaultprops = {
  btnview: false,
};

export default CustomSingleDropdown;
