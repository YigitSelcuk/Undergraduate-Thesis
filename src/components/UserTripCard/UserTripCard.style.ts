import {Dimensions, StyleSheet} from 'react-native';

const CARD_WIDTH = Dimensions.get('window').width * 0.7;
const SPACING = 16;

export default StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 10,
  },
  scrollContent: {
    paddingHorizontal: SPACING,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: SPACING,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height:'98%'
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  dayTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  activity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});
