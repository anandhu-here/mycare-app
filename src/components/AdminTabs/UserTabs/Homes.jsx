import React from 'react'
import { KeyboardAvoidingView, View, TextInput } from 'react-native'

function Homes() {
  return (
    <View style={{
        flex: 1,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center"
    }} >
        <KeyboardAvoidingView
        behavior="padding"
        contentContainerStyle={{
            alignItems:"center",
            justifyContent:"center"
        }}
      style={{
        flex:0.1,
        width:"100%",
        alignItems:"center"
      }} >
        <TextInput
            placeholder='Search'
            
            style={{
                width:"90%",
                height:50,
                backgroundColor:"white",
                elevation:6,
                borderRadius:100,
                paddingLeft:10
            }}
        />
      </KeyboardAvoidingView>
      <View style={{
        flex:0.8
      }} ></View>
    </View>
  )
}

export default Homes