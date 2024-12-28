import {StyleSheet} from 'react-native';
import colors from '../../../../assets/Colors';

export default StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: -200,
    backgroundColor: colors.white,
    height: '100%',
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 35,
    marginTop: 20,
    color: colors.black,
  },
  contextContainer: {
    marginTop:20,
  },
  contex: {
    fontFamily:'Outfit-Bold',
    fontSize:18,
    color:colors.black,

  },
  icon:{
    fontSize:30,
  },
  descContainer:{
    marginTop:30,
    display:'flex',
    flexDirection:'row',
    gap:20,
  },
  desc:{
    fontFamily:'Outfit-Bold',
    fontSize:16,
    color:colors.gray,

  },
  location:{
    fontFamily:'Outfit-Medium',
    fontSize:16,
    color:colors.black,
  },
  continueButton: {
    padding:10,
    backgroundColor:colors.black,
    borderRadius:15,
    marginTop:60
  },
  continueText: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: 'Outfit-Medium',
    fontSize: 20,
  },

});
