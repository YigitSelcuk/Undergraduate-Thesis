import {StyleSheet} from 'react-native';
import colors from '../../../../assets/Colors';

export default StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop:20,
    backgroundColor: colors.white,
    height: '100%',
  },
  body: {
    marginTop: 20,
    gap: 10,
  },
  image: {
    width: '100%',
    height: 240,
    objectFit: 'cover',
    borderRadius: 15,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    gap: 20,
  },
  location: {
    color: colors.black,
    fontFamily: 'Outfit-Medium',
    fontSize: 18,
  },
  startDate: {
    fontFamily: 'Outfit-Regular',
    color: colors.gray,
    fontSize: 15,
  },
  traveler: {
    fontFamily: 'Outfit-Regular',
    color: colors.gray,
    fontSize: 15,
  },
  button: {
    backgroundColor: colors.black,
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  txtbtn: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: 'Outfit-Medium',
    fontSize: 15,
  },
  titleCont: {
    position: 'absolute',
    top: 20, 
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  title: {
    color:colors.black,
    fontSize:25,
    fontFamily:'Outfit-Bold',
    alignItems:'center',
  },
  
});
