import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import CalendarTab from '../AdminTabs/CalendarTab';
import Icon from '@expo/vector-icons/AntDesign';
import Home from './Home';
import Calendar from './Calendar';
import { createStackNavigator } from '@react-navigation/stack';
import Assign from './Assign';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Header from '../Header';
import DrawerContent from './DrawerContent';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();
function HomeNavigator() {
  return (
    <View style={{
        flex:1,
        
    }} >
        <Drawer.Navigator drawerContent={props=><DrawerContent {...props} />} screenOptions={{headerShown:false}} >
          <Drawer.Screen name="Home" component={HomeStack} />
        </Drawer.Navigator>
    </View>
  )
}


const HomeStack = ({navigation}) =>{
  return(
    <View style={{flex:1}} >
      <Stack.Navigator screenOptions={{
          headerShown:true,
          headerStyle:{
            elevation:2,
          },
          headerTitleStyle:{color:"grey", textAlign:"left"}
        }} >
          <Stack.Screen options={{
            header:(props)=>{
              return(
                <Header navigation={navigation} />
              )
            }
          }}name="calendar" component={Calendar} />
          <Stack.Screen options={{
            headerTitle:"",
          }} name="Assign" component={Assign} />
        </Stack.Navigator>
    </View>
  )
}

export default HomeNavigator