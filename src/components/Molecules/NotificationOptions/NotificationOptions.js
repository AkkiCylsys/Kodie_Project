import { View, Text } from 'react-native'
import React from 'react'
import { NotificationOptionsStyle } from './NotificationOptionsStyle'
import Entypo from 'react-native-vector-icons/Entypo'
const NotificationOptions = () => {
  return (
    <View>
      <Text>Notification options</Text>
      <Entypo name='cross'/>
    </View>
  )
}

export default NotificationOptions