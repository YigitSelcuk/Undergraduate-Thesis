import { StyleSheet } from "react-native";
import colors from "../../../assets/Colors";

export default StyleSheet.create({
    container: {
        marginTop:20,
        margin:10
    },
    title:{
        fontFamily:'Outfit-Bold',
        color:colors.black,
        fontSize:18
    },
    image:{
        width:180,
        height:120,
        borderRadius:15,
        marginTop:10
    },
    flatlist:{
        marginTop:10,
    },
    body:{
        marginRight:20,
        width:200,
        backgroundColor:'#eee',
        borderRadius:15,
        alignItems:'center',
        borderWidth:1,
        borderColor:'#848484'
        

    },
    name:{
        fontFamily:'Outfit-Bold',
        color:colors.black,
        fontSize:15,
        textAlign:'center',
    },
    rating:{
        fontFamily:'Outfit-Regular',
        color:colors.black
    },
    content: {
        padding:5

    },
    detailContent:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'

    },
    desc:{
        marginTop:10,
    },
    description:{
        textAlign:'justify',
        padding:5,
        fontFamily:'Outfit-Medium'
    }
})