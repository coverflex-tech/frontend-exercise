import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: '#7e8e9f'},
  headerContainer: { padding: 24, flexDirection: 'row', justifyContent: 'space-between' },
  titleLabel: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  subtitleLabel: { fontSize: 20, color: '#333' },
  button: {
    marginHorizontal: 24,
    backgroundColor: '#ff9577',
    paddingVertical: 24,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {fontWeight: 'bold', color: 'white', fontSize: 16},
});
