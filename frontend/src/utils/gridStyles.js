export const getGridContainerStyle = (largoPluma) => {
    switch (largoPluma) {
      case '33.5 m':
        return { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: [{ scale: 1 }] };
      case '26.9 m':
        return { position: 'absolute', top: -12, left: 4, right: 0, bottom: 0, transform: [{ scale: 1.001 }] };
      case '24.3 m':
        return { position: 'absolute', top: -30, left: -10, right: 0, bottom: 0, transform: [{ scale: 1.15 }] };
      case '19.8 m':
        return { position: 'absolute', top: -73, left: -46, right: 0, bottom: 0, transform: [{ scale: 1.4 }] };
      case '15.2 m':
        return { position: 'absolute', top: -110, left: -70, right: 0, bottom: 0, transform: [{ scale: 1.6 }] };
      case '10.5 m':
        return { position: 'absolute', top: -130, left: -120, right: 0, bottom: 0, transform: [{ scale: 2.1 }] };
      default:
        return { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: [{ scale: 1 }] };
    }
  };
  