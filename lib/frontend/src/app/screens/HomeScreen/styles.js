import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: '#7e8e9f', paddingTop: 40, paddingHorizontal: 24},
  titleLabel: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  input: {height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: '#ededed', paddingHorizontal: 16, paddingVertical: 8, fontSize: 16, marginBottom: 30},
  button: {
    backgroundColor: '#ff9577',
    paddingVertical: 24,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {fontWeight: 'bold', color: 'white', fontSize: 16},
});
