import { json } from '@sveltejs/kit';
import { PRIVATE_WEATHER_API_KEY, PRIVATE_WEATHER_API_BASE_URL, } from '$env/static/private';

export async function GET({url}) {

    const city = url.searchParams.get("city");

    const getWeather = async function(request) {
        const response = await fetch(`${PRIVATE_WEATHER_API_BASE_URL}q=${request}&appid=${PRIVATE_WEATHER_API_KEY}`);
        const result = await response.json();
        return result;
    };

    const weatherData = await getWeather(city);




    const data =   { 
          weather: weatherData,
          query: city
        }
        
      

	return json(weatherData);

}
