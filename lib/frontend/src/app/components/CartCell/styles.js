import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#dedede',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  nameText: {fontWeight: 'bold', marginBottom: 6},
  statusText: {justifyContent: 'center'},
  buttonContainer: {justifyContent: 'center'},
  button: { padding: 8, backgroundColor: 'red', borderRadius: 4 },
  buttonText: { color: 'white' }
});
