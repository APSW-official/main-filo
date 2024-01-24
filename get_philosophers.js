/*document.addEventListener('DOMContentLoaded', function() {
    processFile();
});

function processFile() {
    const filePath = 'filozofi.xlsx'; // Update with your actual file path
    const outputDiv = document.getElementById('output');
    let data1 = "";
    let prevLet;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function () {
        const arrayBuffer = xhr.response;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log(jsonData);

        // Call processFile2 with the necessary data
        

        prevLet = jsonData[0][1];
        data1 += `
            <tr class="modified-prevLet-bot" id="${prevLet.toUpperCase()}">
                <td >${prevLet.toUpperCase()}</td>
            </tr>
        `;

        for (el of jsonData) {
            if (el[1] != prevLet) {
                prevLet = el[1];
                data1 += `
                    <tr class="modified-prevLet" id="${prevLet.toUpperCase()}">
                        <td>${prevLet.toUpperCase()}</td>
                    </tr>
                `;
            }
            data1 += `
                <tr>
                    <td>${el[0]}</td>
                </tr>
            `;
        }

        outputDiv.innerHTML = data1;
    };

    xhr.send();
}*/

document.addEventListener('DOMContentLoaded', function () {
    processFile();
    setupButtonEventListeners();
});

function setupButtonEventListeners() {
    const links = document.querySelectorAll('.sticky-menu button');

    links.forEach(link => {
        link.addEventListener('click', function () {
            const targetId = this.innerHTML.toUpperCase();
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                highlightAndFade(targetElement);
            }
        });
    });

    function highlightAndFade(element) {
        element.classList.add('highlight');
        setTimeout(() => {
            element.classList.remove('highlight');
        }, 2000);
    }
}



function processFile() {
    const filePath = 'filozofi.xlsx'; // Update with your actual file path
    const outputDiv = document.getElementById('output');
    let data1 = "";
    let prevLet;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function () {
        const arrayBuffer = xhr.response;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        fil_page(jsonData);

        prevLet = jsonData[0][1];
        data1 += `
            <tr class="modified-prevLet-bot" id="${prevLet.toUpperCase()}">
                <td >${prevLet.toUpperCase()}</td>
            </tr>
        `;
        
        for (let i = 0; i < jsonData.length; i++) {
            const el = jsonData[i];
            if (el[1] != prevLet) {
                prevLet = el[1];
                data1 += `
                    <tr class="modified-prevLet" id="${prevLet.toUpperCase()}">
                        <td>${prevLet.toUpperCase()}</td>
                    </tr>
                `;
            }
        
            data1 += `
                <tr>
                    <td><button class="custom-button" onclick=fil_page(${i})>${el[0]}</button></td>
                </tr>
            `;
        }
        
        outputDiv.innerHTML = data1;
    };

    xhr.send();
}

function fil_page(filId){
    console.log(filId);
}




