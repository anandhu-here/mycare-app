import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import Home from './AdminTabs/Home';
import CalendarTab from './AdminTabs/CalendarTab';
import Search from './AdminTabs/Search';
import Profile from './AdminTabs/Profile';

const Tab = createBottomTabNavigator();

function Admin() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown:false
    }} >
        <Tab.Screen options={{tabBarIcon:({focused, color})=>{
          return(
            <Icon name="home" size={24} color={color} />
          )
        }}} component={Home} name="home" />
        <Tab.Screen options={{tabBarIcon:({focused, color})=>{
          return(
            <Icon name="calendar" size={24} color={color} />
          )
        }}} component={CalendarTab} name="calendar" />
        <Tab.Screen options={{tabBarIcon:({focused, color})=>{
          return(
            <Icon name="search1" size={24} color={color} />
          )
        }}} component={Search} name="search" />
        <Tab.Screen options={{tabBarIcon:({focused, color})=>{
          return(
            <Ionicons name="person" size={24} color="black" />
          )
        }}} component={Profile} name="profile" />
    </Tab.Navigator>
  )
}

export default Admin