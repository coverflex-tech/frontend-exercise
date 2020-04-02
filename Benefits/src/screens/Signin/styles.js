import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  body: {
    alignItems     : 'center',
    backgroundColor: 'white',
    flex           : 1,
    flexDirection  : 'column',
    justifyContent : 'flex-start',
  },
  headerText: {
    fontSize : 30,
    marginTop: '30%',
    textAlign: 'center',
    width    : '100%',
  },
  keyboardAvoidingView: {
    alignItems    : 'center',
    height        : '90%',
    justifyContent: 'flex-start',
    width         : '100%',
  },
  textInput: {
    borderColor      : 'black',
    borderRadius     : 7,
    borderWidth      : 1,
    height           : 44,
    marginBottom     : '20%',
    marginTop        : '30%',
    paddingHorizontal: 15,
    paddingVertical  : 3,
    width            : '80%',
  },
});

export default styles;
