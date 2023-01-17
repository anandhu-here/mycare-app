import React from 'react'
import { useState } from 'react';
import { Dimensions, StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native'
const { width, height } = Dimensions.get('window');
function Form({login}) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
  return (
    <View>
        <TextInput value={email} onChangeText={t=>setEmail(t)} style={styles.inputText} placeholderTextColor="gray" placeholder="Username" />
        <TextInput value={pass} onChangeText={t=>setPass(t)} style={styles.inputText} placeholderTextColor="gray" placeholder="Password" />
        <TouchableOpacity onPress={()=>login(email, pass)} style={{ ...styles.button, backgroundColor: '#4e8896', shadowOffset: { width: 2, height: 2 }, shadowColor: '#000', shadowOpacity: .2, elevation: 3 }}>
            <Text style={{ fontWeight: 'bold', color: '#FFF' }}>
                LOGIN
            </Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#b7d1d2',
        justifyContent: "flex-end"
    },
    image: {
        flex: 1,
        bottom: 50,
        height: null,
        width: null,
        borderRadius: 100,
    },
    buttonContainer: {
        justifyContent: "center",
        height: height / 3,
        zIndex: 0
    },
    button: {
        backgroundColor: '#FFF',
        marginVertical: 5,
        marginHorizontal: 30,
        height: height / 14,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25
    },
    buttonText: {
        fontSize: width / 23,
        fontWeight: "bold"
    },
    textStyle: {
        color: '#FFF',
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold'
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: width,
        position: "absolute",
        top: 80
    },
    loginContainer: {
        height: height / 3,
        // backgroundColor: '#FFF',
        top: null,
        justifyContent: "center",
    },
    inputText: {
        height: 50,
        borderRadius: 30,
        borderColor: '#2f818c',
        borderWidth: .5,
        marginHorizontal: 30,
        marginVertical: 5,
        paddingLeft: 10,
        zIndex: 1
    },
    downArrow: {
        height: 30,
        width: 30,
    }
    , downArrowContainer: {
        backgroundColor: '#FFF',
        borderRadius: 50,
        position: "absolute",
        top: -15,
        left: width / 2 - 20,
        padding: 3,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#000',
        shadowOpacity: .2,
        elevation: 3,
        justifyContent: "center",
        alignItems: "center"
    }


})
export default Form