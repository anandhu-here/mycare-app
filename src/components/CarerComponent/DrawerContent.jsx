import { View, StyleSheet } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AntDesign as Icon } from '@expo/vector-icons';
import { MaterialIcons as IconM } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import { removeData } from '../asyncStore';
import { LOGOUT } from '../../redux/types/auth';
import { useDispatch } from 'react-redux';


function DrawerContent(props) {
    const dispatch = useDispatch();
    const paperTheme = useTheme();


    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15, alignItems:"center"}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, }}>
                                <Title style={styles.title}>Netley Care</Title>
                                <View style={styles.section}>
                                    <Icon name="mail" size={15} color="black" />
                                    <Caption style={styles.caption}>netley@gmail.com</Caption>
                                </View>
                                <View style={styles.section}>
                                    <Icon name="phone" size={15} color="black" />
                                    <Caption style={styles.caption}>07435382817</Caption>
                                </View>
                            </View>
                        </View>

                        <View style={styles.row}>
                            
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon 
                                name="home" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon 
                                name="book" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Timesheets"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Ionicons 
                                name="receipt-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Invoice"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <IconM
                        name="logout" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {
                        removeData().then(()=>{
                            dispatch({type:LOGOUT})
                            
                        }).catch(e=>{
                            alert("Logout failed")
                        })
                    }}
                />
            </Drawer.Section>
        </View>
    );
}

export default DrawerContent;

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      paddingLeft:5,
      paddingVertical:2
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });