import { StyleSheet } from "react-native";
import colors from "../../../../assets/Colors";

export default StyleSheet.create({
    container:{
        padding:25,
        paddingTop:75,
        backgroundColor:colors.white,
        height:'100%',
    },
    txt1:{
        fontFamily:'Outfit-Bold',
        fontSize:35,
        color:colors.black,
        textAlign:'center',
    },
    txt2:{
        fontFamily:'Outfit-Medium',
        fontSize:17,
        textAlign:'center',
        color:colors.black,
        marginTop:40

    },
    txt3:{
        fontFamily:'Outfit-Medium',
        fontSize:17,
        textAlign:'center',
        color:colors.gray,
    }

})