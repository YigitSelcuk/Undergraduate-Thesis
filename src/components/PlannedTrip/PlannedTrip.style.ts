import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    margin:10
  },
  title: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: colors.black,
  },
  itineraryItem:{
    borderWidth:1,
    marginTop:15,
    padding:12,
    borderRadius:20,
    backgroundColor:'#eee'

  },
  dayHeader:{
    color:colors.black,
    fontSize:20,
    fontFamily:'Outfit-Bold',
    marginTop:20,
    
  },
  body:{
   marginTop:10,
  },
  image:{
    width:'99%',
    height:180,
    borderRadius:20,
  },
  imageConta:{
    alignItems:'center'
  },
  activity:{
    fontSize:16,
    textAlign:'left',
    color:colors.black,
    fontFamily:'Outfit-Bold'
  },
  details:{
    fontSize:14,
    fontFamily:'Outfit-Regular',
  },
  location:{
    color:colors.black,
    fontFamily:'Outfit-Regular',
    fontSize:15,
  },
  time:{
    color:colors.black,
    fontFamily:'Outfit-Regular',
    fontSize:15,
  }
});
