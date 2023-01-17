import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Animated, { EasingNode } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { auth, db } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { collection, getDoc, doc } from 'firebase/firestore';
import Form from './Form';
import { storeData } from '../asyncStore';
import { useDispatch } from 'react-redux';
import { LOGIN_FAIL, LOGIN_SUCCESS } from '../../redux/types/auth';
import { baseUrl } from '../../redux/constants';
import axios from 'axios';
const { width, height } = Dimensions.get('window');


const { Value,
    block,
    cond,
    set,
    Clock,
    stopClock,
    startClock,
    clockRunning,
    timing,
    debug,
    interpolateNode,
    Extrapolate
} = Animated;
const Login = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [buttonOpacity, setButtonOpacity] = useState(new Value(1));
    const dispatch = useDispatch();
    const onStateChange = e => {
        if (e.nativeEvent.state === State.END) {
            setButtonOpacity(setTiming(new Clock(), 1, 0));
        }
    };

    const onCloseState = e => {
        if (e.nativeEvent.state === State.END) {
            setButtonOpacity(setTiming(new Clock(), 0, 1));
        }
    };

    const transform = (f, t) => {
        console.log("anandhu")
        return interpolateNode(buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [f, t],
            extrapolate: Extrapolate.CLAMP
        })
    }

    const setTiming = (clock, value, distance) => {
        const state = {
            finished: new Value(0),
            position: new Value(0),
            time: new Value(0),
            frameTime: new Value(0),
        };

        const config = {
            duration: 500,
            toValue: new Value(0),
            easing: EasingNode.inOut(EasingNode.ease),
        };

        return block([
            cond(clockRunning(clock), 0, [
                set(state.finished, 0),
                set(state.time, 0),
                set(state.position, value),
                set(state.frameTime, 0),
                set(config.toValue, distance),
                startClock(clock),
            ]),

            timing(clock, state, config),
            cond(state.finished, debug('stop clock', stopClock(clock))),
            state.position,

        ]);
    }
    
    const login = (email, pass) =>{
        axios.post(`${baseUrl}/login`, {email, password:pass}, {headers:{
            'Content-Type':'application/json'
        }}).then(res=>{
            storeData(res.data).then(()=>{
                dispatch({type:LOGIN_SUCCESS, payload:res.data})
            }).catch(e=>{
                dispatch({type:LOGIN_FAIL})
            })
        }).catch(e=>{
            console.log(e, "error")
        })
    }
    return (
        <KeyboardAvoidingView behavior="height" style={styles.container}>

            <Animated.View style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: transform(-height / 3, 0) }], backgroundColor: '#b7d1d2', }}>
                <Animated.Image resizeMode="contain" style={{ ...styles.image, transform: [{ translateY: transform(height / 4.5, 0) }] }} source={require('../../../assets/wal.png')} />
            </Animated.View>
            {/* <Animated.View style={{ ...styles.textContainer, transform: [{ translateY: transform(-200, 0) }], opacity: buttonOpacity }}>
                <Text style={{ ...styles.textStyle, fontSize: width / 18, color: '#2e808b' }}>Stay Safe..</Text>

                <Text style={{ ...styles.textStyle, fontSize: width / 15 }}>You're doing great!</Text>
            </Animated.View> */}
            <View style={styles.buttonContainer}>
                <TapGestureHandler onHandlerStateChange={onStateChange}>
                    <Animated.View style={{ ...styles.button, opacity: buttonOpacity, transform: [{ translateY: transform(100, 1) }] }}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </Animated.View>        
                </TapGestureHandler>
                <Animated.View style={{
                    ...styles.loginContainer,
                    ...StyleSheet.absoluteFill,
                    zIndex: transform(1, -1),
                    opacity: transform(1, 0),
                    transform: [{ translateY: transform(0, 100) }]
                }}>
                    <TapGestureHandler onHandlerStateChange={onCloseState}>
                        <Animated.View style={{ ...styles.downArrowContainer, transform: [{ rotate: transform(0, 2) }] }}>
                            <Image style={styles.downArrow} source={require('../../../assets/close.png')} />
                        </Animated.View>
                    </TapGestureHandler>

                    <Form login={login} />

                </Animated.View>

            </View>
        </KeyboardAvoidingView>
    )
}

export default Login

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
