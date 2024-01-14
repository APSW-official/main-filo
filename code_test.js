let dif, ans, hints, ok = 0,scor=0,selAns;
let secureRandomNumber;
let otherAns = [];
let RAns, fil, filC;
let p=1,y=0;
let testDiv;


function start() {
    if (!(document.getElementById("toggleSwitch").checked)) {
        if (dif !== undefined && ans !== undefined && hints !== undefined) {
            console.log("All three variables have values");
            console.log("Dif:", dif);
            console.log("Ans:", ans);
            console.log("Hints:", hints);
            ok = 1;
        } else {
            console.log("Not all required variables have values");
            alert("Please provide values for all inputs.");
        }
    } else {
        if (dif !== undefined && ans !== undefined) {
            console.log("Only Dif and Ans have values");
            console.log("Dif:", dif);
            console.log("Ans:", ans);
            ok = 1;
        } else {
            console.log("Not all required variables have values");
            alert("Please provide values for all inputs.");
        }
    }

    if (ok) {
        let startDiv = document.getElementById("startDiv");
        startDiv.style.display = "none";
        dif=dif*20;
        console.log(dif);
        create_quest();
         
    }
}

function processFile2(callback) {
    const filePath = 'filozofi2.xlsx'; // Update with your actual file path
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

        // Call the callback function with the jsonData
        callback(jsonData);
    };

    xhr.send();
}





function get_dif(x) {
    dif = x;
}

function get_ans(x) {
    ans = x;
}

function get_hints(x) {
    hints = x;
}

function get_selAns(x) {
   selAns=x;
 y=1;
}

function check_selAns(){
    if(y){
        scor+=selAns === RAns?1:0;
        console.log(selAns === RAns);
        if(p<=dif){
            y=0;
            p++;
            create_quest();
        }
        else{
            testDiv.style.display = "none";
            let scoreDiv=document.getElementById("score");
            scoreDiv.style.display = "block";
            let dataScore=`<div id="displayScore">`;
            dataScore+=`<h3>Ai obținut<p>${scor}</h3>`;

            dataScore+=`</div>`;
             scoreDiv.innerHTML = dataScore;
        }
        
    }
}

function create_quest() {
    processFile2(function (jsonData) {
        const len = jsonData.length;
        let uniqueValues = new Set();

        fil = get_rand(len);
        filC = get_rand(jsonData[fil].length);

        RAns = get_rand(ans);
        otherAns[RAns] = fil;

        uniqueValues.add(fil);

        // Make sure RAns is within the valid range
        while (RAns >= ans) {
            RAns = get_rand(ans);
        }
        while (filC < 2) {
            filC = get_rand(jsonData[fil].length);
        }

        let data = document.createElement('div');
        data.style.marginBottom = '200px';
        data.style.textAlign = 'center';
        
        let heading = document.createElement('h3');
        heading.textContent = jsonData[fil][filC];
        data.appendChild(heading);

        let table = document.createElement('table');
        table.className = 'ans';
        table.style.width = '100%';

        // Calculate the number of rows and columns
        const numRows = ans / 2;

        for (let row = 1; row <= numRows; row++) {
            let tr = document.createElement('tr');

            for (let col = 1; col <= 2; col++) {
                const index = (row - 1) * 2 + col;

                // Make sure otherAns[index-1] is within the valid range
                while (otherAns[index - 1] >= len) {
                    otherAns[index - 1] = get_rand(25);
                }

                let td = document.createElement('td');
                let button = document.createElement('button');
                button.textContent = jsonData[otherAns[index - 1]][0];
                button.onclick = function () {
                    get_selAns(index - 1);
                };
                td.appendChild(button);
                tr.appendChild(td);
            }

            table.appendChild(tr);
        }

        data.appendChild(table);

        let button = document.createElement('button');
        button.textContent = 'Trimite';
        button.onclick = check_selAns;
        data.appendChild(button);

        testDiv = document.getElementById('testDiv');
        testDiv.innerHTML = '';
        testDiv.style.display = 'block';
        testDiv.appendChild(data);
    });
}


/*function display_quest() {
    
    const arr=create_quest();
console.log(arr);
   
}*/

function get_rand(x) {
    return window.crypto.getRandomValues(new Uint32Array(1))[0] % x;
}
