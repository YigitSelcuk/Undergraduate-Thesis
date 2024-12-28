import { StyleSheet } from "react-native";
import colors from "../../../../assets/Colors";

export default StyleSheet.create({
    container:{
        padding:25,
        paddingTop:20,
    },
    title:{
       fontFamily:'Outfit-Bold',
       fontSize:35,
       color:colors.black,
       textAlign:'center',
       marginTop:10

    },
    emailText: {
        fontFamily: 'Outfit-Regular',
        color: colors.black,
      },
      emailInput: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: colors.gray,
        fontFamily: 'Outfit-Regular',
      },
      inputPSWDContainer: {
        marginTop: 20,
      },
      inputContainer: {
        marginTop: 20,
      },
      signIn: {
        fontFamily: 'Outfit-Bold',
        padding: 20,
        backgroundColor: colors.black,
        borderRadius: 15,
        marginTop: 50,
      },
      signInText: {
        color: colors.white,
        textAlign: 'center',
        fontFamily: 'Outfit-Bold',
      },
      createAccount: {
        padding: 20,
        backgroundColor: colors.white,
        borderRadius: 15,
        marginTop: 20,
        borderWidth: 1.5,
      },
      createAccountText: {
        color: colors.black,
        textAlign: 'center',
        fontFamily: 'Outfit-Bold',
      },

})