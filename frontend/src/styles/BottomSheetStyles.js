import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BottomSheetStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    position: 'absolute',
    top: 0,
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  dragLine: {
    width: 40,
    height: 5,
    backgroundColor: '#888',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 10,
    marginBottom: 2,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 2,
  },
  backIcon: {
    marginRight: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 80,
    color: '#333',
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  optionButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  optionTextContainer: {
    flexDirection: 'row',           
    justifyContent: 'space-between',
    alignItems: 'center',           
    flex: 1,                        
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
  },
  radioContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 230,
    
  },
  radioButton: {
    width: 19,
    height: 19,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioButton: {
    borderColor: '#ff0000',
  },
  selectedCircle: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#ff0000',
  },
  /* Titulo */
  titleContainer: {
    paddingVertical: 10,
    textAlign: "left",
    marginRight: 150,
    backgroundColor: "#fff",
  },
  titleText: {
    fontSize: 26,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  /* Perfil del usuario */
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },  
  /* Botones de acción */
  roundedButtonContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    overflow: 'hidden',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  actionButton: {
    padding: 15,
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginLeft: 5,
  },
  topButton: {
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  bottomButton: {
    borderTopWidth: 0.5,
    borderColor: '#ddd',
  },
  /* Inputs */
  roundedInputContainer: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    top: 20,
    width: '87%',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputTop: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  inputMiddle: {
    borderBottomWidth: 0.3,
    borderColor: '#ddd',
  },
  inputBottom: {
    borderTopWidth: 0.5,
    borderColor: '#ddd',
  },
  inputLabel: {
    position: "absolute",
    top: 12,
    left: 15,
    fontSize: 16,
    color: "#aaa",
  },
  inputLabelPlaceholder: {
    top: 20,
    fontSize: 18,
    color: '#aaa',
  },
  inputLabelFloating: {
    fontSize: 16,
    color: '#666',
    top: 10,
    left: 15,
  },
  input: {
    flex: 1,
    padding: 22,
    top: 7,
    marginLeft: -7,
    borderRadius: 5,
    fontSize: 17,
    fontWeight: "500",
    color: "#000",
  },
  clearIcon: {
    position: "absolute",
    right: 10,
  },
  /* Botones de acción */
  button: {
    marginTop: 325,
    backgroundColor: "#ff0000",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: "center",
    width: "87%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  /* Picker */
  modalBackground: {
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    height: '65%',
  },
  pickerBackground: {
    position: 'absolute',
    bottom: -330,
    left: 0,
    right: 0,
    backgroundColor: '#cccccc',
    height: 330,
    justifyContent: 'flex-start',
  },
  picker: {
      position: 'absolute',
      width: '100%',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#cccccc',
      height: 330,
  },
  specialityOutput: {
    height: 55,
    top: 20,
    left: 20,
    width: '90%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 11,
    marginTop: 0,
    marginBottom: 20,
    marginRight: 6,
    paddingLeft: 10,
    backgroundColor: '#fff',
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    justifyContent: 'flex-end',
    alignItems: 'left',
  },
  specialitySubtitle: {
      height: 55,
      width: '100%',
      borderRadius: 11,
      marginBottom: -36,
      marginRight: 48,
      paddingLeft: -10,
      backgroundColor: 'transparent',
      fontSize: 16,
      fontWeight: '500',
      color: '#aaa',
      justifyContent: 'center',
      alignItems: 'left',
  },

  specialityText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    marginBottom: 10,
    textAlign: 'left',
  },
});

export default BottomSheetStyles;
