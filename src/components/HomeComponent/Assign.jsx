import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { baseUrl, base_color } from '../../redux/constants';

import { AntDesign } from '@expo/vector-icons';
function Assign({navigation}) {
    const dispatch = useDispatch();
    const calendar = useSelector(state=>state.calendar);
    const authContext = useSelector(state=>state.userLogin);
    const [ date, setDate ] = useState(moment(new Date()));
    const [ shift, setShift ] = useState(null);
    const [edit, setEdit] = useState(false);
    const [longday, setLD] = useState(0);
    const [night, setNT] = useState(0);
    const [late, setLate] = useState(0);
    const [early, setEA] = useState(0);
    const [prev, setPrev] = useState({longday, night, late, early});
    const [ass, setAss] = useState([]);
    const [open, setOpen] = useState(false);

    // useEffect(()=>{
    //     axios.get(`${baseUrl}/get/carers`, {headers:{
    //         "Authorization": authContext.userInfo.token 
    //     }}).then(res=>{
    //         console.log(res.data)
    //     }).catch(e=>{
    //         console.log(e, "ppp")
    //     })
    // }, [])
    const handleEditandCancel = (type) =>{
        if(type === "edit"){
            // axios.post()
            setEdit(true);
            
            // setEdit(true);


        }
        else if(type === "submit"){
            const {longday:ld, late:lt, early:ea, night:nt} = prev;
            if(longday === ld && night === nt && late === lt && ea === early){
                alert("You havn't made any changes yet!")
                setEdit(false)
            }
            else{
                axios.post(`${baseUrl}/shifts/update`, {id:shift.id, longday, night, early, late}, {headers:{
                    "Authorization": authContext.userInfo.token,
                    "Content-Type":"application/json"
                }}).then(res=>{
                    const {longday, night, late, early} = res.data;
                    setLD(longday);setNT(night);setLD(late);setEA(early);
                    setEdit(false);
                    alert("Succesfully edited");
                    navigation.navigate('calendar', {shift:res.data, flag:'edit'});
                }).catch(e=>{
                    alert("Edit unsuccesfull")
                })
            }
        }
        else{
            axios.post(`${baseUrl}/shifts/cancel`, {id:shift.id}, {headers:{
                "Authorization": authContext.userInfo.token,
                "Content-Type":"application/json"
            }}).then(res=>{
                console.log(res.data, "cancel")
                dispatch({type:"SHOW_MAIN_HEADER", payload:false});
                navigation.navigate('calendar', {shift:shift, flag:'cancel'});
            }).catch(e=>{
              console.log(e)
                alert("Couldn;t cancel")
            })
        }
    }
    useEffect(()=>{
        dispatch({type:"HIDE_MAIN_HEADER", payload:false});
        const {shiftsForAssign} = calendar;
        if(shiftsForAssign){
            const {ass} = shiftsForAssign;
            setAss(ass);
            setShift(shiftsForAssign);
            const { day, month, year, longday, night, late, early }= shiftsForAssign;
            setPrev({longday, night, late, early})
            setLD(longday);setNT(night);setLate(late);setEA(early);
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
        <Modal visible={open} transparent={true} >
          <View style={{
              ...StyleSheet.absoluteFill,
              backgroundColor:"rgba(0,0,0,0.7)",
              justifyContent:"center",
              alignItems:"center"
          }} >
            
            <View style={{
              flex:0.8,
              backgroundColor:"white",
              width:"90%",
              borderRadius:50,
            }} >
              <TouchableOpacity onPress={()=>{
                setOpen(false)
              }} style={{
                  position:"absolute",
                  zIndex:1000,
                  top:'-1%',
                  left:"-1%",
                  elevation:16
                  }}>
                  <AntDesign  name="closecircle" size={40} color={base_color} />
              </TouchableOpacity>
              <View style={{flex:0.2, justifyContent:"center", alignItems:"center"}} >
                <Text>Assigned Carers</Text>
              </View>
              
              <ScrollView style={{flex:0.8}} contentContainerStyle={{ flex:0.8, height:"100%", width:"100%", justifyContent:"center", alignItems:"center"}} >
                {
                  ass.map(({carer})=>(
                    <TouchableOpacity style={{
                      paddingHorizontal:"20%",
                      height:50,
                      borderRadius:10,
                      justifyContent:"center",
                      alignItems:"center",
                      marginVertical:7,
                      elevation:3,
                      backgroundColor:'white',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.5,
                      shadowRadius: 2,
                    }} >
                      <Text>{carer.firstName} {carer.lastName}</Text>
                    </TouchableOpacity>
                  ))
                }
              </ScrollView>
            </View>
          </View>
        </Modal>
        <View style={{flex:0.1, width:"100%", justifyContent:"center", alignItems:"center"}} >
            <Text style={{
                fontSize:20,
                fontWeight:"bold",
                color:"grey"
            }} >{date!==null&&date.format('LL')}</Text>
            
        </View>
        <View style={{flex:0.1, width:"100%", justifyContent:"center", alignItems:"center"}}>
            {
              ass.length>0?(
                <TouchableOpacity style={{flexDirection:'row', 
                  justifyContent:"space-around", 
                  alignItems:"center", 
                  width:"30%",
                  height:'80%',
                  borderRadius:100,
                  elevation:3,
                  backgroundColor:'white',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  }} onPress={()=>{
                    setOpen(true);
                  }} >
                  <Text>ASSIGNED</Text>
                  <AntDesign name='checkcircle' size={30} color={base_color} />
                </TouchableOpacity>
              ):(
                <Text>Not assigned</Text>
              )
            }
        </View>
        <View style={{flex:0.5, width:"80%", justifyContent:"center", alignItems:"center"}} >
            <View style={{flexDirection:"row", justifyContent:"space-around", width:"80%", alignItems:"center", marginVertical:"3%"}} >
            <TouchableOpacity disabled={!edit}   onPress={()=>{

                  setLD(longday+1)
                }} >
                  <AntDesign name="pluscircle" size={32} color={edit?base_color:"#f6f6f6"} />
                </TouchableOpacity>
                <Text>LONGDAY</Text>
                <Text>{longday}</Text>
                <TouchableOpacity disabled={!edit}  onPress={()=>{
                  if(longday>0){
                    setLD(longday-1)
                  }
                }} >
                  <AntDesign name="minuscircle" size={32} color={edit?base_color:"#f6f6f6"} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:"row", justifyContent:"space-around", width:"80%", alignItems:"center", marginVertical:"3%"}} >
                <TouchableOpacity disabled={!edit}   onPress={()=>{
                  setNT(night+1)
                }} >
                  <AntDesign name="pluscircle" size={32} color={edit?base_color:"#f6f6f6"} />
                </TouchableOpacity>
                <Text>NIGHT</Text>
                <Text>{night}</Text>
                <TouchableOpacity disabled={!edit}  onPress={()=>{
                  if(night>0){
                    setNT(night-1)
                  }
                }} >
                  <AntDesign name="minuscircle" size={32} color={edit?base_color:"#f6f6f6"} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:"row", justifyContent:"space-around", width:"80%", alignItems:"center", marginVertical:"3%"}} >
                <TouchableOpacity disabled={!edit}   onPress={()=>{
                  setEA(early+1)
                }} >
                  <AntDesign name="pluscircle" size={32} color={edit?base_color:"#f6f6f6"} />
                </TouchableOpacity>
                <Text>EARLY</Text>
                <Text>{early}</Text>
                <TouchableOpacity disabled={!edit}  onPress={()=>{
                  if(early>0){
                    setEA(early-1)
                  }
                }} >
                  <AntDesign name="minuscircle" size={32} color={edit?base_color:"#f6f6f6"} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:"row", justifyContent:"space-around", width:"80%", alignItems:"center", marginVertical:"3%"}} >
                <TouchableOpacity disabled={!edit}   onPress={()=>{
                  setLate(late+1)
                }} >
                  <AntDesign name="pluscircle" size={32} color={edit?base_color:"#f6f6f6"} />
                </TouchableOpacity>
                <Text>LATE</Text>
                <Text>{late}</Text>
                <TouchableOpacity disabled={!edit}  onPress={()=>{
                  if(late>0){
                    setLate(late-1)
                  }
                }} >
                  <AntDesign name="pluscircle" size={32} color={edit?base_color:"#f6f6f6"} />
                </TouchableOpacity>
            </View>
        </View>
        <View style={{flex:0.4, width:"100%", flexDirection:"row", justifyContent:"space-around", alignItems:"center"}} >
            <TouchableOpacity style={{
                width:"40%",
                backgroundColor:base_color,
                height:"30%",
                borderRadius:100,
                justifyContent:"center",
                alignItems:"center",
                elevation:3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            }} onPress={()=>handleEditandCancel(edit?"submit":"edit")} >
                <Text style={{
                    fontWeight:"500",
                    color:"white",
                    fontSize:15
                }} >{edit?"SUBMIT EDIT":"EDIT"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                width:"40%",
                backgroundColor:"brown",
                height:"30%",
                borderRadius:100,
                justifyContent:"center",
                alignItems:"center",
                elevation:3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            }} onPress={()=>{
                Alert.alert("", 'Are you sure you want to cancel the shift?',[
                    {
                        text:'Abort', onPress:()=>{}, style:'cancel'
                    },
                    {
                        text:"Yes", onPress:()=>handleEditandCancel('cancel'), style:"default"
                    }
                    
                ], {cancelable:true})
            }} >
                <Text style={{
                    fontWeight:"500",
                    color:"white",
                    fontSize:15
                }} >CANCEL</Text>
            </TouchableOpacity>
        </View>

    </View>
  )
}

export default Assign