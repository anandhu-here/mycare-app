
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@userInfo', jsonValue)
    } catch (e) {
      // saving error
    }
  }


export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@userInfo')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }

  export const removeData = async() =>{
    AsyncStorage.removeItem('@userInfo').then(()=>{
        return true;
    }).catch(e=>{
        return false;
    })
  }