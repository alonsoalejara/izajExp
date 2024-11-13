import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Svg, Circle, Line, Rect } from 'react-native-svg'; // Para dibujar gráficos
import styles from '../styles/GruaIzajeStyles';  // Importa los estilos

export default function GruaIzajeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>GRÚA DE IZAJE</Text>
  
        {/* Ilustración de la grúa en un plano cartesiano */}
        <Svg height="300" width="400" viewBox="0 0 400 300">
          {/* Cuadrícula: Líneas horizontales */}
          {[...Array(10)].map((_, index) => (
            <Line
              key={`h-line-${index}`}
              x1="50"
              y1={50 + (index * 20)}
              x2="350"
              y2={50 + (index * 20)}
              stroke="lightgray"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          ))}
  
          {/* Cuadrícula: Líneas verticales */}
          {[...Array(8)].map((_, index) => (
            <Line
              key={`v-line-${index}`}
              x1={50 + (index * 40)}
              y1="50"
              x2={50 + (index * 40)}
              y2="250"
              stroke="lightgray"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          ))}
  
          {/* Ejes X y Y */}
          <Line x1="50" y1="50" x2="50" y2="250" stroke="black" strokeWidth="2" />
          <Line x1="50" y1="250" x2="350" y2="250" stroke="black" strokeWidth="2" />
  
          {/* Grúa: Representación con un rectángulo (base de la grúa) */}

          {/* Ahora la base de la grúa está pegada al eje Y (coordenada X = 50) */}
          <Rect x="60" y="220" width="60" height="20" fill="gray" />
          
          {/* Brazo de la grúa (línea diagonal) */}
          <Line x1="90" y1="220" x2="160" y2="120" stroke="blue" strokeWidth="6" />
  
          {/* Carga (representada por un círculo) */}
          <Circle cx="160" cy="120" r="10" fill="red" />
  
          {/* Ruedas de la grúa (círculos pequeños) */}
          {/* Las ruedas ahora están pegadas al eje X en el punto (0, 0) */}
          <Circle cx="60" cy="240" r="10" fill="black" />
          <Circle cx="120" cy="240" r="10" fill="black" />
        </Svg>
  
        {/* Botón para navegar a otra pantalla */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PlanIzaje')}
        >
          <Text style={styles.buttonText}>Ir a Plan de Izaje</Text>
        </TouchableOpacity>
      </View>
    );
  }