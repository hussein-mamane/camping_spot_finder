import React from "react";
import {View,Text} from 'react-native'
import {styles} from '../Styles'

const ComponentBoxCamping =({backgroundColor,number})=>
{
    return(
        <View style={[styles.boxForCampingView,{backgroundColor}]}>
            <Text style={styles.text}>{number}</Text>
        </View>
    )
}
export  {ComponentBoxCamping}