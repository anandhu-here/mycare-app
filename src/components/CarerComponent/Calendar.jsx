import moment from 'moment';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { baseUrl, base_color } from '../../redux/constants';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
const { width, height } = Dimensions.get('window');
const calHeight = width + 50;
const calWidth = width - 20;
const calViewHeight = calHeight - (calHeight/8);
const calWeekHeight = calViewHeight/8;

const weekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function Calendar({navigation, route}) {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ curMonth, setCM ] = useState(moment().month());
  const [ curDay, setDay ] = useState(moment().date());
  const [ homeOpen, setHO ] = useState(false);
  const [curDate, setCurDate] = useState(moment(new Date()));
  const [ selectedDate, setSDate ] = useState(moment(new Date()));
  const [longday, setLD] = useState(0);
  const [night, setNT] = useState(0);
  const [late, setLate] = useState(0);
  const [early, setEA] = useState(0);
  const [selShift, setSelShift] = useState(null);
  const [ shifts, setShifts ] = useState([]);
  const authContext = useSelector(state=>state.userLogin);
  const calContext = useSelector(state=>state.calendar);
  const dispatch = useDispatch();
  const [ shiftData, setSD ] = useState([]);
  const [today, setToday] = useState(false);

  const fetchShifts = async(month) =>{
    try{
        const {id} = authContext.userInfo.user.carer;
      const {data} = await axios.get(`${baseUrl}/shifts/list/carer?id=${id}`, {headers:{
        "Authorization": authContext.userInfo.token 
      }})
      
      setShifts(data);
      return data;
    } 
    catch(e){
      return e;
    }
    
  }
  const handleDaysofCalendar = (monthObj, data) =>{
    var days = monthObj.daysInMonth();
    var dayStarts = moment(moment().startOf('month')).day();
    var dayEnds = moment(moment().endOf('month')).day();
    var finalDays = [].concat(Array(dayStarts).fill({day:0, flag:0}));
    for(var i = 1; i<=days; i++){
      finalDays.push({day:i, flag:0, shiftData:null});
    }
    let final = [...finalDays].concat(Array(weekNames.length - dayEnds).fill({day:0, flag:0, shiftData:null}));
    var temp = [];
    if(typeof data === "object"){ 
      final.map(i=>{
        data.map(j=>{
          if(j.shift.day === i.day && j.shift.month === monthObj.month() + 1){
            i.flag = 1,
            i.shiftData = j;
          }
        })
      })
    }
    
    setDays(final);
    setLoading(false);
    setCM(monthObj.month());
    setCurDate(monthObj);
    dispatch({type:"SHIFT_PUBLISHED", payload:data})
  }
  useEffect( ()=>{
    fetchShifts(moment().month()+1).then((data)=>{
      handleDaysofCalendar(moment(), data)
    }).catch(e=>{
      console.log(e)
    })
    
  }, [])

  useEffect(()=>{
  if(route.params !== undefined){
    const {shift, flag} = route.params;
    let temp;
    if(flag === 'edit'){
      temp = [...shifts];
      temp.map(s=>{
        if(s.id === shift.id){
          const {longday, night, late, early} = shift;
          s.longday = longday,
          s.night = night;
          s.late = late;
          s.early = early
        }
      })

    }
    else{
      temp = [...shifts].filter(i=>i.id !== shift.id);
      
    }
    setShifts(temp);
    handleDaysofCalendar(moment(), temp);
  }

  }, [route])
  
  const handleNextMonth = async() =>{
    const next = moment(curDate).add(1, "months");
    console.log(curMonth, next.month())
    const data = await fetchShifts(next.month()+1)
    handleDaysofCalendar(next, data)
  }

  const handleReset = () =>{
    setHO(false);
    setSDate({date:moment(new Date()), flag:0});
    setLD(0);setNT(0);setEA(0);setLate(0);setND(false);
    setSD([]);
  }

  const handleSubmit = () =>{
    let curShift = false;
    if(longday+night+late+early > 0){
      curShift = {longday:longday, night:night, late:late, early:early, year:`${selectedDate.date.year()}`,day:`${selectedDate.date.date()}`, month:selectedDate.date.month()+1, state:0};
      
    }
    const finalData = curShift?{shifts:[...shiftData, curShift]}:{shifts:[...shiftData]};
    axios.post(`${baseUrl}/shifts/add/bulk`, finalData, {headers:{
      'Content-Type':'application/json',
      "Authorization": authContext.userInfo.token 
    }}).then(res=>{
      var new_ = [...shifts, ...res.data]
      setShifts(new_);
      handleDaysofCalendar(moment(), new_);
      handleReset();
      
    }).catch(e=>{
      alert("Somwthing went wrong")
    })
  }

  const handlePrevMonth = () =>{
    var next = moment(curDate).add(-1, "months");
    fetchShifts(next.month()+1).then(data=>{
      handleDaysofCalendar(next, data);
    }).catch(e=>{
      console.log(e, "error")
    })
  }
  const colors = ["white", base_color, "lightgreen"]

  return (
    <View style={{
      ...StyleSheet.absoluteFill,
      backgroundColor:'white',
      justifyContent:"center",
      alignItems:"center"
    }} >
        <Modal visible={today} transparent={true} >
            <View style={{
            ...StyleSheet.absoluteFill,
            backgroundColor:"rgba(0,0,0,0.7)",
            justifyContent:"center",
            alignItems:"center"
        }} >
            <TouchableOpacity style={{
                position:"absolute",
                zIndex:1000,
                top:'13%',
                left:"2%",
                elevation:16
                }} onPress={()=>setToday(false)} > 
                <AntDesign  name="closecircle" size={40} color={base_color} />
            </TouchableOpacity>
            <View style={{
                flex:0.5,
                width:"95%",
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"white",
                borderRadius:50
            }} >
                <View style={{flex:0.1, alignItems:"center", justifyContent:"center", borderBottomWidth:0.5, width:"80%"}} >
                    <Text style={{fontSize:20, fontWeight:'bold', color:"grey"}} >{selectedDate.format('LL')}</Text>
                </View>
                <View style={{flex:0.6, alignItems:"center", justifyContent:"center"}} >
                    <Text style={{fontSize:20, color:"grey",}} >{selShift?.home.company}</Text>
                    <Text style={{fontSize:19, color:"grey",}} >{selShift?.home.adress1}</Text>
                    <Text style={{fontSize:17, color:"grey",}} >{selShift?.home.postcode}</Text>
                    <Text style={{fontSize:20,fontWeight:"bold", paddingVertical:"5%", color:"grey",}}>{selShift?.type.toUpperCase()}</Text>
                </View>
                <View style={{flex:0.2, width:"100%", alignItems:"center", justifyContent:"space-evenly", flexDirection:"row"}} >
                    <TouchableOpacity style={{
                        paddingHorizontal:'6%',
                        height:"80%",
                        backgroundColor:"brown",
                        justifyContent:"center",
                        alignItems:"center",
                        borderRadius:100
                    }} >
                        <Text style={{color:"white"}} >CANCEL REQUEST</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        paddingHorizontal:'6%',
                        height:"80%",
                        backgroundColor:base_color,
                        justifyContent:"center",
                        alignItems:"center",
                        borderRadius:100
                    }} onPress={()=>{
                        setToday(false);
                        var t = selShift;
                        setSelShift(null);
                        navigation.navigate('Timesheet', {detail:t})
                    }} >
                        <Text style={{color:"white"}} >FINISH</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </Modal>
      <View style={{
        height:calHeight,
        width: calWidth,
        backgroundColor:"white",
        elevation:3,
        backgroundColor:'white',
      }} >
        <View style={{
          height:calHeight/8,
          width:calWidth,
          flexDirection:'row',
          justifyContent:"space-evenly"
        }} >
          <TouchableOpacity onPress={()=>{
            handlePrevMonth()
          }} >
            <AntDesign name="leftcircle" size={34} color={base_color} />
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
            <AntDesign name="rightcircle" size={34} color={base_color}  />
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
                
                if(d.day === 0){
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
                      backgroundColor:colors[d.flag],
                      borderRadius:10,
                      elevation:3,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.5,
                      shadowRadius: 2,
                    }} onPress={()=>{
                        var d_ = new Date(`${curDate.year()}/${curDate.month()+1}/${d.day}`);

                        setSDate(moment(d_));
                        setSelShift({...d.shiftData.shift, type:d.shiftData.type})
                        setToday(true)
                      
                    }} >
                      {
                        curDay===d.day && curMonth === moment().month() &&(
                          <Text style={{fontSize:10, position:"absolute", fontWeight:'bold', color:'blue'}} >TODAY</Text>
                        )
                      }
                      <Text style={{
                        color:"grey",
                        fontSize:22
                      }} >{d.day}</Text>
                    </TouchableOpacity>
                    // <Days i ={i} d={d} curDate={curDate} setHO={setHO} setSDate={setSDate} calWidth={calWidth} curDay={curDay} curMonth={curMonth}/>
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