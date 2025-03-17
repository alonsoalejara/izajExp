export const getAlturaType = (largoPluma) => {
    switch (largoPluma) {
      case '33.5 m': return 'altura33';
      case '26.9 m': return 'altura26';
      case '24.3 m': return 'altura24';
      case '19.8 m': return 'altura19';
      case '15.2 m': return 'altura15';
      case '10.5 m': return 'altura10';
      default: return 'altura10';
    }
  };
  