import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { base_color } from '../redux/constants'

const items = [
    {
        id:0,
        name:"Documents"
    },
    {
        id:1,
        name:"Availability"
    },
    {
        id:2,
        name:"Calendar"
    },
    {
        id:3,
        name:"Timesheet"
    },
]


function Home({navigation}) {
  return (
    <View style={{
        flex: 1,
        backgroundColor:"#ffffff"
    }} >
        <View style={{
            flex:0.4,
            justifyContent:"center",
            alignItems:"center",
            
        }} >
            <View style={{
                display:"flex",
                width:"100%",
                height:"30%",
                justifyContent:"center",
                paddingLeft:"10%"
            }} >
                <Text style={{fontSize:20, fontWeight:"bold", color:"grey"}} >Hello, Anandhu Satheesh</Text>
            </View>
            <View style={{
                display:"flex",
                width:"90%",
                height:"60%",
                borderRadius:100,
                elevation:3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                backgroundColor:base_color,
                justifyContent:"center",
                alignItems:"center"
            }} >
                <Text style={{fontSize:25,color:"white", elevation:3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2, }} >TODAY</Text>
                <Text style={{fontSize:25,color:"white",
                    elevation:3,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                }} >LONGDAY</Text>
                <Text style={{fontSize:19, color:"white", 
                    elevation:3,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                }} >ASHLEY GRANGE</Text>
                
            </View>
        </View>
        <View style={{
            flex:0.7,
            justifyContent:"center",
            alignItems:"center",
        }} >
            <View style={{
                flex:0.9,
                width:"100%",
                justifyContent:"space-around",
                flexDirection:'row',
                flexWrap:"wrap",

            }} >
            {
                items.map(item=>(
                    <TouchableOpacity 
                    
                        onPress={()=>{
                            navigation.navigate("docs")
                        }}
                    style={{
                        width:Dimensions.get("screen").width/2.5,
                        height:Dimensions.get("screen").width/2.9,
                        backgroundColor:"#e3eac8",
                        elevation:3,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        borderRadius:30,
                        marginTop:15,
                        justifyContent:"center",
                        alignItems:"center"
                    }} >
                        <Text style={{
                            color:"grey",
                            fontSize:16,
                            elevation:3,
                            fontWeight:"600",
                        }} >{item.name}</Text>
                    </TouchableOpacity>
                ))
            }
            </View>
        </View>
    </View>
  )
}

export default Home