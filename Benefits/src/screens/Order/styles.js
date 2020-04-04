import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  body: {
    alignItems     : 'center',
    backgroundColor: 'white',
    flex           : 1,
    flexDirection  : 'column',
    justifyContent : 'flex-start',
  },
  orderListView: {
    height: '60%',
    width : '90%',
  },
  orderTotalText: {
    marginBottom: 20,
  }
});

export default styles;
