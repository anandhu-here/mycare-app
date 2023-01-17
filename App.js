import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, StatusBar as ST, SafeAreaView, ActivityIndicator} from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Admin from './src/components/Admin';
import { getData } from './src/components/asyncStore';
import Login from './src/components/Auth/Login';
import Signup from './src/components/Auth/Signup';
import Docs from './src/components/Docs';
import Header from './src/components/Header';
import Home from './src/components/Home';
import Index from './src/components/Index';
import store from './src/redux/store';
import { LOGIN_SUCCESS } from './src/redux/types/auth';

const Stack = createStackNavigator();

const ReduxApp = () =>{
  const [ auth, setAuth ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const authContext = useSelector(state=>state.userLogin);
  const dispatch = useDispatch();
  console.log(ST.currentHeight);
  var page;
  var screen;
  useEffect(()=>{
    setLoading(true);
    
    getData().then((value)=>{
      dispatch({type:LOGIN_SUCCESS, payload:value});
      if(value){
        setAuth(true);
        page=value.role
      }
      else{
        setAuth(false);
      }
      setLoading(false)
    }).catch(e=>{
      setAuth(false);
      console.log(e)
    })
  },[])
  
  useEffect(()=>{
    setLoading(true)
    const {userInfo} = authContext;
    console.log(userInfo, "userrrrr")
    if(userInfo){
      setAuth(true);
      console.log(userInfo, "[[[[[")
      page=userInfo.role
    }
    else{
      setAuth(false)
    }
    setLoading(false)
  }, [authContext]);

  console.log(page, "page")

  if(page==="ADMIN"){
    console.log(page, "pageyyyy")
    screen=(
      <Stack.Screen options={{
        header:(props)=>{
          return(
            <Header />
          )
        }
      }} component={Admin} name="home" />
    )
  }
  return(
    <View style={{
      ...StyleSheet.absoluteFill,
      marginTop:ST.currentHeight
    }} >
      {
        loading?(
          <ActivityIndicator size={40}  />
        ):(
          <NavigationContainer  >
          <Stack.Navigator >
            {
              auth?
              (
                <>
                  <Stack.Screen options={{
                    header:(props)=>{
                      return(
                        <Header />
                      )
                    }
                  }} component={Index} name="home" />
                <Stack.Screen
                  component={Docs}
                  name="docs"
                />
                </>
              ):(
                <>
                  <Stack.Screen options={{
                    headerShown:false
                  }} component={Login} name="login" />
                </>
              )
            }
          </Stack.Navigator>
        </NavigationContainer>
        )
      }
    </View>
  )
}



export default function App() {
  return (
    <Provider store={store} >
      <View style={{
        flex:1,
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center"
      }} >
        <ReduxApp />
      </View>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
