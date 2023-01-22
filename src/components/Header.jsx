
import React, { useEffect, useState } from 'react'
import {  StatusBar, Text, View, TouchableOpacity } from 'react-native'
import { base_color } from '../redux/constants';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../redux/types/auth';
import { removeData } from './asyncStore';
import { Constants } from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';

function Header({navigation}) {
    const dispatch = useDispatch();
    const [ height, setHeight ] = useState();
  return (
    <View style={{
        height:60,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor:"white",
    }} >
        <View style={{
            flexDirection:"row",
            justifyContent:"flex-start",
            alignItems:"center",
            height:"100%",
            backgroundColor:"white",
        }} >
            <TouchableOpacity style={{
                paddingHorizontal:"5%"
            }} onPress={()=>{
                navigation.openDrawer()
            }} >
                <AntDesign name="menu-fold" size={30} color="grey" style={{
                    elevation:3,
                    shadowColor:"grey",
                    shadowOffset:{width:1, height:2},
                    shadowOpacity:0.5,
                    shadowRadius:2
                }} />
            </TouchableOpacity>
            <View style={{
                backgroundColor: base_color,
                elevation:3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                width:"50%",
                height: "80%",
                justifyContent:"center",
                alignItems:"center",
                borderTopRightRadius:100,
                borderBottomRightRadius:100
            }} >
                
                <Text style={{
                    fontSize:20,
                    color:"white",
                }} >Mycare {height} </Text>
            </View>
        </View>
        <View style={{
            paddingRight:20,
            justifyContent:"center",
            alignItems:"center"
        }} >
            <TouchableOpacity style={{
                alignItems:"center",
                justifyContent:"center"
            }} >
                <MaterialIcons name="logout" size={30} color="black" onPress={()=>{
                    removeData().then(()=>{
                        dispatch({type:LOGOUT})
                        
                    }).catch(e=>{
                        alert("Logout failed")
                    })
                    
                }} />
                <Text style={{fontSize:10}} >LOGOUT</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Header