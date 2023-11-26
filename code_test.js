let dif, ans, hints,ok=0;

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


function display_quest() {
    let testDiv = document.getElementById("testDiv");
    testDiv.style.display = "flex";
    
let data = '';
data += `<div id="quest" style="display: flex; justify-content: center; align-items: center; height: 100%;">`;
data += `<h3 style="text-align: center; margin: 0;">Intrebare</h3>`;
data += `</div>`;

testDiv.innerHTML = data;


}
