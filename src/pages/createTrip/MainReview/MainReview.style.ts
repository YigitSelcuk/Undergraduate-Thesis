import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../../../assets/Colors';
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const HEADER_HEIGHT = 330;
const MINIMUM_HEADER_HEIGHT = 100;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,

  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  buttonContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
},
button2Container: {
  position: 'absolute',
  top: 20,
  right: 20,
  zIndex: 1,
  width: 40,
  height: 40,
  borderRadius: 20,
  overflow: 'hidden',
},
blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
},
iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
},

  icon2: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 15,
    paddingTop: 20,
    marginTop: -30,
    minHeight: 30,

  },
  name: {
    color: colors.black,
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    marginBottom: 10,
    backgroundColor: 'rgba(107, 107, 107, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'flex-start', 
  },
  
  startDate: {
    fontFamily: 'Outfit-Regular',
    color: colors.gray,
    fontSize: 17,
    alignSelf: 'flex-start', 


  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 10,
    backgroundColor: 'rgba(107, 107, 107, 0.2)',
    borderRadius:20,
    padding:10,
    alignSelf: 'flex-start', 
  },
  gap: {
    fontSize: 17,
    color: colors.gray,
    
  },
  traveler: {
    marginBottom: 20,
    fontFamily: 'Outfit-Regular',
    color: colors.gray,
    backgroundColor: 'rgba(107, 107, 107, 0.2)',
    borderRadius:20,
    padding:10,
    alignSelf: 'flex-start', 
  },
  flatlist: {},
});
