let dif, ans, hints, ok = 0, scor = 0, selAns;
let secureRandomNumber;
let otherAns = [];
let RAns, fil, filC;
let p = 1, y = 0;
let testDiv;
let hPerQ=1;

function start() {
    //console.log(get_loc());
    if (!(document.getElementById("toggleSwitch").checked)) {
        if (dif !== undefined && ans !== undefined && hints !== undefined) {
            // console.log("All three variables have values");
            // console.log("Dif:", dif);
            // console.log("Ans:", ans);
            // console.log("Hints:", hints);
            ok = 1;
        } else {
            if (dif !== undefined && ans !== undefined) {
                // console.log("Only Dif and Ans have values");
                // console.log("Dif:", dif);
                // console.log("Ans:", ans);
                ok = 1;
            } else {
                if(dif === undefined && ans === undefined)
                    alert("Nu ai selectat modul de dificutatea și numărul de variante răspuns. Pentru a continua trebuie să alegi dificutatea și numărul de răspunsuri.");
                else
                    if(dif === undefined)
                        alert("Trbuie să selectezi și modul de difictate.")
                    else{
                        alert("Trbuie să selectezi și numărul de variante de răspuns.")
                    }

            }
        }

    if (ok) {
        let startDiv = document.getElementById("startDiv");
        startDiv.style.display = "none";
        dif = dif * 10;
        // console.log(dif);
        if(hints!==undefined&&hints>0){
            let divHint=document.getElementById("hint")
            divHint.style.display = "block";
        }
        hPerQ=1;
        create_quest(2);
    }
    }
}

function processFile2(callback) {
    const filePath = 'filozofi2.xlsx'; 
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
        // console.log(selAns === RAns);
        if (p <= dif) {
            y = 0;
            p++;
            hPerQ=1;
            create_quest(2);
        } else {
            testDiv.style.display = "none";
            let scoreDiv = document.getElementById("score");
            scoreDiv.style.display = "flex";
            scoreDiv.style.width="100%";
            scoreDiv.innerHTML = `<div id="displayScore" style=" width: 200px;  height: 200px; border: 1px solid white;background-color: transparent;text-align: center; display: flex; flex-direction: column;   align-items: center;     justify-content: center;"><h3>Ai obținut<p>${scor}</h3></div>`;
        }
    }
}

function create_quest(hOrq) {
    processFile2(function (jsonData) {
        otherAns=[];
        if(hOrq==2){
        const len = jsonData.length;
        let uniqueValues = new Set();

        fil = get_rand(len);

        RAns = get_rand(ans);
        
        uniqueValues.add(fil);

        RAns = get_rand(ans);
        
        do{
            filC = get_rand(jsonData[fil].length);
        }while (filC < 2);

        for (let i = 0; i < ans; i++){
            if (i !== RAns) {
                let aux2;
                do {
                    aux2 = get_rand(len);
                } while (uniqueValues.has(aux2));
                    otherAns[i] = aux2;
                    uniqueValues.add(aux2);
            }
        }

            otherAns[RAns] = fil;
            console.log(RAns,otherAns,jsonData[fil][0]);
        testDiv = document.getElementById("testDiv");
        testDiv.style.display = "block";
        
        let data = '';
        data += `<div style="margin-bottom: 200px; text-align: center;">`;
        data += `<h3>${jsonData[fil][filC]}</h3>`;
        data += `</div>`;

        let table_ans = '<table class="ans" style="width: 100%;">';

        const numRows = ans / 2;

        for (let row = 1; row <= numRows; row++) {
            table_ans += '<tr>';

            for (let col = 1; col <= 2; col++) {
                const index = (row - 1) * 2 + col;

                if (jsonData[otherAns[index - 1]] && jsonData[otherAns[index - 1]].length > 0) {
                    table_ans += `<td><button onclick="get_selAns(${index - 1})">${jsonData[otherAns[index - 1]][0]}</button></td>`;
                } 
            }
            table_ans += '</tr>';
        }

        table_ans += '</table>';
        data += table_ans;
        data += `<button class="back" onclick="check_selAns()">Trimite</button>`;
        testDiv.innerHTML = data;
        console.log(hints)
        }
        else{
            
            if(hints>0&&hPerQ==1){
                alert("Filozoful care a spus asta este "+jsonData[fil][0]+'.');
                hPerQ--;
                hints--;
                if(hints==2)
                alert("Mai ai doar două indicii")
                else
                    if(hints==1)
                        alert("Mai ai doar un indiciu")
                    else
                        alert("Nu mai ai indicii")
                
            }
            if(hints===0){
                let divHint=document.getElementById("hint");
                divHint.style.display="none";
            }
        }
    });
}

 function get_loc(buttonId) {
     if(buttonId==='iesire'){
        let div = document.getElementById("startDiv");
        var computedStyle = window.getComputedStyle(div);
        if (computedStyle.display !== 'none')
             window.location.href = "index.html";  
        else{
            window.location.href = "solo.html";  
            dif=undefined, ans=undefined, hints=undefined, ok = 0, scor = 0, selAns=undefined;
            secureRandomNumber;
            otherAns = [];
            RAns=undefined, fil=undefined, filC=undefined;
            p = 1, y = 0;
            testDiv=undefined;
            hPerQ=1;
        }
            
    }

    
 }
function get_rand(x) {
    return window.crypto.getRandomValues(new Uint32Array(1))[0] % x;
}



