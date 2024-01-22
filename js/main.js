let dayTitle = document.getElementById('dayTitle')
let dataTitle = document.getElementById('dataTitle')
let month = document.getElementById('month')
let cityToday = document.getElementById('cityToday')
let imgStatus = document.getElementById('imggStatus')
let tembC = document.getElementById('tembC')
let descRep = document.getElementById('descRep')
let humiDity = document.getElementById('humidity')
let windkph = document.getElementById('wind_kph')
let WindDr = document.getElementById('Wind_dr')
let imgtextStatus = document.getElementById('imgtextStatus')
// display nextDat
let nextdayTitle = document.getElementsByClassName('nextdayTitle')
let imgnexStatus = document.getElementsByClassName('imgStatus')
let tembnextC = document.getElementsByClassName('temb__C')
let mintempC = document.getElementsByClassName('mintempc')
let nextDecp = document.getElementsByClassName('nextdecp')
// search
let searchInput=document.getElementById('demo')

async function getWeather(cityNmae) {
  let getApi = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a995cc3548f8441598b15431241901&q=${cityNmae}07112&days=3`)
  let resApi = await getApi.json()
  return resApi;
}

function diplayTodaydata(Alldata) {
  let getToday=new Date()
  dayTitle.innerHTML=getToday.toLocaleDateString("en-US",{weekday:"long"})
  month.innerHTML=getToday.toLocaleDateString("en-US",{month:"long"})
  dataTitle.innerHTML=getToday.getDate()
  cityToday.innerHTML = Alldata.location.name
  imgStatus.setAttribute('src', Alldata.current.condition.icon)
  tembC.innerHTML = Alldata.current.temp_c
  descRep.innerHTML = Alldata.current.condition.text
  humiDity.innerHTML = Alldata.current.humidity + '%' 
  windkph.innerHTML = Alldata.current.wind_kph + "km/h"
  WindDr.innerHTML = Alldata.current.wind_dir
}
function diplayNexdaydata(Alldata) {
  let forcastData = Alldata.forecast.forecastday
  for (i = 0; i < 2; i++) {
    let nextdata=new Date(forcastData[i+1].date)
    imgnexStatus[i].setAttribute('src',forcastData[i+1].day.condition.icon)
    tembnextC[i].innerHTML=forcastData[i+1].day.maxtemp_c + `<sup>o</sup>`
    mintempC[i].innerHTML=forcastData[i+1].day.mintemp_c + `<sup>o</sup>`
    nextDecp[i].innerHTML=forcastData[i+1].day.condition.text 
    nextdayTitle[i].innerHTML=nextdata.toLocaleDateString("en-US",{weekday:"long"})
  
  }

}
async function startApp(city='cairo') {
  let weatherData = await getWeather(city)
  if(!weatherData.error){
    diplayTodaydata(weatherData)
    diplayNexdaydata(weatherData)
  }

}
startApp()
searchInput.addEventListener("input",function(){
  startApp(searchInput.value)
})