import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = (Math.round(Dimensions.get('window').width));
const styles = StyleSheet.create({
  container: {
    alignItems       : 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection    : 'row',
    height           : 50,
    justifyContent   : 'flex-start',
    width            : '100%',
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize : 12,
    marginTop: 4,
  },
  itemView: {
    alignItems    : 'flex-start',
    flexDirection : 'column',
    height        : '100%',
    justifyContent: 'center',
    width         : screenWidth-100,
  },
});

export default styles;
