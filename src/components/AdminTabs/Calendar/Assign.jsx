import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { baseUrl, base_color } from '../../redux/constants';

function Assign() {
    const dispatch = useDispatch();
    const calendar = useSelector(state=>state.calendar);
    const authContext = useSelector(state=>state.userLogin);
    const [ date, setDate ] = useState(moment(new Date()));
    const [ shift, setShift ] = useState(null);
    


    // useEffect(()=>{
    //     axios.get(`${baseUrl}/get/carers`, {headers:{
    //         "Authorization": authContext.userInfo.token 
    //     }}).then(res=>{
    //         console.log(res.data)
    //     }).catch(e=>{
    //         console.log(e, "ppp")
    //     })
    // }, [])
    useEffect(()=>{
        dispatch({type:"HIDE_MAIN_HEADER", payload:false});
        const {shiftsForAssign} = calendar;
        if(shiftsForAssign){
            setShift(shiftsForAssign);
            const { day, month, year }= shiftsForAssign;
            var d_ = moment(new Date(`${year}/${month}/${day}`));
            setDate(d_);
        }
        return ()=>{
            dispatch({type:"SHOW_MAIN_HEADER", payload:false})
        }
    }, [])
  return (
    <View style={{
        ...StyleSheet.absoluteFill,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center"
    }} >
        <View style={{flex:0.1, width:"100%", justifyContent:"center", alignItems:"center"}} >
            <Text style={{
                fontSize:20,
                fontWeight:"bold",
                color:"grey"
            }} >{date!==null&&date.format('LL')}</Text>
        </View>
        <View style={{flex:0.7, width:"100%", justifyContent:"space-evenly", alignItems:"center"}} >
            <TouchableOpacity style={{
                backgroundColor:"white",
                width:"80%",
                height:"13%",
                justifyContent:"center",
                borderRadius:100,
                elevation:3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            }} >
                <Text style={{
                    fontSize:19,
                    textAlign:"center",
                    fontWeight:'500',
                    color:base_color
                }} >Longday : {shift.longday}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor:"white",
                width:"80%",
                height:"13%",
                justifyContent:"center",
                borderRadius:100,
                elevation:3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            }} >
                <Text style={{
                    fontSize:19,
                    textAlign:"center",
                    fontWeight:'500',
                    color:base_color
                }} >night : {shift.night}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor:"white",
                width:"80%",
                height:"13%",
                justifyContent:"center",
                borderRadius:100,
                elevation:3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            }} >
                <Text style={{
                    fontSize:19,
                    textAlign:"center",
                    fontWeight:'500',
                    color:base_color
                }} >early : {shift.early}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor:"white",
                width:"80%",
                height:"13%",
                justifyContent:"center",
                borderRadius:100,
                elevation:3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            }} >
                <Text style={{
                    fontSize:19,
                    textAlign:"center",
                    fontWeight:'500',
                    color:base_color
                }} >Late : {shift.late}</Text>
            </TouchableOpacity>
        </View>
        <View style={{flex:0.1, width:"100%"}} >

        </View>

    </View>
  )
}

export default Assign