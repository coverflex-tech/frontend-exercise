import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#7e8e9f',
  },
  headerContainer: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  subtitleContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 24,
  },
  titleLabel: {fontSize: 24, fontWeight: 'bold', color: '#333'},
  subtitleLabelBold: {fontSize: 20, fontWeight: 'bold', color: '#333'},
  subtitleLabel: {fontSize: 20, color: '#333'},
  button: {
    marginHorizontal: 24,
    backgroundColor: '#ff9577',
    paddingVertical: 24,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {fontWeight: 'bold', color: 'white', fontSize: 16},
  errorContainer: {alignItems: 'center'},
  errorText: {color: 'red'}
});
