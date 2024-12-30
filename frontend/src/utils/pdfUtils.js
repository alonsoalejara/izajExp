import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset'; // Importar Asset de Expo

export const convertirImagenABase64 = async (rutaImagen) => {
    try {
        const imageAsset = Asset.fromModule(rutaImagen);
        await imageAsset.downloadAsync();

        const path = imageAsset.localUri;
        const base64 = await FileSystem.readAsStringAsync(path, { encoding: FileSystem.EncodingType.Base64 });

        return base64;
    } catch (error) {
        console.error('Error al convertir la imagen a base64:', error);
    }
};