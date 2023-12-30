import React from "react";
import {View,Text} from 'react-native'
import {styles} from '../Styles'

const ComponentBoxMap =({backgroundColor,children})=>
{
    return(
        <View style={[styles.boxForMap,{backgroundColor}]}>
             {children}
        </View>
    )
}
export  {ComponentBoxMap}