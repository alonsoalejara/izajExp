import React from 'react';
import { View, ImageBackground, Image } from 'react-native';
import Svg, { LinearGradient, Stop, Rect } from 'react-native-svg';

const Header = () => {
  const styles = {
    circleContainer: {
      width: 600,
      height: 550,
      borderRadius: 150,
      position: 'absolute',
      bottom: '84%',
      left: '38%',
      transform: [{ translateX: -250 }],
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: 'transparent',
      zIndex: 1,
    },
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    image: {
      width: '80%',
      height: '80%',
      top: 120,
      left: 15,
      resizeMode: 'cover',
    },
    gradient: {
      position: 'absolute',
      top: 50,
      left: 100,
      width: 565,
      height: '100%',
      zIndex: 0,
    },
    logo: {
      position: 'absolute',
      top: '84%',
      left: '58.4%',
      transform: [{ translateX: -165 }],
      width: 200,
      height: 80,
      zIndex: 0,
    },
  };

  return (
    <View style={styles.circleContainer}>
      <ImageBackground
        source={require('../../assets/grua-home.png')}
        style={styles.background}
        imageStyle={styles.image}
      >
        <Svg style={styles.gradient}>
          <LinearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="80%" stopColor="white" stopOpacity="0.6" />
            <Stop offset="70%" stopColor="red" stopOpacity="0.8" />
          </LinearGradient>
          <Rect width="100%" height="100%" fill="url(#grad1)" />
        </Svg>
        <Image
          source={require('../../assets/EI-Montajes.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </ImageBackground>
    </View>
  );
};

export default Header;
