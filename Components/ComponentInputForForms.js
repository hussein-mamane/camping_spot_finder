import React, { useState }  from "react";
import {View,TextInput} from 'react-native'
import {styles} from '../Styles'


const ComponentInputForForms =({ label, onChangeTextCallback })=>
{

  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.outlinedTextInputContainer}>
       {isFocused && (
        <View style={styles.innerBorder}></View>
       )}
      <TextInput
        style={[
          styles.outlinedTextInput,
          isFocused && styles.outlinedTextInputFocused,
        ]}
        placeholder={`Type your ${label} here...`}
        onChangeText={(inputText) => {
                       setText(inputText);//  local state
                       onChangeTextCallback && onChangeTextCallback(inputText); // si callback,Notifier le parent pour faire le callback
                    }}
        value={text}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required
      />
    </View>
  );
  
}
export  {ComponentInputForForms}