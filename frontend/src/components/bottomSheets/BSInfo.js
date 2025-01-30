import React from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import styles from '../../styles/BSInfoStyles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BSInfo = ({ isModalVisible, selectedData, setModalVisible }) => {
    const bottomSheetHeight = SCREEN_HEIGHT * 0.7;
    const positionY = new Animated.Value(SCREEN_HEIGHT);

    const openBottomSheet = () => {
        Animated.timing(positionY, {
            toValue: SCREEN_HEIGHT - bottomSheetHeight,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const closeBottomSheet = () => {
        Animated.timing(positionY, {
            toValue: SCREEN_HEIGHT,
            duration: 150,
            useNativeDriver: false,
        }).start(() => setModalVisible(false));
    };

    React.useEffect(() => {
        if (isModalVisible) {
            openBottomSheet();
        } else {
            closeBottomSheet();
        }
    }, [isModalVisible]);

    return (
        <Modal transparent={true} visible={isModalVisible} animationType="none">
            <TouchableWithoutFeedback onPress={closeBottomSheet}>
                <View style={styles.overlay} />
            </TouchableWithoutFeedback>
            <Animated.View
                style={[styles.bottomSheet, { height: bottomSheetHeight, transform: [{ translateY: positionY }] }]}>
                {/* Línea de arrastre */}
                <View style={styles.dragLine}></View>

                {/* Cabecera */}
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>EXPLICACIÓN</Text>
                </View>

                <View style={styles.separatorLine}></View>

                <View style={styles.content}>
                    <Text style={styles.infoTitle}>
                        Valor: 
                        <Text style={[styles.infoTitle, styles.redText]}> {selectedData.valor}</Text>
                    </Text>
                    <Text style={styles.infoText}>{selectedData.explicacion}</Text>

                    {/* Botón para cerrar */}
                    <TouchableOpacity onPress={closeBottomSheet} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </Modal>
    );
};

export default BSInfo;