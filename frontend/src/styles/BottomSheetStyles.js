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
  /* Perfil del usuario */
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
});

export default BottomSheetStyles;
