import React from 'react';
import { View, Text, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/BSInfoStyles';
import Button from '../Button';

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
                style={[styles.bottomSheet, { height: bottomSheetHeight, transform: [{ translateY: positionY }] }]}
            >
                {/* Encabezado con flecha de cierre */}
                <View style={styles.headerContainer}>
                    <Icon name="angle-left" size={35} color="#333" style={styles.icon} onPress={closeBottomSheet} />
                    <Text style={styles.modalTitle}>Explicación</Text>
                </View>

                {/* Sección de valor */}
                <View style={styles.valueContainer}>
                    <Text style={styles.infoTitle}>
                        Valor: <Text style={[styles.infoTitle, styles.redText]}> {selectedData.valor}</Text>
                    </Text>
                </View>

                <View style={styles.separatorLine} />

                {/* Contenedor de la información principal */}
                <View style={styles.content}>
                    <Text style={styles.infoText}>{selectedData.explicacion}</Text>
                </View>

                {/* Contenedor extra para información adicional */}
                <View style={styles.extraInfoContainer}>
                    {selectedData.extraInfo ? (
                        <Text style={styles.extraInfoText}>{selectedData.extraInfo}</Text>
                    ) : (
                        <Text style={styles.extraInfoText}>No hay información adicional</Text>
                    )}
                </View>

                {/* Línea separadora y contenedor del botón */}
                <View style={[styles.separatorLine, { top: 70}]} />
                <View style={[styles.buttonContainer, { top: 60, left: -30 }]}>
                    <Button label="Cerrar" onPress={closeBottomSheet} />
                </View>
            </Animated.View>
        </Modal>
    );
};

export default BSInfo;