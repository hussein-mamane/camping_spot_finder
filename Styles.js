import {StyleSheet} from 'react-native'
export const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            flexDirection:'column',
            justifyContent:'start',
            alignItems:'start'
        },
        boxForMap:{
            flex:2,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            marginTop: 28,
            marginLeft :20,
            marginRight :20

        },
        boxForCampingView:{
            flex:1,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            marginTop: 28,
            marginLeft :20,
            marginRight :20

        },
        textWhiteBold:{
            color:'white',
            fontWeight:'bold'
        },
        textBlackBold:{
            color:'#000',
            fontWeight:'bold'
        },
        outlinedTextInputContainer: {
            position: 'relative',
            width: '90%',
            borderWidth: 2,
            borderColor: '#fea837',
            borderRadius: 6,
            overflow: 'hidden',
          },
        outlinedTextInput: {
            height: 50,
            paddingHorizontal: 12,
            width: '100%',
        },
        outlinedTextInputFocused: {
            borderColor: '#fea837',
        },
        innerBorder: {
            position: 'absolute',
            top: 2, 
            bottom: 2, 
            left: 2, 
            right: 2, 
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 3
        }
    }
)

//export default styles