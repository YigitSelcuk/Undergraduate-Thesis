import {StyleSheet} from 'react-native';
import colors from '../../../../assets/Colors';

export default StyleSheet.create({
  container: {
    padding: 25,
    paddingTop:-10,
    backgroundColor:colors.white,
    height:'100%',

},
  title: {
    fontFamily:'Outfit-Bold',
    fontSize:35,
    marginTop:20,
    color:colors.black
  },
  calendarConainer:{
    marginTop:30
  },
  calendar:{
backgroundColor:'#7a3333e'
  },
  continueButton: {
    padding:10,
    backgroundColor:colors.black,
    borderRadius:15,
    marginTop:20
  },
  continueText: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: 'Outfit-Medium',
    fontSize: 20,
  },
  travelerInfo:{
    fontSize:15,
    color:colors.black,
    padding: 5,
  },
});
