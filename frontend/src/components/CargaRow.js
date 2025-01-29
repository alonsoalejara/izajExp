import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TablasStyles from '../styles/TablasStyles';

const CargaRow = ({ row, onInfoPress }) => {
    return (
        <View style={TablasStyles.row}>
            <Text style={[TablasStyles.cell, { flex: 1 }]}>{row.item}</Text>
            
            <View style={[TablasStyles.cell, TablasStyles.descripcionColumn, { flex: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                <Text>{row.descripcion}</Text>
                
                {['PESO DE APAREJOS', 'PESO TOTAL', 'RADIO DE TRABAJO MÁX', '% UTILIZACIÓN'].includes(row.descripcion) && (
                    <TouchableOpacity onPress={() => onInfoPress(row.descripcion)}>
                        <Icon name="info-outline" size={22} color="#555" />
                    </TouchableOpacity>
                )}
            </View>

            <Text style={[TablasStyles.cell, TablasStyles.valueColumn, { flex: 2.1 }]}>{row.valor}</Text>
        </View>
    );
};

export default CargaRow;
