import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../../../assets/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Dimensions.get('window').height / 25,
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 35,
    color: '#000',
  },
  addButton: {
    padding: 5,
    color:colors.black,

  },
  loader: {
    marginTop: 20,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },

  touchable: {
    borderRadius: 15,
  },
  deleteContainer: {
    position: 'absolute',
    right: 0,
    top: 18,
    bottom: 0,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  deleteText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  creatButton:{
    color:colors.black,
    fontSize:18,
    backgroundColor:'#e8e8e8ee',
    borderRadius:15,
    padding:8

  }
});
