import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: 'rgba(128, 255, 213, 0.2)',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#848484',
    margin:10
  },
  price: {
    color: colors.black,
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
  },
  flight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookhere: {
    backgroundColor: colors.black,
    padding: 5,
    width: 100,
    borderRadius: 10,
  },
  infoText: {
    color: colors.black,
    fontFamily: 'Outfit-Regular',
    fontSize: 17,
  },
  bookText: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
  },
});
