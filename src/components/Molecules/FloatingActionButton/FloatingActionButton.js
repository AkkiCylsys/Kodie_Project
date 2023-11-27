// import React from 'react';
// import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
// import { FloatingAction } from 'react-native-floating-action';
// import { _COLORS,IMAGES } from '../../../Themes';
// const actions = [
//   {
//     text: 'Add property',
//     icon: IMAGES.AddProperty,
//     name: 'add_Property',
//     position: 2,
//     color: _COLORS.Kodie_GreenColor,
//     textElevation: 0,
//   },
//   {
//     text: 'Edit dashboard',
//     icon: IMAGES.EditDashboard,
//     name: 'edit_Dashboard',
//     position: 1,
//     color: _COLORS.Kodie_GreenColor,
//     textElevation: 0,
//   },
//   {
//     text: 'Invite prospective tenant',
//     icon: IMAGES.InviteProspectiveTenant,
//     name: 'invite_Prospective_tenant',
//     position: 3,
//     color: _COLORS.Kodie_GreenColor,
//     textElevation: 0,
//   },
//   {
//     text: 'Invite contractor',
//     icon:IMAGES.InviteContractor,
//     name: 'invite_Contract...',
//     position: 4,
//     color: _COLORS.Kodie_GreenColor,
//     textElevation: 0,
//   },
//   {
//     text: 'Add notice / reminder',
//     icon: IMAGES.AddNoticeReminder,
//     name: 'Add_Notice_Reminder',
//     position: 5, 
//     // color: '#37bc12',
//     color: _COLORS.Kodie_GreenColor,
//     textElevation: 0,
//   },
//   {
//     text: 'Create new job',
//     icon: IMAGES.CreateNewJob,
//     name: 'Create_new_job',
//     position: 6, 
//     color: _COLORS.Kodie_GreenColor,
//     textElevation:0
//   },
// ];

// const FloatingActionButton = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container}>
//         <FloatingAction
//           actions={actions}
//           actionsPaddingTopBottom={10}
//           color={_COLORS.Kodie_GreenColor}
//           onPressItem={name => {
//             Alert.alert("Icon pressed", `the icon ${name} was pressed`);
//           }}
//           overlayColor='#DCDCDC'
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: _COLORS.Kodie_GrayColor,
//   },
// });

// export default FloatingActionButton;
