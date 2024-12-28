import { StyleSheet } from 'react-native';
import colors from '../../../../assets/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  textInput: {
    backgroundColor:'rgba(225, 225, 225, 0.7)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
    color:colors.black,
    
  },
  autocompleteContainer: {
    flex: 0,
    zIndex: 1,
  },
  listView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 10,
  },
  content: {
    marginTop: 20,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
    fontFamily: 'Outfit-Bold',
    marginLeft:16
  },
  scrollContainer: {
    paddingRight: 16,
  },
  contentBody: {
    width: 200,
    marginLeft: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
    position: 'relative', // Bu satır eklendi, konumlandırma için önemli
  },
  contentImage: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff', // Yazının beyaz görünmesi için
    fontFamily: 'Outfit-Bold',
    marginBottom: 4,
    backgroundColor: 'rgba(49, 48, 48, 0.7)',
    borderRadius: 20,
    justifyContent: 'center',
    padding: 5,
    alignSelf: 'flex-start', 


  },
  rating: {
    fontSize: 16,
    color: '#fff', 
    backgroundColor: 'rgba(49, 48, 48, 0.7)',
    borderRadius: 20,
    justifyContent: 'center',
    padding: 5,
    alignSelf: 'flex-start', 
  },
  
});

