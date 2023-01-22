import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react';
import { AntDesign as Icon } from '@expo/vector-icons';

import { TextInput } from 'react-native-gesture-handler';
import { base_color } from '../../redux/constants';
import Sign from './Sign';

const Timesheet = ({navigation, route}) => {
    const {type, home} = route.params.detail;
    const [ show, setShow ] = useState(false);
    
  return (
    <KeyboardAvoidingView behavior="padding" style={{
        ...StyleSheet.absoluteFill,
        backgroundColor:"white",
        
    }} contentContainerStyle={{
        ...StyleSheet.absoluteFill,
        backgroundColor:"white",
        
    }} >
      {
        show?(
            <Sign setShow={setShow} />
        ):(
            <>
                <View style={{flex:0.3, justifyContent:"center", alignItems:"center"}} >
                <Text>Mycare LTD</Text>
                <View style={{
                    flexDirection:"row",
                    paddingVertical:5,
                    justifyContent:"center",
                    alignItems:"center"
                }} >
                    <Icon name="mail" size={15} color="black" />
                    <Text style={{paddingLeft:5}} >info@mycareltd.com</Text>
                </View>
                <View style={{
                    flexDirection:"row",
                    paddingVertical:5,
                    justifyContent:"center",
                    alignItems:"center"
                }} >
                    <Icon name="phone" size={15} color="black" />
                    <Text style={{paddingLeft:5}} >07436362617</Text>
                </View>
                </View>
                <View style={{flex:0.7,  alignItems:"center"}} >
                <Text>SHIFT TYPE : {type}</Text>
                <Text>HOME: {home.company}</Text>
                <TextInput
                    style={{
                        height:50,
                        width:"80%",
                        textAlign:"center",
                        backgroundColor:"white",
                        elevation:3,
                        shadowColor:"grey",
                        shadowOffset:{width:0, height:1},
                        shadowOpacity:1,
                        borderRadius:100,
                        marginVertical:"2%"
                    }}
                    placeholder='Authorized Name' 
                />
                <TextInput
                    style={{
                        height:50,
                        width:"80%",
                        textAlign:"center",
                        backgroundColor:"white",
                        elevation:3,
                        shadowColor:"grey",
                        shadowOffset:{width:0, height:1},
                        shadowOpacity:1,
                        borderRadius:100,
                        marginVertical:"2%"
                    }}
                    placeholder='Position' 
                />
                <TouchableOpacity style={{
                    paddingVertical:"4%",
                    paddingHorizontal:"20%",
                    elevation:3,
                    shadowColor:"grey",
                    shadowOffset:{width:0, height:1},
                    shadowOpacity:1,
                    borderRadius:100,
                    backgroundColor:base_color
                }} onPress={()=>{
                    setShow(true)
                }} >
                    <Text>SIGN</Text>
                </TouchableOpacity>
                </View>
            </>
        )
      }
    </KeyboardAvoidingView>
  )
}

export default Timesheet