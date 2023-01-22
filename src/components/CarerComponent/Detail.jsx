import { View, Text } from 'react-native'
import React from 'react'

const Detail = ({navigation, route}) => {
    const {company, adress1, postcode} = route.params.shift.shift.home
  return (
    <View style={{
        flex:1,
        backgroundColor:"white"
    }} >
      
    </View>
  )
}

export default Detail