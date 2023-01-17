import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { StyleSheet, View } from 'react-native'
import CalendarTab from '../AdminTabs/CalendarTab';
import Icon from '@expo/vector-icons/AntDesign';
import Home from './Home';
import Calendar from './Calendar';


const Tab = createBottomTabNavigator();
function HomeNavigator() {
  return (
    <View style={{
        ...StyleSheet.absoluteFill,
    }} >
        <Calendar/>
    </View>
  )
}

export default HomeNavigator