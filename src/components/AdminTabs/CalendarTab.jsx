import React from 'react'
import { StyleSheet, View } from 'react-native'
import Calendar from '../Calendar/Calendar'
function CalendarTab() {
  return (
    <View style={{
        ...StyleSheet.absoluteFill,
    }} >
        <Calendar />
    </View>
  )
}

export default CalendarTab