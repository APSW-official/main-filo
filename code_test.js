/*let dif, ans, hints, ok = 0,scor=0,selAns;
let secureRandomNumber;
let otherAns = [];
let RAns, fil, filC;
let p=1,y=0;
let testDiv;

function get_loc(){
    let div=document.getElementById("startDiv");
    console.log(div.id);
    
}
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
    {
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
            for (let i = 0; i < ans; i++) {
                let aux2;

                do {
                    aux2 = get_rand(len);
                } while (uniqueValues.has(aux2));
                if (i !== RAns) {
                    otherAns[i] = aux2;
                    uniqueValues.add(aux2);
                }
            }

            console.log(p, RAns);
            testDiv = document.getElementById("testDiv");
            testDiv.style.display = "block";

            let data = '';
            data += `<div style="margin-bottom: 200px; text-align: center;">`;
            data += `<h3>${jsonData[fil][filC]}</h3>`;
            data += `</div>`;

            let table_ans = '<table class="ans" style="width: 100%;">';

            // Calculate the number of rows and columns
            const numRows = ans / 2;

            for (let row = 1; row <= numRows; row++) {
                table_ans += '<tr>';

                for (let col = 1; col <= 2; col++) {
                    const index = (row - 1) * 2 + col;

                    // Make sure otherAns[index-1] is within the valid range
                    while (otherAns[index - 1] >= len) {
                        otherAns[index - 1] = get_rand(25);
                    }

                    table_ans += `<td><button onclick="get_selAns(${index - 1})">${jsonData[otherAns[index - 1]][0]}</button></td>`;
                }

                table_ans += '</tr>';
            }

            table_ans += '</table>';
            data += table_ans;
            data += `<button onclick="check_selAns()">Trimite</button>`;
            testDiv.innerHTML = data;

            // Set the combined content to the testDiv
        });
    }
    // Variables declared inside the block will be out of scope here
}


function get_rand(x) {
    return window.crypto.getRandomValues(new Uint32Array(1))[0] % x;
}*/



let dif, ans, hints, ok = 0, scor = 0, selAns;
let secureRandomNumber;
let otherAns = [];
let RAns, fil, filC;
let p = 1, y = 0;
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
        dif = dif * 20;
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
    selAns = x;
    y = 1;
}

function check_selAns() {
    if (y) {
        scor += selAns === RAns ? 1 : 0;
        console.log(selAns === RAns);
        if (p <= dif) {
            y = 0;
            p++;
            create_quest();
        } else {
            testDiv.style.display = "none";
            let scoreDiv = document.getElementById("score");
            scoreDiv.style.display = "block";
            scoreDiv.innerHTML = `<div id="displayScore"><h3>Ai obținut<p>${scor}</h3></div>`;
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

        for (let i = 0; i < ans; i++) {
            let aux2;

            do {
                aux2 = get_rand(len);
            } while (uniqueValues.has(aux2));

            if (i !== RAns) {
                otherAns[i] = aux2;
                uniqueValues.add(aux2);
            }
        }

        console.log(p, RAns);
        testDiv = document.getElementById("testDiv");
        testDiv.style.display = "block";

        let data = '';
        data += `<div style="margin-bottom: 200px; text-align: center;">`;
        data += `<h3>${jsonData[fil][filC]}</h3>`;
        data += `</div>`;

        let table_ans = '<table class="ans" style="width: 100%;">';

        // Calculate the number of rows and columns
        const numRows = ans / 2;

        for (let row = 1; row <= numRows; row++) {
            table_ans += '<tr>';

            for (let col = 1; col <= 2; col++) {
                const index = (row - 1) * 2 + col;

                // Make sure otherAns[index-1] is within the valid range
                while (otherAns[index - 1] >= len) {
                    otherAns[index - 1] = get_rand(25);
                }

                table_ans += `<td><button onclick="get_selAns(${index - 1})">${jsonData[otherAns[index - 1]][0]}</button></td>`;
            }

            table_ans += '</tr>';
        }

        table_ans += '</table>';
        data += table_ans;
        data += `<button onclick="check_selAns()">Trimite</button>`;
        testDiv.innerHTML = data;
    });
}

function get_loc() {
    let div = document.getElementById("startDiv");
     var computedStyle = window.getComputedStyle(div);
    console.log(computedStyle);
}

function get_rand(x) {
    return window.crypto.getRandomValues(new Uint32Array(1))[0] % x;
}

/*document.getElementById("toggleSwitch").addEventListener("change", function () {
    var x = document.getElementById("indicii");

    x.style.display = this.checked ? "none" : "inline-block";
});
*/
