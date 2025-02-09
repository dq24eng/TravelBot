// Servicio del clima
// API pública OpenWeatherMap

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.API_KEY;

export const getWeather = async (ubicacion: string | undefined, fechaString: string | undefined) => {
    let fecha: Date = new Date();
    if (fechaString!=undefined) {
        const [day, mon, year] = fechaString.split("/"); 
        fecha = new Date(`${mon}/${day}/${year}`);
    } 
    const timestamp = Math.floor(fecha.getTime() / 1000);
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${ubicacion}&appid=${API_KEY}&units=metric&lang=sp&dt=${timestamp}`);
        const climate = response.data.weather[0].description;
        return climate;
    } catch (error) {
        return "Lo siento, no encontré información del clima para el destino proporcionado";
    }
};

