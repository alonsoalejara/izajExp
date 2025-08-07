import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, Animated, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Components from '../Components.index';
import styles from '../../styles/BottomSheetStyles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BSFormaElemento = ({
    isVisible,
    onClose,
}) => {
    const bottomSheetHeight = SCREEN_HEIGHT * 0.5;
    const positionY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

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
        }).start(() => onClose());
    };

    useEffect(() => {
        if (isVisible) {
            openBottomSheet();
        } else {
            closeBottomSheet();
        }
    }, [isVisible]);

    return (
        <Modal transparent={true} visible={isVisible} animationType="none">
            <TouchableWithoutFeedback onPress={closeBottomSheet}>
                <View style={styles.overlay} />
            </TouchableWithoutFeedback>
            <Animated.View
                style={[
                    styles.bottomSheet,
                    { height: bottomSheetHeight, transform: [{ translateY: positionY }] },
                ]}
            >
                <View style={styles.dragLine} />
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Visualización del Elemento</Text>
                </View>

                <View style={localStyles.contentContainer}>
                    <Text style={localStyles.helloWorldText}>Hola Mundo</Text>
                </View>
                
                <Components.Button
                    label="Cerrar"
                    onPress={closeBottomSheet}
                    style={{ marginTop: 30, alignSelf: 'center', right: 26 }}
                />
            </Animated.View>
        </Modal>
    );
};

const localStyles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    helloWorldText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default BSFormaElemento;