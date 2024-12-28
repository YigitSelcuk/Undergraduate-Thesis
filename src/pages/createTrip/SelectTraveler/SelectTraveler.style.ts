import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../../../assets/Colors';

export default StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: -80,
    backgroundColor: colors.white,
    height: '100%',
  },
  title: {
    fontFamily: 'Outfit-Bold',
    marginTop: 20,
    fontSize: 35,
    color: colors.black,
  },
  body: {
    marginTop: 5,
  },
  bodyTitle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    color: colors.black,
  },
  item: {
    marginVertical: 10,
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
});
