import moment from 'moment';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { base_color } from '../../redux/constants';

const { width, height } = Dimensions.get('window');
const calHeight = width + 50;
const calWidth = width - 20;
const calViewHeight = calHeight - (calHeight/8);
const calWeekHeight = calViewHeight/8;

const weekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function Calendar() {
  const [days, setDays] = useState([]);
  const [ weekStart, setWS ] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ curMonth, setCM ] = useState(moment().month());
  const [ curDay, setDay ] = useState(moment().date());
  const [ homeOpen, setHO ] = useState(false);
  const [curDate, setCurDate] = useState(moment(new Date()));
  const [ pressedDay, setPressedDay ] = useState(null);
  useEffect(()=>{
    console.log(moment.months(moment().month()))
    var days = moment().daysInMonth();
    var dayStarts = moment(moment().startOf('month')).day();
    var dayEnds = moment(moment().endOf('month')).day();
    var finalDays = [].concat(Array(dayStarts).fill(0));
    for(var i = 1; i<=days; i++){
      finalDays.push(i);
    }
    let final = [...finalDays].concat(Array(weekNames.length - dayEnds).fill(0));
    setDays(final);
    setLoading(false);
  }, [])
  const handleNextMonth = () =>{
    var next = moment(curDate).add(1, "months");
    var days = next.daysInMonth();
    var dayStarts = next.startOf('month').day();
    var dayEnds = next.endOf('month').day();
    let finalDays = [].concat(Array(dayStarts).fill(0));
    for(var i = 1; i<=days; i++){
      finalDays.push(i);
    }
    let final = [...finalDays].concat(Array(weekNames.length - dayEnds).fill(0));
    setDays(final);
    setCM(next.month());
    setCurDate(moment(curDate.add(1, "months")));
  }
  const handlePrevMonth = () =>{
    var next = moment(curDate).add(-1, "months");
    var days = next.daysInMonth();
    var dayStarts = next.startOf('month').day();
    var dayEnds = next.endOf('month').day();
    var finalDays = [].concat(Array(dayStarts).fill(0));
    for(var i = 1; i<=days; i++){
      finalDays.push(i);
    }
    let final = [...finalDays].concat(Array(weekNames.length - dayEnds).fill(0));
    setDays(final);
    setCM(next.month());
    setCurDate(next);
  }
  return (
    <View style={{
      ...StyleSheet.absoluteFill,
      backgroundColor:'white',
      justifyContent:"center",
      alignItems:"center"
    }} >
      
      <View style={{
        height:calHeight,
        width: calWidth,
      }} >
        <View style={{
          height:calHeight/8,
          width:calWidth,
          flexDirection:'row',
          justifyContent:"space-evenly"
        }} >
          <TouchableOpacity onaPress={()=>{
            handlePrevMonth()
          }} >
            <AntDesign name="leftcircle" size={24} color="black" />
          </TouchableOpacity>
          <View style={{paddingHorizontal:'10%'}} >
            <Text style={{
              fontSize:22,
              color:"grey"
            }} >{moment.months(curMonth)}</Text>
          </View>
          <TouchableOpacity onPress={()=>{
            handleNextMonth()
          }} >
            <AntDesign name="rightcircle" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{
          height:calViewHeight,
          width:calWidth
        }} >
          <View style={{
            height:calWeekHeight,
            width:calWidth,
            display:'flex',
            flexDirection:'row'
            ,justifyContent:'space-around',
            alignItems:"center"
          }} >
            {
              weekNames.map(w=>(
                <View key={w} style={{
                  width:calWidth / 7.3,
                  justifyContent:"center",
                  alignItems:'center',
                  
                }} >
                  <Text style={{
                    fontSize:19,
                    color:"grey"
                  }} >{w}</Text>
                </View>
              ))
            }
          </View>
          <View style={{
            width:calWidth,
            height:calViewHeight - calWeekHeight,
            flexDirection:'row',
            flexWrap:'wrap',
            justifyContent:"space-around"
          }} >
            {
              days.map((d, i)=>{
                
                if(d === 0){
                    console.log(i, "index")
                  return(
                    <TouchableOpacity key={i} style={{
                      width: calWidth / 7.3,
                      alignItems:'center',
                      marginVertical:4,
                      paddingHorizontal:"3%",
                      paddingVertical:"3%",
                      backgroundColor:"white",
                    }} >
                      
                    </TouchableOpacity>
                  )
                }
                else{
                  return(
                    <TouchableOpacity key={i} style={{
                      width: calWidth / 7.3,
                      alignItems:'center',
                      marginVertical:4,
                      paddingHorizontal:"2%",
                      paddingVertical:"3%",
                      backgroundColor:"white",
                      borderRadius:100,
                      shadowColor:"grey",
                      elevation:5,
                    }} onPress={()=>{
                      setPressedDay(d);
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
              })
            }
          </View>
        </View>
      </View>
    </View>
  )
}

export default Calendar