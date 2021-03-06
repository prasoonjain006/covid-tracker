import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
const indiaUrl='https://covid19.mathdro.id/api/countries/India/confirmed';

export const fetchData = async(country) => {

    let changeableUrl = url;

    if(country){
        changeableUrl = `${url}/countries/${country}`;
    }

    try{

        const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableUrl);

        return {confirmed, recovered, deaths, lastUpdate};
       
    } catch(error) {
        console.log(error);   
    }
}

export const fetchDailyData = async () => {
        try{
            const {data} = await axios.get(`${url}/daily`);
            const modifiedData = data.map((dailyData) => ({
                confirmed: dailyData.confirmed.total,
                deaths: dailyData.deaths.total,
                date: dailyData.reportDate,
            }));
            
            return modifiedData;
        }
        catch(error){
            console.log(error)
        }
    }


    export const fetchStateData = async () => {
        try{
            const response = await axios.get(`${indiaUrl}`);
            return response;
        }
        catch(error){
            console.log(error)
        }
    }
    export const fetchIndiaData = async () => {
        try{
            const response = await axios.get(`${url}/countries/india`);
            return response;
        }
        catch(error){
            console.log(error)
        }
    }




export const fetchCountries = async () => {
    try{
        const {data: {countries}} = await axios.get(`${url}/countries`);
        // console.log(countries)
        return countries.map((country)=> country.name);

    } catch(error){
        console.log(error)
    }
}


