import {StyleSheet} from 'react-native';
import colors from '../../../../assets/Colors';

export default StyleSheet.create({
  container: {
    paddingTop: -10,
    padding: 25,
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
    marginTop: 20,
  },
  context: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: colors.black,
  },
  card: {
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
