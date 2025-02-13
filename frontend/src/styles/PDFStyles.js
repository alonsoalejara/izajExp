export const estilosPDF = `

    body {
        font-family: Arial, sans-serif;
        font-size: 5px;
        margin: 10px;
        padding: 20px;
        border: 1px solid black;
        box-sizing: border-box;
        height: 122vh;
        width: 122vw;
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
    }
    .inner-box {
        border: 1px solid black;
        margin: 25px;
        padding: 20px;
        box-sizing: border-box;
        height: 110vh;
        width: 110vw;
        position: relative;
        text-align: right;
    }
    h2 {
        margin-top: 0;
        text-align: right;
        margin-bottom: 10px;
    }
    table {
        width: 200px;
        font-size: 5px;
        margin-bottom: 15px;
        border-collapse: collapse;
        margin-left: auto;
        margin-right: 0;
    }
    th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
    }
    th {
        background-color: white;
    }
    .view-box-container {
        display: grid;
        grid-template-columns: 30% 30%;
        grid-template-rows: 40vh 40vh;
        grid-gap: 15px 20px;
        margin-top: -494px;
        justify-items: start;
        align-items: start;
        width: 100%;
    }
    .view-box {
        width: 100%;
        padding: 10px;
        border: 1px solid black;
        box-sizing: border-box;
        height: 100%;
    }
    .view-box h3 {
        font-size: 10px;
        color: red;
        margin-top: 0;
        text-align: right;
    }
    .new-table {
    width: 15%;
    height: auto;
    margin-top: -190px;
    margin-left: 0;
    border-collapse: collapse;
    }

    .new-table table {
        width: 130%;
        border-collapse: collapse;
        margin-top: 123.2px;
        margin-left: 215px;
    }

    .new-table th, 
    .new-table td {
        padding: 1.2px;
        text-align: left; 
    }

    .eimisa-table table {
    height: 66px;
    width: 30%;
    border-collapse: collapse;
    margin-top: -81px;
    margin-left: 450px;
    }

    .eimisa-table th {
        padding: 5px;
        text-align: left; 
    } 
    .eimisa-table td {
        padding: -2px;
        text-align: left;
    }

    .additional-tables-container {
        margin-top: 59px;
        text-align: right;
        width: 100%;
    }

    .additional-tables-container table {
        margin: 28px -21px 10px auto;
        width: 300px;
        font-size: 10px;
    }

    .additional-tables-container table th, 
    .additional-tables-container table td {
        height: 45px;
        width: 40px;
        vertical-align: middle;
        padding: 10px;
    }

    .rotated-row-container {
        display: flex;
        justify-content: space-between;
        margin-top: -96.8px;
        margin-left: 190.5px;
    }

    .rotated-row {
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        font-size: 6px;
        padding: 0px;
        width: 5px;
        text-align: center;
    }

    .rotated-row table {
        width: 100%;
        border-collapse: collapse;
    }

    .rotated-header {
        height: 1px;
        width: 60%;
        padding-top: 23.5px;
        text-align: center;
        max-width: 60px;
    }

    .rotated-header-second {
        width: 20%;
        max-width: 30px;
    }
`;