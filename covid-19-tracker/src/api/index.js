//Functions for fetching data from Covid19 API
import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

// Fetch global or specified country's covid data
export const fetchData = async (country) => {
    let newURL = url;
    
    // If given a country as an argument, sets url to get data for that country
    if (country){
        newURL = `${url}/countries/${country}`;
    }

    try {
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(newURL);

        const modifiedData = {
            confirmed,
            recovered,
            deaths,
            lastUpdate,
        }

        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

// Fetch daily data used in Global line chart
export const fetchDailyData = async() => {
    try {
        const {data} = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))
        return modifiedData

    } catch (error) {
        console.log(error);
    }
}

// Fetch data for countries in bar charts
export const fetchCountryData = async() =>{
    try {
        const {data: {countries}}= await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error)
    }
}