const x = document.getElementById("demo");

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        x.innerHTML = "센과 치히로의 행방불명"
    }
};

function showPosition(position){
    x.innerHTML = "Latitude : " + position.coords.latitude +
     "<br>Longitude: " + position.coords.longitude;
}


