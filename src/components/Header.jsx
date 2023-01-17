
import React from 'react'
import {  StatusBar, Text, View, TouchableOpacity } from 'react-native'
import { base_color } from '../redux/constants';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../redux/types/auth';
import { removeData } from './asyncStore';

function Header() {
    const dispatch = useDispatch();
  return (
    <View style={{
        height:60,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor:"#ffffff",
    }} >
        <View style={{
            backgroundColor: base_color,
            elevation:3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            marginLeft:15,
            width:"30%",
            height: "80%",
            justifyContent:"center",
            alignItems:"center",
            borderTopRightRadius:100,
            borderBottomRightRadius:100
        }} >
            <Text style={{
                fontSize:20,
                color:"white",
            }} >Mycare</Text>
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