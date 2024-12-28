import {StyleSheet} from 'react-native';
import colors from '../../../assets/Colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#b6b6b6ee',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#eeeeeeee',
    flex: 5,
    maxHeight: 150,
  },
  imgbody: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtbody: {
    flex: 3.5,
  },
  icon: {
    flex: 1,
    alignItems: 'flex-end',
  },
  image: {
    width: 90, 
    height: 90, 
    resizeMode: 'cover', 
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
  },
  location: {
    color: colors.black,
    fontFamily: 'Outfit-Medium',
    fontSize: 13,
  },
  startDate: {
    fontFamily: 'Outfit-Regular',
    color: colors.gray,
    fontSize: 12,
  },
  traveler: {
    fontFamily: 'Outfit-Regular',
    color: colors.gray,
    fontSize: 12,
  },
});
