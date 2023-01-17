import React from 'react'
import { useSelector } from 'react-redux';
import Admin from './Admin';
import HomeNavigator from './HomeComponent/HomeNavigator';

function Index() {
    const authContext = useSelector(state=>state.userLogin);
    if(authContext.userInfo){
        const { userInfo } = authContext;
        const { role } = userInfo.user;
        if(role === "ADMIN"){
            return(
                <Admin />
            )
        }
        else if(role === "HOME"){
            return(
                <HomeNavigator />
            )
        }
        else{
            return(
                <Home />
            )
        }
    }
    else{
        return(
            <></>
        )
    }
}

export default Index