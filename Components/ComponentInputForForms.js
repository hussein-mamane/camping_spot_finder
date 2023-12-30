import React, { useState }  from "react";
import {View,TextInput} from 'react-native'
import {styles} from '../Styles'

const ComponentInputForForms =()=>
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
        placeholder="Type here..."
        onChangeText={(inputText) => setText(inputText)}
        value={text}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
  
}
export  {ComponentInputForForms}