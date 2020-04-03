import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  body: {
    alignItems     : 'center',
    backgroundColor: 'white',
    flex           : 1,
    flexDirection  : 'column',
    justifyContent : 'flex-start',
  },
  productsListView: {
    height: '85%',
    width : '90%'
  },
  userInfo: {
    height    : '10%',
    paddingTop: 10,
    width     : '90%'
  },
});

export default styles;
