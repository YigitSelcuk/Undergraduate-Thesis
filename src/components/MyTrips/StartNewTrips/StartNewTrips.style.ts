import {StyleSheet} from 'react-native';
import colors from '../../../../assets/Colors';

export default StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
    display: 'flex',
    alignItems: 'center',
    gap: 30,
  },
  context: {
    fontFamily: 'Outfit-Medium',
    fontSize: 20,
    color: colors.black,
  },
  context2: {
    fontSize: 17,
    fontFamily: 'Outfit-Regular',
    textAlign: 'center',
    color: colors.gray,
  },
  button: {
    padding: 10,
    backgroundColor: colors.black,
    borderRadius: 15,
    paddingHorizontal: 30,
  },
  buttonText:{
   color:colors.white,
   fontFamily:'Outfit-Medium',
   fontSize:16
  },
});
