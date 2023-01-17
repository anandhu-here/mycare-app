import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { base_color } from '../redux/constants';
import * as DocumentPicker from 'expo-document-picker';



const docs = {0:"BRP", 1:"PASSPORT", 2:"TRAININGS", 3:"DBS", 4:"National Insurance"}


function Docs() {
    const handleSelect = () =>{
        DocumentPicker.getDocumentAsync().then(res=>{
            console.log(res)
        }).catch(e=>{
            console.log(e)
        })
    }
  return (
    <View style={{
        ...StyleSheet.absoluteFill,
        backgroundColor:"white",
        justifyContent:"center"
    }} >
        <View style={{
            flex:0.7,
            width:"100%",
            flexWrap:'wrap',
            justifyContent:"space-evenly",
            alignItems:"center",
            alignContent:"center"
        }} >
            {
            Object.keys(docs).map(key=>{
                let f=0;
                
                return(
                    <TouchableOpacity onPress={()=>handleSelect()} style={styles.item} >  
                        <Text style={{color:"white"}} >{docs[key]}</Text>
                    </TouchableOpacity>
                )
            })
            }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    item:{
        paddingHorizontal:"25%",
        justifyContent:"center",
        backgroundColor:base_color,
        paddingVertical:"5%",
        borderRadius:100,
    },
    
})

export default Docs