import { Text,TouchableOpacity,View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react';
import {styles} from '../../Styles'
import {rootAddress} from '../../constants'
import { ScrollView } from 'react-native-gesture-handler';

export default function Landing(){
    return( <View style={styles.boxLoginPage}>
    <Text >
        Hello Here We Are
    </Text>
    </View>
    )
}