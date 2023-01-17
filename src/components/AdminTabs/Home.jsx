import React from 'react'
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Linking, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { base_color } from '../../redux/constants';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, setDoc , doc} from 'firebase/firestore';
import { auth, db } from '../../../firebase';

const {height} = Dimensions.get('window');

function Home() {
    const [open, setOpen] = useState(false);
    const [ ready, setReady ] = useState(false);
    const [ btnLoading, setBL ] = useState(false);
    const [pass, setPass] = useState(null);
    const [ email, setEmail ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ role, setRole ] = useState('CARER');
    const createPassword = async() =>{
        try{
            var pass = Math.random().toString(36).slice(-10);
            setPass(pass);
            return true
        } 
        catch(e){
            return null
        }
    }
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    const createUser = () =>{
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, pass).then(res=>{
            setDoc(doc(db, 'users', res.user.uid), {
                role:role
            }).then(res=>{
                setReady(true);
                setLoading(false);
            }).catch(()=>{
                setReady(false);
                setLoading(false);
                console.log(e, "eror")
            })
            
        }).catch(e=>{
            setReady(false);
            setLoading(false);
            console.log(e, "eror")
        })
    }
  return (
    <View style={styles.container} >
        <View style={styles.today} >
            <View style={styles.todayHeadContainer} >
                <Text style={styles.todayHeadText} >TODAY</Text>
            </View>
            <View style={styles.todayDetail} >
                <View style={styles.todayDetailViews} > 
                    <Text style={styles.todayDetailTexts} >LONGDAYS : 0/10</Text>
                </View>
                <View style={styles.todayDetailViews} > 
                    <Text style={styles.todayDetailTexts} >NIGHTS : 0/10</Text>
                </View>
                <View style={styles.todayDetailViews} > 
                    <Text style={styles.todayDetailTexts} >LATES : 0/10</Text>
                </View>
                <View style={styles.todayDetailViews} > 
                    <Text style={styles.todayDetailTexts} >EARLYS : 0/10</Text>
                </View>
            </View>
        </View>
        <View style={styles.util} >
            <TouchableOpacity onPress={()=>setOpen(true)} style={styles.btn} >
                <Text style={styles.btnText} >Create a user</Text>
            </TouchableOpacity>
        </View>
        <Modal visible={open} transparent={true} >
            
            <ScrollView style={{
                flex: 1
            }} contentContainerStyle={{
                flex:1,
                backgroundColor:"rgba(0,0,0,0.7)",
                justifyContent:"center",
                alignItems:"center"
            }} >
                
            {
                ready?(
                    <View style={{
                        flex:0.6,
                        width: '90%',
                        backgroundColor:"white",
                        borderRadius:70,
                        justifyContent:"center",
                        alignItems:"center"
                    }} >
                        <TouchableOpacity onPress={()=>{
                            setEmail('');
                            setPass(null);
                            setOpen(false);
                            setReady(false);
                        }} style={{
                            position:"absolute",
                            zIndex:1000,
                            top:'-1%',
                            left:"-1%",
                            elevation:16
                            }}>
                            <AntDesign  name="closecircle" size={40} color={base_color} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            const pass_ = pass;
                            setPass(null);
                            Linking.openURL(`mailto:${email}?subject=Register&body=Greetings,\n Hope you are doing well. Your account with MyCare has been successfully created.\n Please find the username and password below and start updating your details in our app.\n\n Username: ${email}\nPassword: ${pass_}`)
                        }} style={styles.btn} >
                            <Text style={{color:base_color, fontSize:17,}} >Send Email with the credentials</Text>
                        </TouchableOpacity>
                    </View>
                ):(
                    <KeyboardAvoidingView
                        behavior="padding"
                    style={{
                        height:height/1.6,
                        width: '90%',
                        backgroundColor:"white",
                        borderRadius:70,
                        justifyContent:"center",
                        alignItems:"center"
                    }} contentContainerStyle={{  alignItems:"center", justifyContent:"center"}} >
                        <TouchableOpacity onPress={()=>{
                            setEmail('');
                            setPass(null);
                            setOpen(false);
                            setReady(false);
                        }} style={{
                            position:"absolute",
                            zIndex:1000,
                            top:'-1%',
                            left:"-1%",
                            elevation:16
                            }}>
                            <AntDesign  name="closecircle" size={40} color={base_color} />
                        </TouchableOpacity>
                            <View  style={{
                                justifyContent:"center",
                                alignItems:"center",
                                width:"95%",
                                height:"70%",
                            }}  >
                                <Text style={{
                                    fontWeight:"600",
                                    fontSize:17,
                                    width:"70%",
                                    textAlign:"center",
                                    color:"grey"
                                }} >Type or Copy the email address and generate a password</Text>
                                <TextInput
                                    placeholder='email'
                                    keyboardType='email-address'
                                    style={{
                                        width:"95%",
                                        height:50,
                                        textAlign:"center",
                                        borderRadius:80,
                                        borderColor:base_color,
                                        borderWidth:0.5,
                                        marginVertical:15,
                                        elevation:8,
                                        backgroundColor:"white",
                                    
                                    }}
        
                                    value={email}
                                    onChangeText={text=>setEmail(text)}
                                />
                                <View style={{
                                    height:50,
                                    width:"90%",
                                    flexDirection:"row",
                                    justifyContent:"space-around",
                                    alignItems:"center"
                                }} >
                                    <TouchableOpacity style={{
                                        width:"35%",
                                        height:50,
                                        alignItems:"center",
                                        justifyContent:"space-evenly",
                                        borderRadius:20,
                                        backgroundColor:role==="CARER"?base_color:"white",
                                        elevation:7,
                                        flexDirection:"row"
                                    }} onPress={()=>{
                                        setRole("CARER");
                                    }} >
                                        <Text style={{
                                            color:role==="CARER"?"white":base_color,
                                        }} >CARER</Text>
                                        {role==="CARER"&&<AntDesign name="checkcircle" size={18} color="black" />}
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width:"35%",
                                        height:50,
                                        alignItems:"center",
                                        justifyContent:'space-evenly',
                                        borderRadius:20,
                                        backgroundColor:role==="HOME"?base_color:"white",
                                        elevation:7,
                                        flexDirection:"row"
                                    }} onPress={()=>{
                                        setRole("HOME");
                                    }} >
                                        <Text style={{
                                            color: role==="HOME"?"white":base_color
                                        }} >HOME</Text>
                                        {role==="HOME"&&<AntDesign name="checkcircle" size={18} color="black" />}
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={()=>{
                                    setBL(true);
                                    if(validateEmail(email)!==null){
                                        createPassword().then(()=>{
                                            setBL(false)
                                        }).catch(()=>{
                                            setBL(false)
                                        })
                                    }
                                    else{
                                        alert("Enter a valid email first")
                                    }
                                }} style={{...styles.btn, backgroundColor:pass!==null?"green":"white"}}>
                                    {
                                        !btnLoading?(
                                            <Text style={{color:pass!==null?"white":base_color, fontSize:17, }} >Generate a password</Text>
                                        ):(
                                            <ActivityIndicator size={25} color={base_color} />
                                        )
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                justifyContent:"center",
                                alignItems:"center",
                                width:"95%",
                                height:"30%",
                            }}  >
                                <TouchableOpacity style={styles.btn} onPress={()=>{
        
                                     if(pass.length>0){
                                        createUser();
                                     }   
                                    
                                }} >
                                    <Text style={{color:base_color, fontSize:17, }} >CREATE USER</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                )
            }
            </ScrollView>
            
        </Modal>
    </View>
  )
}

export default Home;


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center"
    },
    today:{
        flex:0.5,
        backgroundColor:base_color,
        width:"90%",
        borderRadius:70,
        elevation:8,
        justifyContent:"center",
        alignItems:"center"
    },
    util:{
        flex:0.47,
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
    },
    todayHeadContainer:{
        flex:0.1,
        justifyContent:"center",
        alignItems:"center"
    },
    todayHeadText:{
        fontSize:25,
        fontWeight:"bold",
        color:"white"
    },
    todayDetail:{
        flex:0.8,
        justifyContent:"center",
    },
    todayDetailViews:{
        paddingVertical:'3%'
    },
    todayDetailTexts:{
        fontSize:19,
        fontWeight:"bold",
        color:"white"
    },
    btn:{
        width:"70%",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:70,
        paddingVertical:"5%",
        backgroundColor:"white",
        elevation:8,
        marginVertical:"3%"
    },
    btnText:{
        fontWeight:"bold",
        color:"grey",
        fontSize:17
    }
})