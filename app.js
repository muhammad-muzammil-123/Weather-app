const input = document.querySelector("#searchInput");
const btn = document.querySelector("#search-btn");
const weatherImage = document.querySelector(".weather-image");
const temp = document.querySelector(".temperature");
const description = document.querySelector(".description");
const city_name = document.querySelector(".location");
const humidity = document.querySelector("#Humidity");
const windSpeed = document.querySelector("#wind-speed")
console.log(windSpeed);
// function to get the user's location and call the openWeatherMap API
async function checkWeather(city){
      const api_key = "41694579d334b28c75ce0e5eec2374b0";
      const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
      
      const weather_fetch = await fetch(`${weather_url}`).then(res => res.json());
     if(city === ""){
  
Swal.fire({
  icon: "error",
  title: "Please Enter a city name",
  
});

     }else{
     

//  console.log(weather_fetch);
 if(weather_fetch.message){
      Swal.fire({
            icon: "error",
            title: "City not found",
            
          });
 input.value = ""

 }
      temp.innerHTML = `${Math.round(weather_fetch.main.temp - 273)}°C` ;
      city_name.innerHTML = `${weather_fetch.name}`;
      let weatherDesc = weather_fetch.weather[0].description;

      console.log(weatherDesc)
      description.innerHTML = ` ${weatherDesc} `;
      humidity.innerHTML = `${weather_fetch.main.humidity}%`;
  // wind speed in knots
  var wind_speed= Math.round(weather_fetch.wind.speed * 1.94384449);
  console.log(wind_speed)
  windSpeed.innerHTML=` ${wind_speed} km/h`;
  


       if( weatherDesc.includes("mist") ){
            //add a mist image here
            weatherImage.src= 'images/mist.png';
       }else  if( weatherDesc.toLowerCase().includes("clear sky")  ){
            //add a rain image here
            weatherImage.src= 'images/clear.png';
       }else  if( weatherDesc.toLowerCase().includes("rain")  ){
            //add a snow image here
            weatherImage.src= 'images/mist.png';
       } else  if( weatherDesc.toLowerCase().includes('snow') ){
           
            weatherImage.src= 'images/snow.png';
       }else  if( weatherDesc.toLowerCase().includes('cloud') ){
            //add a cloud image here
            weatherImage.src= 'images/cloud.png';
       }else  if( weatherDesc.toLowerCase().includes('haze') ){
            //add a cloud image here
            weatherImage.src= 'images/haze.png';
            weatherImage.style.height = "140px";
            weatherImage.style.width = "140px";


       }

       input.value = "";
      }
 }
      

btn.addEventListener('click',() =>{
      checkWeather(input.value)
})