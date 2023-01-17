import React from 'react'
import { View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Carer from './UserTabs/Carer';
import Homes from './UserTabs/Homes';

const Tab = createMaterialTopTabNavigator();
function Search() {
  return (
    <View style={{
        flex:1,
        backgroundColor:"white",
    }} >
        <Tab.Navigator>
            <Tab.Screen name='carer' component={Carer} />
            <Tab.Screen name='homes' component={Homes} />
        </Tab.Navigator>
    </View>
  )
}

export default Search