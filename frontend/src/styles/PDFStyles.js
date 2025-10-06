export const estilosPDF = `
    body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f4f4f4;
        color: #333;
        line-height: 1.6;
    }

    .container {
        width: 21cm;
        min-height: 29.7cm;
        margin: 0 auto;
        background-color: #fff;
        padding: 30px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
    }

    .header {
        text-align: left;
        margin-bottom: 20px;
        border-bottom: 2px solid #d9d9d9;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start; /* ✅ todo hacia la izquierda */
    }

    .logo-container {
        margin-bottom: 10px;
        width: 160px;
        height: 80px;
        border: none; /* elimina el borde gris */
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 0.8em;
    }


    .header h1 {
        color: #ee0000;
        margin-top: 0;
        font-size: 1.0em;
        margin-bottom: 0px;
    }

    .header h2 {
        color: #000;
        margin-top: 0px;
        margin-bottom: 0px;
        font-size: 0.8em;
    }

    .header p {
        font-size: 0.5em;
        color: #555;
        margin-top: 0px;
        margin-bottom: 0;
    }
    
    .section, .illustration-section {
        margin-bottom: 30px;
    }
    
    /* Regla actualizada para aplicar el estilo a h3 en .section y .illustration-section */
    .section h3, .illustration-section h3 {
        color: #ee0000;
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
        margin-bottom: 15px;
        font-size: 0.8em;
    }

    /* Nuevo contenedor para agrupar todas las tablas de datos en la parte superior */
    .data-tables-layout {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        margin-bottom: 30px;
        align-items: flex-start;
    }

    /* Estilo para que las tablas dentro del nuevo contenedor tengan el mismo ancho */
    .data-tables-layout .section {
        flex: 1;
        margin-bottom: 0; /* Eliminamos el margen inferior para que estén más pegadas */
    }

    /* Nuevo contenedor para las ilustraciones en la parte inferior */
    .illustrations-layout {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        margin-top: 30px; /* Separación con los elementos de arriba */
        margin-bottom: 30px;
    }

    /* Estilo para el contenedor de cada ilustración */
    .illustration-section {
        flex: 1; /* Para que ocupen el mismo espacio */
    }

    /* Estilos para el espacio de la ilustración, ahora con la altura ajustada y un borde más suave */
    .illustration-container {
        width: 100%;
        height: 350px; /* Altura ajustada para el nuevo layout */
        border: 1px solid #ccc; /* Borde para visualizar el espacio */
        display: flex;
        align-items: center;
        justify-content: center;
        color: #888;
        font-style: italic;
        text-align: center;
        background-color: #f9f9f9;
        border-radius: 8px;
    }

    /* Ajuste del tamaño y comportamiento de las imágenes dentro del contenedor */
    .illustration-container img {
        width: 100%;
        height: 100%;
        object-fit: contain; /* evita que se deforme y se salga del marco */
        border-radius: 6px;
    }

    .img-carga {
        width: 130%;        /* aumenta el tamaño en el PDF */
        height: auto;
        object-fit: contain;
        transform: scale(1.3);  /* escala el contenido dentro del marco */
        transform-origin: center;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.4em;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 4px;
        text-align: left;
    }

    th {
        background-color: #f2e3e3;
        color: #333;
        font-weight: bold;
    }

    tr:nth-child(even) {
        background-color: #ff3f3f1d;
    }

    .person-info {
        display: flex;
        justify-content: space-around;
        margin-top: 30px;
        text-align: center;
        flex-wrap: wrap;
    }

    .person-block {
        flex: 1;
        min-width: 200px;
        margin: 10px;
    }

    .signature-status {
        display: block;
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: 0.9em;
        color: #555;
        font-weight: bold;
    }

    .person-role {
        font-size: 0.9em;
        color: #777;
        margin-top: 5px;
        margin-bottom: 0;
    }

    .signature-line {
        border-top: 1px solid #000;
        margin-top: 15px;
        padding-top: 5px;
        font-size: 0.9em;
    }

    .date-info {
        text-align: right;
        font-size: 0.9em;
        color: #777;
        margin-top: 20px;
    }

    @media print {
        body {
            background-color: #fff;
            padding: 0;
        }
        .container {
            box-shadow: none;
            margin: 0;
            width: 100%;
            min-height: auto;
        }
        .no-print {
            display: none;
        }
        .logo-container, .illustration-container {
            border: none;
        }
    }
`;