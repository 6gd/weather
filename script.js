
const listWeather = [
  {"nameWeather":"clear sky","svgurl":"images/svg/clear-day.svg"},
  {"nameWeather":"few clouds","svgurl":"images/svg/partly-cloudy-day.svg"},
  {"nameWeather":"scattered clouds","svgurl":"images/svg/cloudy.svg"},
  {"nameWeather":"overcast clouds","svgurl":"images/svg/overcast.svg"},
  {"nameWeather":"light rain","svgurl":"images/svg/partly-cloudy-day-drizzle.svg"},
  {"nameWeather":"rain","svgurl":"images/svg/rain.svg"},
  {"nameWeather":"thunderstorm clouds","svgurl":"images/svg/thunderstorms.svg"},
  {"nameWeather":"snow","svgurl":"images/svg/snow.svg"},
  {"nameWeather":"mist","svgurl":"images/svg/mist.svg"},
]



const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


function getWaether(lng,lat){
  axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=0c6ef1746a72e67425dd6f2cab9a096d&units=metric`).then((resopne) => {

  let daily = resopne.data.daily
  let current = resopne.data.current

  for (let index = 0; index < listWeather.length; index++) {
    if (daily[0].weather[0].description === listWeather[index].nameWeather) {
      document.getElementById("PrCard").src = listWeather[index].svgurl
      document.getElementById("humidity").textContent = Math.round(daily[0].temp.day) + "°"
      document.getElementById("humidityNIght").textContent = Math.round(daily[0].temp.morn) + "°"
      var unixTimestamp = daily[0].dt;
      var date = new Date(unixTimestamp * 1000);
  
      const d = new Date(date.toLocaleDateString("en-US"));
      var day = days[d.getDay()];
      document.getElementById("DayName").textContent = day
      document.getElementById("RealFeel").textContent = Math.round(current.feels_like) + "°"
      document.getElementById("wind_speed").textContent = Math.round(current.wind_speed) + " km/h"
      document.getElementById("uvindex").textContent = Math.round(current.uvi)
      let chancefoRain = document.getElementById("chancefoRain")
      let pop = daily[0].pop.toString()
      if (pop.length == 1) {
        chancefoRain.textContent = pop + "%"
      }else if (pop.length != 1) {
        chancefoRain.textContent = pop.split(".")[1] + "%"
      }
      

    }
    
  }
  for (let index = 1; index < daily.length; index++) {
    const listW = daily[index];
    const weather7Day = listW.weather[0].description
    for (let index = 0; index < listWeather.length; index++) {
      const dataWeather = listWeather[index];
      if (dataWeather.nameWeather === weather7Day) {
        var unixTimestamp = listW.dt;

        var date = new Date(unixTimestamp * 1000);

        const d = new Date(date.toLocaleDateString("en-US"));
        var day = days[d.getDay()];
        let card = `<div class="splide__slide">
        <div class="Card">
            <h4 class="DayNameSmall" id="DayNameSmall">${day}</h4>
            <img src="${dataWeather.svgurl}" alt="" loading="lazy">
            <h3 class="humidity">${Math.round(listW.temp.day)}°</h3>
            <h3 class="humidityNIght">${Math.round(listW.temp.morn)}°</h3>
        </div>
      </div>`
        document.querySelector(".splide__list").innerHTML += card
      }
      
    }
  }
  if (window.innerWidth >= 560) {
    var splide = new Splide( '.splide', {
      perPage:7,
      arrows:false,
      perMove: 1,
    } );
    
    splide.mount();
  }else if (window.innerWidth < 560) {
    var splide = new Splide( '.splide', {
      perPage:1,
      arrows:false,
      perMove: 1,
    } );
    
    splide.mount();
  }
  
})
}

const successCallback = (position) => {
  // document.body.textContent = position.coords.longitude,position.coords.latitude
  getWaether(position.coords.longitude,position.coords.latitude)
};

const errorCallback = (error) => {
  console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);






// var div = document.getElementById("location")
// div.addEventListener("click",getLocation)
// function getLocation() {
//   if( navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(showPositon, showError);
//   }else{
//     div.innerHTML = "THe Brower Does not Support"
//   }
// }

// function showPositon(position) {
//   var lat = position.coords.latitude
//   var lon = position.coords.longitude
//   div.innerHTML = lat
// }
// function showError(error){
//   if(error.PERMISSION_DENIED){
//     div.innerHTML = "The User Have Denid the request for geolocation"
//   }
// }