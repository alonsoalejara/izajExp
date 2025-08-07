import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, Animated, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Components from '../Components.index';
import styles from '../../styles/BottomSheetStyles';
import RenderForma from '../../utils/render/renderForma';
import RenderCG from '../../utils/render/renderCG';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BSFormaElemento = ({
    isVisible,
    onClose,
    ancho,
    largo,
    alto,
    diametro,
    forma
}) => {
    const bottomSheetHeight = SCREEN_HEIGHT * 0.6;
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

    const parsedAncho = parseFloat(ancho) || 0;
    const parsedLargo = parseFloat(largo) || 0;
    const parsedAlto = parseFloat(alto) || 0;
    const parsedDiametro = parseFloat(diametro) || 0;
    const parsedForma = forma ? forma.toLowerCase() : '';

    let isCylinderVertical = false;
    if (parsedForma === 'cilindro' && parsedAlto > parsedDiametro) {
        isCylinderVertical = true;
    }

    let dimensionesRender = {};
    let formaParaRender = '';

    if (parsedForma === 'cuadrado') {
        formaParaRender = 'Cuadrado';
        dimensionesRender = {
            largo: parsedLargo,
            ancho: parsedAncho,
            profundidad: parsedAlto,
        };
    } else if (parsedForma === 'rectángulo') {
        formaParaRender = 'Rectángulo';
        dimensionesRender = {
            largo: parsedLargo,
            ancho: parsedAncho,
            profundidad: parsedAlto,
        };
    } else if (parsedForma === 'cilindro') {
        formaParaRender = 'Cilindro';
        dimensionesRender = {
            largo: isCylinderVertical ? parsedDiametro : parsedAlto,
            ancho: isCylinderVertical ? parsedDiametro : parsedDiametro,
            profundidad: isCylinderVertical ? parsedAlto : parsedDiametro,
            isCylinderVertical: isCylinderVertical
        };
    }

    const shouldShowShape = (parsedForma === 'cuadrado' || parsedForma === 'rectángulo' || parsedForma === 'cilindro') &&
                            (parsedAncho > 0 || parsedLargo > 0 || parsedAlto > 0 || parsedDiametro > 0);

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
                    {shouldShowShape ? (
                        <>
                            <View style={localStyles.visualizationCargaContainer}>
                                <RenderForma
                                    forma={formaParaRender} // Usamos la variable corregida
                                    dimensiones={dimensionesRender}
                                />
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left', marginTop: 20 }}>
                                Visualización de la carga de lado y de frente:
                            </Text>
                            <RenderCG forma={formaParaRender} isCylinderVertical={isCylinderVertical} />
                        </>
                    ) : (
                        <Text style={localStyles.helloWorldText}>Hola Mundo</Text>
                    )}
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
    visualizationCargaContainer: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BSFormaElemento;