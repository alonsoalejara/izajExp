import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import TablasStyles from '../styles/TablasStyles';
import Tables from '../components/tables/Table.index.js';

const Tablas = ({ route }) => {
  const { eslingaOEstrobo, cantidadManiobra, cantidadGrilletes, tipoGrillete, grua, radioIzaje, radioMontaje } = route.params;

  const gruaData = {
    'Terex RT555': { pesoEquipo: 12000, pesoGancho: 450, capacidadLevante: 17800, largoPluma: 19.8, contrapeso: 6.4 },
    'Grúa 2': { pesoEquipo: 10000, pesoGancho: 400, capacidadLevante: 16000, largoPluma: 20, contrapeso: 7 },
    'Grúa 3': { pesoEquipo: 11000, pesoGancho: 420, capacidadLevante: 17000, largoPluma: 21, contrapeso: 8 },
  };

  const selectedGrua = gruaData[grua] || {};

  const rows = [
    {
      item: '1',
      descripcion: `${eslingaOEstrobo.toUpperCase()}`,
      cantidad: cantidadManiobra,
      pesoUnitario: 5,
      pesoTotal: cantidadManiobra * 5,
    },
    {
      item: '2',
      descripcion: `Grillete ${tipoGrillete}`.toUpperCase(),
      cantidad: cantidadGrilletes,
      pesoUnitario: 2,
      pesoTotal: cantidadGrilletes * 2,
    },
  ];

  const totalPesoAparejos = rows.reduce((total, row) => total + row.pesoTotal, 0);
  const cargaRows = [
    { item: '1', descripcion: 'PESO DEL EQUIPO', valor: `${selectedGrua.pesoEquipo || '0'} kg` },
    { item: '2', descripcion: 'PESO APAREJOS', valor: `${totalPesoAparejos} kg` },
    { item: '3', descripcion: 'PESO GANCHO', valor: `${selectedGrua.pesoGancho || '0'} kg` },
    { item: '4', descripcion: 'PESO TOTAL', valor: `${(selectedGrua.pesoEquipo || 0) + totalPesoAparejos + (selectedGrua.pesoGancho || 0)} kg` },
    { item: '5', descripcion: 'RADIO DE TRABAJO MAXIMO', valor: `${Math.max(radioIzaje, radioMontaje)} mts` },
    { item: '6', descripcion: 'CAPACIDAD DE LEVANTE', valor: `${selectedGrua.capacidadLevante || '0'} kg` },
    { item: '7', descripcion: '% DE UTILIZACIÓN', valor: '' },
  ];

  const datosGrúaRows = [
    { item: '1', descripcion: 'LARGO PLUMA', valor: `${selectedGrua.largoPluma || '0'} mts` },
    { item: '2', descripcion: 'CONTRAPESO', valor: `${selectedGrua.contrapeso || '0'} ton` },
  ];

  const generarPDF = async () => {
    // Código de generación del PDF (sin cambios)
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[TablasStyles.container, { flex: 1, marginBottom: 80 }]}>
        <View style={TablasStyles.header}>
          <Text style={TablasStyles.title}>Tablas</Text>
        </View>

        <Tables.AparejosTable rows={rows} totalPesoAparejos={totalPesoAparejos} />
        <Tables.CargaTable cargaRows={cargaRows} />
        <Tables.GruaTable datosGrúaRows={datosGrúaRows} />
      </ScrollView>

      <View style={TablasStyles.fixedButtonContainer}>
        <TouchableOpacity onPress={generarPDF} style={TablasStyles.button}>
          <Text style={TablasStyles.buttonText}>Generar PDF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tablas;
