import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../../../assets/Colors';

export default StyleSheet.create({
  image: {
    width: '100%',
    height: Dimensions.get('window').height/1.8,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Outfit-Bold',
    color: colors.black,
    textAlign: 'center',
    marginTop:10,
  },
  container: {
    backgroundColor: colors.white,
    marginTop: -20,
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 15,
  },
  content: {
    fontFamily: 'Outfit-Bold',
    fontSize: 17,
    textAlign: 'center',
    color: colors.gray,
    marginTop:20,
  },
  button: {
    padding: 15,
    backgroundColor: colors.black,
    borderRadius: 99,
    marginTop: '20%',
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: 'Outfit-Medium',
    fontSize: 17,
  },
});