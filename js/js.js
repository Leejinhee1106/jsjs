//test1
function myDisplayer(something){
    document.getElementById('demo').innerHTML = something;
}

function myCalculator(num1, num2, myCallback){
    let sum = num1 + num2;
    myCallback(sum);
}

myCalculator(5, 5, myDisplayer);

/* ******************************************************************* */

//test2
function myUi(something){
    document.getElementById("pro").innerHTML = something;
}
let myPromise = new Promise(function(myResolve, myReject) {
    let x = 0;

    if(x == 0){
        myResolve("OK");
    }
    else{
        myReject("Error")
    }
});

myPromise.then(
    function(value) {myUi(value);},
    function(error) {myUi(error);}
)

/* ******************************************************************* */

//test3
async function myUx(){
    let myPro = new Promise(function(resolve,reject){
        resolve("성공");
    });
    document.getElementById("as").innerHTML = await myPro;
}
myUx();