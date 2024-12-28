import { StyleSheet } from 'react-native';
import colors from '../../../assets/Colors';

export default StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
  },
  selectContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e1e1e1',
    borderRadius: 15,
    borderWidth: 2,
  },
  iconTitleContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  icon: {
    fontSize: 35,
    marginRight: 5,
    color: colors.black, 
  },
  textContainer: {
    flexDirection: 'column', 
  },
  title: {
    fontFamily: 'Outfit-Bold',
    color: colors.black,
    fontSize: 20,
  },
  desc: {
    fontFamily: 'Outfit-Regular',
    color: colors.gray,
    fontSize: 16,
  },
});