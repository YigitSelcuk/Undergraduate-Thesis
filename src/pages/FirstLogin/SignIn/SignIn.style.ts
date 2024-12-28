import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../../assets/Colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 30,
    height: '100%',
    backgroundColor: colors.white,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 30,
    color: colors.black,
    marginTop: 20,
  },
  title2: {
    fontFamily: 'Outfit-Medium',
    fontSize: 30,
    color: colors.gray,
    marginTop: 10,
  },
  title3: {
    fontFamily: 'Outfit-Medium',
    fontSize: 30,
    color: colors.gray,
    marginTop: 5,
  },
  emailText: {
    fontFamily: 'Outfit-Regular',
    color: colors.black,
    marginBottom: 8,
  },
  emailInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.gray,
    fontFamily: 'Outfit-Regular',
    backgroundColor: colors.white,
  },
  inputPSWDContainer: {
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 40,
  },
  signIn: {
    padding: 20,
    backgroundColor: colors.black,
    borderRadius: 15,
    marginTop: 30,
    shadowColor: '#bebebe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
  },
  signInText: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
  },
  createAccount: {
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: colors.gray,
  },
  createAccountText: {
    color: colors.black,
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
  },
  socialLoginContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  orText: {
    fontFamily: 'Outfit-Medium',
    color: colors.gray,
    marginBottom: 15,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  socialIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  socialIconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});