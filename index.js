// Stockholms värder'

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://newsapi.org/v2/top-headlines?country=se&apiKey=28600a09ba934043a13b4602d42f9639", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    const news =result. articles.slice(0,6)
    let divElement = document.getElementById("add");

    for (let i = 0; i < news.length; i++) {
        let pElement = document.createElement("div");

        pElement.textContent = news[i].title;

        pElement.className = 'iconcontainer_news'
        divElement.appendChild(pElement);
    }

  })
  .catch(error => console.log('error', error));



async function getWeather(city, iconcontainer){
  const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=8102f14f4c80b2bf57eb41a0c18b3cc7&units=metric');
  const data = await res.json();
  let temp = Math.round(data.main.temp);
  let main = data.weather[0].main;
  
  iconcontainer.innerHTML = city + ' ' + temp;

  if(main == 'Snow'){
    iconcontainer.innerHTML += '<i class="far fa-snowflake"></i>';
  } else if (main == 'Rain'){
    iconcontainer.innerHTML += '<i class="fas fa-cloud-rain"></i>';
  } else if(main == 'Clear'){
    iconcontainer.innerHTML += '<i class="fas fa-sun"></i>';
  } else if(main == 'Clouds'){
    iconcontainer.innerHTML += '<i class="fas fa-cloud"></i>';
  }
} 

getWeather('Stockholm', document.querySelector('.iconcontainer4'));
getWeather('Tokyo', document.querySelector('.iconcontainer5'));
getWeather('Baghdad', document.querySelector('.iconcontainer6'));


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
getLocation()
async function showPosition(position) {
  let lat = position.coords.latitude
  let lng = position.coords.longitude
  
  const res = await fetch ('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&appid=8102f14f4c80b2bf57eb41a0c18b3cc7');
  const data = await res.json()
  const myCity = data.name
  getWeather(myCity, document.querySelector('.MyGeolocation'));
  console.log(data)
}













function updateClock(){
    const now = new Date();
    let timeString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

    document.getElementById('klocka').innerHTML = timeString;
}
setInterval(updateClock, 1000);
    updateClock(); 





    // Snabblänkar
    function iconcontainer() {
        window.location.href = 'https://www.google.com';
      }
      function iconcontainer1(){
        window.location.href ='https://www.linkedin.com';
      }
      function iconcontainer2(){
        window.location.href = 'https://www.youtube.com/';
      }
      function iconcontainer3(){
        window.location.href = 'https://github.com/';
      }
    

    // anteckningar
    const sparaKnapp = document.getElementById('sparaknapp');

    if(localStorage.anteckningarText == undefined){
      anteckningarText.value = '';
    }
    else {
      anteckningarText.value = localStorage.anteckningarText;
    }

    sparaKnapp.addEventListener('click', function(){
        localStorage.anteckningarText = anteckningarText.value;
        alert('Sparades')
    })








const dashboardNameText = document.getElementById('dashboardNameText');
const dashboardName = document.getElementById('dashboardName');

if(localStorage.dashboardNameText == undefined || localStorage.dashboardNameText == ''){ // Kika om det inte finns i lokern
  dashboardName.textContent = 'Ahmed Tememi Dashboard'; // Gör så
}  
else{ //Om det finns
  dashboardName.textContent = localStorage.dashboardNameText; // Skriv vad som finns i lager
}

dashboardNameText.addEventListener('input', function(){
  dashboardName.textContent = dashboardNameText.value;
  localStorage.dashboardNameText = dashboardNameText.value; // Skriv i lager vad som i texten 
});

// Ändra BG bild vid klick 
function Changeimg(){
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://api.unsplash.com/photos/random?client_id=RTkeSR6sQnhsIQmDt0fSFFSUZm15m8xf_oFNIFymPwk", requestOptions)
    .then(response => response.json())
    .then(result => {
      //Spara bild länken
      const newLink = result.urls.full;

      // Byta BG i html 
      const body = document.body;
      body.style.backgroundImage = 'url('+newLink+')';

    })
    .catch(error => console.log('error', error));
}
Changeimg()






const addpage = document.getElementById("addPageButton");
const myModal = document.getElementById("myModal");
const close = document.getElementsByClassName("close")[0]

addpage.onclick = function() {
  myModal.style.display = "block";
}
  
//  // När användaren klickar på (x), stäng modalen
close.onclick = function() {
  myModal.style.display = "none";
}



function setLink(){
  let idName = Date.now();
  let newLink = `
  <div class="iconcontainer" id=${idName}>
    <i class="fas fa-link" style="color: #df452a;"></i>
    <p>${titleText.value}</p>
  </div> 
  `;
  document.querySelector('.linkWrapper').innerHTML += newLink;
  document.querySelector('.linkWrapper').scrollTop = document.querySelector('.linkWrapper').scrollHeight;
  document.getElementById(idName).link = linkText.value
}

document.addEventListener('click', function(evt){
  if(evt.target.className == 'iconcontainer'){
    window.open("https://" + document.getElementById(evt.target.id).link);
  }
});