let dif, ans, hints, ok = 0;
let secureRandomNumber;
let otherAns = [];
let RAns, fil, filC;



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

        create_quest();
        display_quest();
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
    console.log(x === RAns);
}

function checkIf(a,c){
    for(el of a){
        if(el===c)
            return false;
    }
    return true;
}


function create_quest(){
   processFile2(function(jsonData) {
       // console.log(jsonData);   
       
        const len=jsonData.length;
        let f=[0,0,0,0,0,0,0,0];
       
        fil=get_rand(len);
        filC=get_rand(jsonData[fil].length);
        
        RAns=get_rand(ans);
        otherAns[RAns]=fil;
        
        f[RAns]=1;
        
        let i=0;
        while(i<ans){
            let aux2=get_rand(len);
        
            if(checkIf(otherAns,aux2)){
                if(!f[i])
                otherAns[i]=aux2;
                f[i]=1;
            }
            else{
                do{
                    aux2=get_rand(len);
                }while(checkIf(otherAns,aux2));
            
                if(!f[i])
                otherAns[i]=aux2;
                f[i]=1;
            }
            
            i++;
        }
       
    });
    console.log("first");

}
function display_quest() {
    
    
    let testDiv = document.getElementById("testDiv");
    testDiv.style.display = "block";

    let data = '';
    data += `<div style="margin-bottom: 200px; text-align: center;">`;
    data += `<h3>Cui îi aparține citatul:${fil,filC}</h3>`;
    data += `</div>`;

    let table_ans = '<table class="ans" style="width: 100%;">';

    // Calculate the number of rows and columns
    const numRows = ans / 2;
console.log(otherAns);
    for (let row = 1; row <= numRows; row++) {
        table_ans += '<tr>';

        for (let col = 1; col <= 2; col++) {
            const index = (row - 1) * 2 + col;
            console.log(otherAns[index]);
            table_ans += `<td><button onclick="get_selAns(${index-1})">${otherAns[index]}</button></td>`;
            
        }

        table_ans += '</tr>';
    }

    table_ans += '</table>';
    data += table_ans;
    testDiv.innerHTML = data;

    // Set the combined content to the testDiv
    console.log("second");
    testDiv.innerHTML = data;
    
}

function get_rand(x) {
    return window.crypto.getRandomValues(new Uint32Array(1))[0] % x ;
}
