import { apiData } from './weatherdata.js';

const app=document.querySelector('.weather-app');
const temp=document.querySelector('.temp');
const nameOutput=document.querySelector('.name');
const dateOutput=document.querySelector('.date');
const conditionOutput=document.querySelector('.condition');
const icon=document.querySelector('.icon');
const form=document.querySelector('.location-input');
const search=document.querySelector('.search');
const btnSubmit=document.querySelector('.submit');
const humidityOutput=document.querySelector('.humidity');
const pressureOutput=document.querySelector('.pressure');
const windOutput=document.querySelector('.wind');
const cities=document.querySelectorAll('.city');
const time=document.querySelector('.time');

//default city when page loaded
let cityInput='Canada';

cities.forEach((city)=>{
    city.addEventListener('click',(e)=>{
         cityInput=e.target.innerHTML;

        //  functon that fetch all data from weather api
         fetchWeatherData();

        
    });
});


form.addEventListener('submit',(e)=>{
e.preventDefault();
    if(search.value.length == 0){
        alert('Please type in a city name')
    }else{
        cityInput=search.value;
        fetchWeatherData();
        search.value = '';
        
    }
    e.preventDefault();
})

function showDate(){
    const days=[
        'Sat',
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
    ]

    const months=['Januery', 'Februery', 'March', 'April', 'May','June','July','August','September','October','November','December']
    const now = new Date()
    let day=days[now.getDay()];
    let month=months[now.getMonth()];
    let year=now.getFullYear();
    let date=now.getDate();

    return `${day } ${date} ${month} ${year}`;
}

function fetchWeatherData(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiData.key}`)
    .then(res=>res.json())
    .then(data =>{
        //console.log(data);
       temp.innerHTML=Math.floor(`${data.main.temp - 273}`)+ '&#176';
       nameOutput.innerHTML=data.name;
       conditionOutput.innerHTML=data.weather[0].main;
       windOutput.innerHTML=`${data.wind.speed}km/h`;
       let iconcode = data.weather[0].icon;
       let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
       icon.setAttribute('src', iconurl);
       humidityOutput.innerHTML=`${data.main.humidity}%`;
       pressureOutput.innerHTML=data.main.pressure;
       dateOutput.innerHTML=showDate();

    })
}