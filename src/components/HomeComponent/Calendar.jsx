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
  const [ selectedDate, setSDate ] = useState({date:moment(new Date()), flag:0});
  const [longday, setLD] = useState(0);
  const [night, setNT] = useState(0);
  const [late, setLate] = useState(0);
  const [early, setEA] = useState(0);
  const [nextDis, setND] = useState(false);
  const [ shifts, setShifts ] = useState([]);
  const authContext = useSelector(state=>state.userLogin);
  const calContext = useSelector(state=>state.calendar);
  const dispatch = useDispatch();
  const [ shiftData, setSD ] = useState([]);

  const fetchShifts = async(month) =>{
    try{
      const {data} = await axios.get(`${baseUrl}/shifts/list/home?month=${month}`, {headers:{
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
          if(j.day === i.day && j.month === monthObj.month() + 1){
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

    <Modal visible={homeOpen} >
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
            }} onPress={()=>handleReset()} > 
            <AntDesign  name="closecircle" size={40} color={base_color} />
          </TouchableOpacity>
          <View style={{
              flex:0.7,
              backgroundColor:"white",
              width:"95%",
              elevation:10,
              borderRadius:30,
              justifyContent:"center",
              alignItems:"center"
          }} >
                
            <View style={{flex:0.1, alignItems:"center", justifyContent:"center", borderBottomWidth:0.5, width:"80%"}} >
              <Text style={{fontSize:20, fontWeight:'bold', color:"grey"}} >{selectedDate.date.format('LL')}</Text>
            </View>
            <View style={{flex:0.75, width:"95%", justifyContent:"center", alignItems:"center"}} >
              <View style={{flexDirection:"row", justifyContent:"space-around", width:"50%", alignItems:"center", marginVertical:"3%"}} >
                <TouchableOpacity onPress={()=>{
                  setLD(longday+1)
                }} >
                  <AntDesign name="pluscircle" size={32} color={base_color} />
                </TouchableOpacity>
                <Text>LONGDAY</Text>
                <Text>{longday}</Text>
                <TouchableOpacity onPress={()=>{
                  if(longday>0){
                    setLD(longday-1)
                  }
                }} >
                  <AntDesign name="minuscircle" size={32} color={base_color} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:"row", justifyContent:"space-around", width:"50%", alignItems:"center", marginVertical:"3%"}} >
                <TouchableOpacity onPress={()=>{
                  setNT(night+1)
                }} >
                  <AntDesign name="pluscircle" size={32} color={base_color} />
                </TouchableOpacity>
                <Text>NIGHT</Text>
                <Text>{night}</Text>
                <TouchableOpacity onPress={()=>{
                  if(night>0){
                    setNT(night-1)
                  }
                }} >
                  <AntDesign name="minuscircle" size={32} color={base_color} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:"row", justifyContent:"space-around", width:"50%", alignItems:"center", marginVertical:"3%"}} >
                <TouchableOpacity onPress={()=>{
                  setEA(early+1)
                }} >
                  <AntDesign name="pluscircle" size={32} color={base_color} />
                </TouchableOpacity>
                <Text>EARLY</Text>
                <Text>{early}</Text>
                <TouchableOpacity onPress={()=>{
                  if(early>0){
                    setEA(early-1)
                  }
                }} >
                  <AntDesign name="minuscircle" size={32} color={base_color} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:"row", justifyContent:"space-around", width:"50%", alignItems:"center", marginVertical:"3%"}} >
                <TouchableOpacity onPress={()=>{
                  setLate(late+1)
                }} >
                  <AntDesign name="pluscircle" size={32} color={base_color} />
                </TouchableOpacity>
                <Text>LATE</Text>
                <Text>{late}</Text>
                <TouchableOpacity onPress={()=>{
                  if(late>0){
                    setLate(late-1)
                  }
                }} >
                  <AntDesign name="pluscircle" size={32} color={base_color} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex:0.15, width:"70%", flexDirection:"row", justifyContent:'space-around'}} > 
                <TouchableOpacity disabled={nextDis} style={{
                  width:'45%',
                  height:"80%",
                  justifyContent:"center",
                  alignItems:"center",
                  backgroundColor:nextDis?'grey':base_color,
                  borderRadius:100,
                  elevation:5
                }} onPress={()=>{
                  if(selectedDate.date.date() === moment().daysInMonth()){
                    setND(true);
                    if(longday+night+late+early>0){
                      setSD(prev=>([
                        {longday:longday, night:night, late:late, early:early, year:`${selectedDate.date.year()}`,day:`${selectedDate.date.date()}`,month:selectedDate.date.month()+1, state:0},
                        ...prev
                      ]))
                    }
                  }
                  else{
                    var temp = [...shiftData];
                    temp.unshift({longday:longday, night:night, late:late, early:early, year:`${selectedDate.date.year()}`,day:`${selectedDate.date.date()}`, month:selectedDate.date.month()+1, state:0});
                    setSD(temp);
                    setSDate({date:selectedDate.date.add(1, 'days'), ...selectedDate})
                    setLD(0);setNT(0);setEA(0);setLate(0);
                  }
                }} >
                  <Text style={{
                    color:"white",
                    fontWeight:"bold"
                  }} >Next day</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  width:'45%',
                  height:"80%",
                  justifyContent:"center",
                  alignItems:"center",
                  backgroundColor:base_color,
                  borderRadius:100,
                  elevation:5
                }} onPress={()=>{
                  handleSubmit()
                }} >
                  <Text style={{
                    color:"white",
                    fontWeight:"bold"
                  }} >Submit</Text>
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
                      if(d.flag > 0){
                        dispatch({type:"SET_SHIFT_FOR_ASSIGN", payload:d.shiftData})
                        dispatch({type:"HIDE_MAIN_HEADER", payload:false})
                        navigation.navigate('Assign');
                      }
                      else{
                        var d_ = new Date(`${curDate.year()}/${curDate.month()+1}/${d.day}`);
                        setSDate({date:moment(d_), flag:d.flag});
                        setHO(true);
                      }
                      
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