import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';

function Days({d, setHO, setSDate, curDate, calWidth, curDay, curMonth, i}) {
    const [ dayState, setDS ] = useState(false);
    const calContext = useSelector(state=>state.calendar);
    useEffect(()=>{
        const {shiftsPublished} = calContext;
        if(shiftsPublished?.length>0){
            shiftsPublished?.map(shift=>{
                if(d === shift.day && curMonth+1 === shift.month){
                    setDS(true);
                }
                
            })
        }
        setDS(false)
    }, [calContext])
    
  return (
    <TouchableOpacity key={i} style={{
        width: calWidth / 7.3,
        alignItems:'center',
        marginVertical:4,
        paddingHorizontal:"2%",
        paddingVertical:"3%",
        backgroundColor:dayState?"lightblue":"white",
        borderRadius:100,
        shadowColor:"grey",
        elevation:5,
      }} onPress={()=>{
        var d_ = new Date(`${curDate.year()}/${curDate.month()+1}/${d}`);
        setSDate(moment(d_));
        setHO(true);
      }} >
        {
          curDay===d && curMonth === moment().month() &&(
            <Text style={{fontSize:10, position:"absolute", fontWeight:'bold', color:'blue'}} >TODAY</Text>
          )
        }
        <Text style={{
          color:"grey",
          fontSize:22
        }} >{d}</Text>
      </TouchableOpacity>
  )
}

export default Days