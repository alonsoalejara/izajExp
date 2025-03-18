export const getGruaIllustrationStyle = (largoPluma) => {
  switch (largoPluma) {
    case '33.5 m':
      return { position: 'absolute', top: 264, left: 23, transform: [{ scale: 0.175 }] };
    case '26.9 m':
      return { position: 'absolute', top: 256, left: 28, transform: [{ scale: 0.19 }] };
    case '24.3 m':
      return { position: 'absolute', top: 262, left: 36, transform: [{ scale: 0.24 }] };
    case '19.8 m':
      return { position: 'absolute', top: 250, left: 23, transform: [{ scale: 0.29 }] };
    case '15.2 m':
      return { position: 'absolute', top: 227, left: 13, transform: [{ scale: 0.33 }] };
    case '10.5 m':
      return { position: 'absolute', top: 254, left: -15, transform: [{ scale: 0.45 }] };
    default:
      return { position: 'absolute', top: 254, left: -15, transform: [{ scale: 0.45 }] };
  }
};
