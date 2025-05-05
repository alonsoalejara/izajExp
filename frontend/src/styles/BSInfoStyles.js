import { StyleSheet, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    left: -20,
    marginTop: -20,
    marginBottom: -30,
    width: '115%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    position: 'absolute',
    top: 10,
    height: SCREEN_HEIGHT,
    left: -20,
    width: '112%',
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  valueContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    left: 20,
    justifyContent: 'left',
    paddingVertical: 30,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    textAlign: 'left',
    top: 35,
    left: -20,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
    marginHorizontal: 20,
  },
  content: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    textAlign: 'left',
    top: 30,
    left: -3,
    marginBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#999',
    textAlign: 'left',
    marginBottom: 20,
  },
  redText: {
    color: '#ee0000',
  },
  closeButton: {
    backgroundColor: '#ee0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  extraInfoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
  },
  extraInfoText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#555',
    textAlign: 'left',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
});

export default styles;
