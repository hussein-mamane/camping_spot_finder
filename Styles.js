import {StyleSheet} from 'react-native'
export const styles = StyleSheet.create(
    {
        
        boxLoginPage: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'flex-start',
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor:'#fff'
            //top: 10,    // accumulable avec Keyboard Offset
            //bottom: 10           
        },
        textForSignupLogin:{
            fontFamily: 'sans-serif',
            fontWeight:'bold',
            fontSize:  18,
            color:'black',
            marginRight : "auto",
            marginLeft : "5%",
            marginBottom : "2%"
        },
        textForWelcome:{
            fontFamily: 'sans-serif',
            fontWeight:'bold',
            fontSize:  30,
            color:'#fea837',
            marginBottom : "05%"
        },
        linkButton:{
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            fontSize: 18,
            color: '#fea837',
            marginTop: '4%'
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
        outlinedTextInputContainer: {
            position: 'relative',
            width: '90%',
            borderWidth: 2,
            borderColor: '#fea837',
            borderRadius: 6,
            overflow: 'hidden',
            marginBottom: "3%"
          },
        outlinedTextInput: {
            height: 40,
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
        },
        button: {
            backgroundColor: '#fea837',
            borderRadius: 6,
            width: 130, 
            height: 50, 
            paddingVertical: 14,
            paddingHorizontal: 20,
            alignItems: 'center',
          },
        buttonText: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18,
          },
        imageContainer: {
            width: '60%', //reduction de la taille de l'image
            aspectRatio: 1, // Maintain aspect ratio (1:1 for square image)
            overflow: 'hidden',
          },
        image: {
            flex: 1,
            width: undefined,
            height: undefined,
            backgroundColor: 'transparent', // Set transparent background
          },
          text: {
            // styles de text communs
          }
        
    }
)

//export default styles