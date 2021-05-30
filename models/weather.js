const fetch = require('node-fetch');

const url = 'https://api.openweathermap.org/data/2.5/weather?'
const key = '04e63c2fa307aa353131ceda94419eaa'


const getResult = ()=>{
    const cityName= 'istanbul'
    let query = `${url}q=${cityName}&appid=${key}&units=metric&lang=tr`
    fetch(query)
    .then(weather =>{
        return weather.json()
    })
    .then(weatherData)
}

const weatherData = (result) => {
    let city = `${result.name}`
    let temp = `${result.main.temp}`
    let desc = `${result.weather.description}`
}

module.exports = weatherData;




