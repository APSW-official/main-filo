let dif, ans, hints,ok=0;

let secureRandomNumber;


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
    
    create_quest();

    display_quest();
    
}



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

function get_selAns(x){
    
    console.log(x);
}


function display_quest() {
    let testDiv = document.getElementById("testDiv");
    testDiv.style.display = "block";
    // testDiv.style.flexDirection = "column";
    // testDiv.style.alignItems = "center";
    // testDiv.style.height = "100%";
    
    let data = '';
    data += `<div style=" margin-bottom: 200px;">`;
    data += `<h3 style="text-align: center;">Intrebare</h3>`;
    data += `</div>`;
    
    let table_ans = '<table class="ans" style="width: 100%;"> <tr>';
    for (let i = 0; i < ans; i++) {
        table_ans += `<td><button onclick="get_selAns(${i+1})">${i+1}</button></td>`;
    }
    table_ans += " </tr></table>"; // Close the tr and table here
    
    // Combine both data and table_ans
    data += table_ans;
    
    // Set the combined content to the testDiv
    testDiv.innerHTML = data;
}


function get_rand(x){
    secureRandomNumber = window.crypto.getRandomValues(new Uint32Array(1))[0] % x + 1;
}


function create_quest(){
    let fil=get_rand(25);
    let RAns=get_rand(ans);
    
}
