import {StyleSheet} from 'react-native';
import colors from '../../../../assets/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: colors.white, 
  },
  titleCont: {
    flexDirection: 'row',         
    justifyContent: 'space-between', 
    alignItems: 'center',          
    paddingHorizontal: 16,         
    paddingVertical: 10,           
  },
 
  containerTitle: {
    fontSize: 25,
    fontFamily: 'Outfit-Bold',
    color: colors.black,
    textAlign: 'left',
    marginBottom: 20,
  },
  exit:{
    marginBottom: 20,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(119, 239, 173, 0.4)',
    borderRadius: 15,
    padding: 10,
  },

  titleImgContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  titleImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 200,
  },

  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  emailText: {
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
    color: colors.black,
    borderRadius: 20,
    textAlign: 'center',
    justifyContent: 'center',
    padding: 5,
  },

  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5F7EF',
    borderRadius: 20,
  },
  body: {
    flexGrow: 1, // Allow the body to grow with the content
    flexShrink: 1, // Ensure it shrinks if necessary
    justifyContent: 'flex-start', // Ensure items are at the top
    paddingBottom: 16, // Adds some space at the bottom of the last button
    backgroundColor: '#ffffff', // Background color for the body
    borderRadius: 10,
    marginTop:30
  },
});
