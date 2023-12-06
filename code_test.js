let dif, ans, hints,ok=0;

let secureRandomNumber;

let otherAns=[];
let RAns,fil, filC;






function get_dif(x) {
    dif = x;
}

function get_ans(x) {
    ans = x;
}

function get_hints(x) {
    hints = x;
}

function get_selAns(x){
    
    console.log(x===RAns);
}

function processFile() {
    const filePath = 'filozofi.xlsx'; // Update with your actual file path
    const outputDiv = document.getElementById('output');
    let data1 = ""; // Declare data1 here to make it accessible within the entire function
    let prevLet;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function () {
    const arrayBuffer = xhr.response;
    const data = new Uint8Array(arrayBuffer);
    try {
        const workbook = XLSX.read(data, { type: 'array' });

        // Process the workbook, for example, display the content in the outputDiv
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log(jsonData);
        console.log(s);
    } catch (error) {
        console.error('Error processing the workbook:', error);
    }
};
}



function create_quest(){
    
    fil=get_rand(25);
    filC=get_rand(20);
    RAns=get_rand(ans);
    otherAns[RAns]=fil;
    console.log(RAns);
    let i=1;
    while(i<ans){
        let aux1=get_rand(ans),aux2=get_rand(25);
        console.log(i+" "+aux1);
        if(aux1!==RAns&&typeof otherAns[aux1] === 'undefined'&&aux2!==fil){
            otherAns[aux1]=aux2;i++;
        }
    }
}

function display_quest() {
    create_quest();
    let testDiv = document.getElementById("testDiv");
    testDiv.style.display = "block";
    // testDiv.style.flexDirection = "column";
    // testDiv.style.alignItems = "center";
    // testDiv.style.height = "100%";
    
    let data = '';
data += `<div style="margin-bottom: 200px; text-align: center;">`;
data += `<h3>${fil + ' ' + filC}</h3>`;
data += `</div>`;

let table_ans = '<table class="ans" style="width: 100%;">';

// Calculate the number of rows and columns
const numRows = ans / 2;

for (let row = 1; row <= numRows; row++) {
    table_ans += '<tr>';

    for (let col = 1; col <= 2; col++) {
        const index = (row - 1) * 2 + col;
        if (index <= ans) {
            table_ans += `<td><button onclick="get_selAns(${index})">${otherAns[index]}</button></td>`;
        }
    }

    table_ans += '</tr>';
}

table_ans += '</table>'; // Close the table here

// Set the combined content to the testDiv
data += table_ans;
testDiv.innerHTML = data;

    
    // Set the combined content to the testDiv
    testDiv.innerHTML = data;
}


function get_rand(x){
    return window.crypto.getRandomValues(new Uint32Array(1))[0] % x + 1;
}










function start() {

    if (!(document.getElementById("toggleSwitch").checked)) {
        // If the toggle is on, check for all variables to have values
        if (dif !== undefined && ans !== undefined && hints !== undefined) {
            console.log("All three variables have values");
            console.log("Dif:", dif);
            console.log("Ans:", ans);
            console.log("Hints:", hints);ok=1;
        } else {
            console.log("Not all required variables have values");
            alert("Please provide values for all inputs.");
        }
    } else {
        // If the toggle is off, check if ans and dif have values
        if (dif !== undefined && ans !== undefined) {
            console.log("Only Dif and Ans have values");
            console.log("Dif:", dif);
            console.log("Ans:", ans);
            ok=1;
        } else {
            console.log("Not all required variables have values");
            alert("Please provide values for all inputs.");
        }
    }


if(ok){
    let startDiv=document.getElementById("startDiv");
    startDiv.style.display="none";
    
    processFile();

    display_quest();
    
}



}

