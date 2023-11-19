document.addEventListener('DOMContentLoaded', function() {
    processFile();
});

function processFile() {
    const filePath = 'filozofi.xlsx'; // Update with your actual file path
    const outputDiv = document.getElementById('output');
    let data1 = ""; // Declare data1 here to make it accessible within the entire function

    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function () {
        const arrayBuffer = xhr.response;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        // Process the workbook, for example, display the content in the outputDiv
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log(jsonData);
let prevLet=jsonData[0][1];
        data1+=`
        <tr style="border-bottom:1px solid white;">
            <td>${preLet.toUpperCase()}</td>
        </tr>
        `;
        
        for (el of jsonData) {
            if(el[1]!=pervLet){
                data1+=`
                <tr style="border-bottom: 1px solid white; border-top: 1px solid white;">
                    <td>${preLet.toUpperCase()}</td>
                </tr>
                `;
            }
            data1 += `
                <tr>
                    <td>${el[0]}</td>
                </tr>
            `;
        }
        console.log(data1);
        outputDiv.innerHTML = data1;
    };

    xhr.send();
}
