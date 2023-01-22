import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import CalendarTab from '../AdminTabs/CalendarTab';
import Icon from '@expo/vector-icons/AntDesign';
import Calendar from './Calendar';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Header from '../Header';
import DrawerContent from './DrawerContent';
import Detail from './Detail';
import Timesheet from './Timesheet';
import Sign from './Sign';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();
function CarerNavigator() {
  return (
    <View style={{
        flex:1,
        
    }} >
        <Drawer.Navigator drawerContent={props=><DrawerContent {...props} />} screenOptions={{headerShown:false}} >
          <Drawer.Screen name="Home" component={CarerStack} />
        </Drawer.Navigator>
    </View>
  )
}


const CarerStack = ({navigation}) =>{
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
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="Timesheet" component={Timesheet} />
          
          <Stack.Screen name="Sign" component={Sign} />
        </Stack.Navigator>
        
    </View>
  )
}

export default CarerNavigator