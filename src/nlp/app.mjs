import { NlpManager } from 'node-nlp';

    async function userIntent(entradaUsuario) {

        const manager = new NlpManager({ languages: ['es'], forceNER: true, caseSensitive: false });

        
        // Entrena el modelo con ejemplos de intenciones y entidades (documentos de entrenamiento)
        // Saludo
        manager.addDocument('es', 'Hola', 'saludo');
        manager.addDocument('es', 'Buenos días', 'saludo');
        manager.addDocument('es', 'Buenas tardes', 'saludo');
        manager.addDocument('es', 'Buenas noches', 'saludo');
        // Sugerencias destinos
        manager.addDocument('es', '¿Cuáles son los destinos más populares?', 'viajes.solicitar_destino');
        manager.addDocument('es', '¿Dónde puedo visitar?', 'viajes.solicitar_destino');
        manager.addDocument('es', 'Buenos días, ¿hay destinos recomendados para viajar?', 'viajes.solicitar_destino');
        manager.addDocument('es', '¿Qué lugares me pueden interesar?', 'viajes.solicitar_destino');
        manager.addDocument('es', '¿Dónde puedo explorar?', 'viajes.solicitar_destino');
        manager.addDocument('es', 'Hola! Quiero planificar mi viaje', 'viajes.solicitar_destino');
        manager.addDocument('es', 'Estoy planeando un viaje', 'viajes.solicitar_destino');
        manager.addDocument('es', '¿Me puedes dar información sobre destinos?', 'viajes.solicitar_destino');
        manager.addDocument('es', '¿Que destino me sugieres para viajar?', 'viajes.solicitar_destino');
        manager.addDocument('es', 'Buen día! Estoy buscando viajar lejos', 'viajes.solicitar_destino');
        manager.addDocument('es', 'Buenas tardes, ¿donde puedo viajar?', 'viajes.solicitar_destino');
        manager.addDocument('es', 'Quiero viajar', 'viajes.solicitar_destino');
        manager.addDocument('es', 'Estoy buscando lugares para vacacionar', 'viajes.solicitar_destino');
        manager.addDocument('es', 'Necesito planear un viaje', 'viajes.solicitar_destino');
        manager.addDocument('es', 'Gracias! Quiero viajar en los proximos meses', 'viajes.solicitar_destino');
        manager.addDocument('es', 'Necesito viajar', 'viajes.solicitar_destino');
        manager.addDocument('es', 'Deseo viajar, gracias', 'viajes.solicitar_destino');
        manager.addDocument('es', 'Buenas tardes, donde puedo ir?', 'viajes.solicitar_destino');
        // Equipaje
        manager.addDocument('es', '¿Qué tipo de equipaje necesito para viajar a [ciudad]?', 'equipaje.consultar_equipaje');
        manager.addDocument('es', '¿Qué me recomiendas llevar en mi maleta para [ciudad]?', 'equipaje.consultar_equipaje');
        manager.addDocument('es', '¿Cuáles son los elementos esenciales que debo empacar para un viaje a [ciudad]?', 'equipaje.consultar_equipaje');
        manager.addDocument('es', '¿Que debo empacar para llevar a [pais]?', 'equipaje.consultar_equipaje');
        manager.addDocument('es', '¿Qué documentos debo llevar en mi viaje a [ciudad]?', 'equipaje.consultar_equipaje');
        manager.addDocument('es', '¿Qué necesito para viajar a [ciudad]?', 'equipaje.consultar_equipaje');
        manager.addDocument('es', '¿Qué debo llevar para un viaje a [pais]?', 'equipaje.consultar_equipaje');
        manager.addDocument('es', 'Quiero viajar a [ciudad]', 'equipaje.consultar_equipaje');
        manager.addDocument('es', '¿Qué debo llevar para un viaje a [ciudad]? Gracias', 'equipaje.consultar_equipaje');
        manager.addDocument('es', 'Elementos de valija para ir a [pais]', 'equipaje.consultar_equipaje');
        manager.addDocument('es', 'Viajaré a [pais], recomienda que preparar para llevar', 'equipaje.consultar_equipaje');
        manager.addDocument('es', '¿Que cargar en mi maleta?', 'equipaje.consultar_equipaje');
        manager.addDocument('es', '¿Qué preparar para trasladarme a [pais]?', 'equipaje.consultar_equipaje');
        manager.addDocument('es', 'Necesito saber que equipaje llevar', 'equipaje.consultar_equipaje');
        manager.addDocument('es', 'Necesito planear que colocaré en mi maleta', 'viajes.solicitar_destino');
        // Clima
        manager.addDocument('es', '¿Cuál es el clima en [ciudad] el [fecha]?', 'clima.consultar_clima');
        manager.addDocument('es', '¿Cómo estará el tiempo en [ciudad] para el [fecha]?', 'clima.consultar_clima');
        manager.addDocument('es', '¿Va a llover en [ciudad] el [fecha]?', 'clima.consultar_clima');
        manager.addDocument('es', '¿Cuál es el pronóstico del tiempo para [ciudad] el [fecha]?', 'clima.consultar_clima');
        manager.addDocument('es', '¿Hará frío o calor en [ciudad] el [fecha]?', 'clima.consultar_clima');
        manager.addDocument('es', '¿Habrá nieve en [ciudad] el [fecha]?', 'clima.consultar_clima');
        manager.addDocument('es', '¿Cuál es la probabilidad de lluvia en [ciudad] el [fecha]?', 'clima.consultar_clima');
        manager.addDocument('es', 'Clima en [ciudad]', 'clima.consultar_clima');
        manager.addDocument('es', '¿Va a llover en [pais] el [fecha]?', 'clima.consultar_clima');
        manager.addDocument('es', '¿Cuál es el pronóstico del tiempo para [pais] el [fecha]?', 'clima.consultar_clima');
        manager.addDocument('es', 'Quiero saber el clima de [pais] para [fecha]', 'clima.consultar_clima');
        manager.addDocument('es', 'Cual será la temperatura en [pais]', 'clima.consultar_clima');
        manager.addDocument('es', '¿Hay alguna alerta meteorológica en [ciudad]', 'clima.consultar_clima');
        manager.addDocument('es', '¿Cuáles son los patrones climáticos típicos de [ciudad]?', 'clima.consultar_clima');
        // Añadir entidades NER
        const ciudades = [
            "Londres", "Nueva York", "Tokio", "París", "Berlín", "Moscú", "Pekín", "Seúl", "Roma", "Toronto",
            "Sídney", "Madrid", "Barcelona", "Ámsterdam", "Estambul", "Viena", "Praga", "Copenhague", "Dublín", "Lisboa",
            "Buenos Aires", "Ciudad de México", "Sao Paulo", "Río de Janeiro", "Bogotá", "Lima", "Santiago", "Caracas", "La Paz", "Quito",
            "El Cairo", "Johannesburgo", "Lagos", "Nairobi", "Casablanca", "Dakar", "Addis Abeba", "Kinshasa", "Dar es Salaam", "Luanda",
            "Bombay", "Delhi", "Bangalore", "Calcuta", "Chennai", "Hyderabad", "Ahmedabad", "Pune", "Surat", "Kanpur",
            "Shanghái", "Hong Kong", "Singapur", "Bangkok", "Kuala Lumpur", "Yakarta", "Manila", "Ho Chi Minh", "Hanói", "Taipei",
            "Dubai", "Abu Dabi", "Riad", "Doha", "Kuwait", "Muscat", "Amán", "Beirut", "Jerusalén", "Tel Aviv",
            "Los Ángeles", "Chicago", "Houston", "Filadelfia", "Phoenix", "San Antonio", "San Diego", "Dallas", "San José", "Austin",
            "Washington D.C.", "Boston", "Miami", "Atlanta", "Seattle", "Denver", "Portland", "Mineápolis", "Charlotte", "Indianápolis",
            "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton", "Quebec", "Winnipeg", "Hamilton", "Halifax", "Victoria",
            "Birmingham", "Mánchester", "Glasgow", "Liverpool", "Edimburgo", "Cardiff", "Belfast", "Bristol", "Newcastle", "Leeds",
            "Lyon", "Marsella", "Toulouse", "Niza", "Nantes", "Estrasburgo", "Montpellier", "Burdeos", "Lille", "Nîmes",
            "Múnich", "Hamburgo", "Colonia", "Fráncfort", "Stuttgart", "Düsseldorf", "Dortmund", "Essen", "Leipzig", "Dresde",
            "Kiev", "Minsk", "Varsovia", "Bucarest", "Budapest", "Belgrado", "Sofía", "Zagreb", "Bratislava", "Vilna",
            "Estocolmo", "Oslo", "Helsinki", "Reikiavik", "Tallin", "Riga", "Kaunas", "Klaipėda", "Šiauliai", "Panevėžys",
            "Atenas", "Tesalónica", "Patras", "Heraclión", "Larisa", "Volos", "Ioánina", "Trípoli", "Kalamata", "El Pireo",
            "Dubái", "Abu Dabi", "Sharjah", "Al Ain", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain", "Khor Fakkan", "Dibba Al-Hisn",
            "Sevilla", "Valencia", "Granada", "Málaga", "Bilbao", "Alicante", "Zaragoza", "Valladolid", "Vigo", "Córdoba",
            "Nápoles", "Milán", "Turín", "Florencia", "Venecia", "Bolonia", "Génova", "Palermo", "Catania", "Verona",
            "Lisboa", "Oporto", "Coímbra", "Braga", "Faro", "Setúbal", "Aveiro", "Viseu", "Évora", "Guimarães",
            "Otawa", "Toronto", "Montreal", "Calgary", "Edmonton", "Quebec", "Winnipeg", "Hamilton", "Halifax", "Victoria",
            "San Francisco", "Austin", "Seattle", "Dallas", "Atlanta", "Boston", "Phoenix", "Tampa", "Mineápolis", "Charlotte",
            "Puebla", "Guadalajara", "Monterrey", "Tijuana", "León", "Ciudad Juárez", "Querétaro", "Morelia", "San Luis Potosí", "Mérida",
            "Brasilia", "Salvador", "Fortaleza", "Belo Horizonte", "Manaos", "Curitiba", "Recife", "Porto Alegre", "Belém", "Goiânia",
            "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga", "Pereira", "Santa Marta", "Ibagué", "Villavicencio", "Manizales",
            "Santiago de Chile", "Valparaíso", "Concepción", "Viña del Mar", "Antofagasta", "Temuco", "Rancagua", "Talca", "Arica", "Iquique",
            "Caracas", "Maracaibo", "Valencia", "Barquisimeto", "Ciudad Bolívar", "Maturín", "San Cristóbal", "Puerto La Cruz", "Puerto Ordaz", "Cumaná",
            "La Paz", "Santa Cruz de la Sierra", "Cochabamba", "Sucre", "Oruro", "Tarija", "Potosí", "Trinidad", "Riberalta", "Guayaramerín",
            "Quito", "Guayaquil", "Cuenca", "Santo Domingo", "Machala", "Manta", "Ambato", "Loja", "Portoviejo", "Esmeraldas",
            "El Cairo", "Alejandría", "Guiza", "Puerto Saíd", "Suez", "Luxor", "Asuán", "El Mahalla El Kubra", "Mansura", "Tanta",
            "Johannesburgo", "Pretoria", "Durban", "Ciudad del Cabo", "Vereeniging", "Port Elizabeth", "Bloemfontein", "Nelspruit", "Kimberley", "East London",
            "Lagos", "Kano", "Ibadan", "Benín", "Port Harcourt", "Kaduna", "Aba", "Oyo", "Enugu", "Abuya",
            "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Machakos", "Meru", "Kakamega", "Kisii", "Thika",
            "Casablanca", "Rabat", "Marrakech", "Fez", "Tánger", "Mequinez", "Oujda", "Kenitra", "Agadir", "Tetuán",
            "Dakar", "Thiès", "Rufisque", "Kaolack", "Ziguinchor", "Saint-Louis", "Louga", "Fatick", "Tambacounda", "Kolda",
            "Adís Abeba", "Dire Dawa", "Mek'ele", "Bahir Dar", "Adama", "Awasa", "Dessie", "Jijiga", "Debre Markos", "Kombolcha",
            "Kinshasa", "Lubumbashi", "Mbuji-Mayi", "Kolwezi", "Kisangani", "Kananga", "Tshikapa", "Bukavu", "Goma", "Matadi",
            "Dar es Salaam", "Mwanza", "Dodoma", "Arusha", "Mbeya", "Tanga", "Morogoro", "Sumbawanga", "Kigoma", "Iringa",
            "Luanda", "Huambo", "Lobito", "Benguela", "Cabinda", "Malanje", "Nampula", "Cuito", "Saurimo", "Uíge",
            "Bombay", "Delhi", "Bangalore", "Calcuta", "Chennai", "Hyderabad", "Ahmedabad", "Pune", "Surat", "Kanpur",
            "Shanghái", "Pekín", "Cantón", "Shenzhen", "Tianjín", "Nankín", "Wuhan", "Hangzhou", "Chengdu", "Chongqing",
            "Hong Kong", "Kowloon", "Victoria", "Aberdeen", "Tsuen Wan", "Sha Tin", "Tuen Mun", "Tai Po", "Fanling", "Yuen Long",
            "Singapur", "Kuala Lumpur", "Bangkok", "Yakarta", "Manila", "Ho Chi Minh", "Hanói", "Taipei", "Seúl", "Tokio",
            "Bruselas", "Ginebra", "Basilea", "Nápoles", "Catania", "Génova", "Palermo", "Catania", "Turín",    "Florencia", 
            "Liverpool", "Mánchester", "Leeds", "Edimburgo", "Cardiff", "Bristol", "Newcastle",    "Oporto", "Coímbra", "Braga", 
            "Faro", "Setúbal", "Aveiro", "Viseu", "Évora", "Guimarães",    "Zagreb", "Dubrovnik", "Split", "Rijeka", "Brno", "Ostrava", 
            "Plzeň", "Bratislava", "Tallin",    "Riga", "Vilna", "Helsinki", "Reikiavik", "Oslo", "Estocolmo", "Catania", 
            "San Sebastián", "Bilbao",    "Málaga", "Valencia", "Salamanca", "La Coruña", "Zaragoza", "Oviedo", "Ginebra", 
            "Lausana", "Zúrich",    "Graz", "Innsbruck", "Linz", "Salzburgo", "Ljubljana", "Sarajevo", "Tirana", "Pristina", 
            "Skopje",    "Sofía", "Bucarest", "Chisináu", "Kazán", "Novosibirsk", "Ekaterimburgo", "Nizhni Nóvgorod", "Samara",    
            "Volgogrado", "Vladivostok", "Yekaterinburg", "Ufa", "Tashkent", "Almaty", "Bishkek", "Dushanbe",    
            "Ashgabat", "Tbilisi", "Erevan", "Bakú", "Jerusalén", "Amán", "Beirut", "Damasco", "Bagdad",    "Teherán", 
            "Jartum", "Trípoli", "Abiyán", "Accra", "Lusaka", "Maputo", "Harare", "Antananarivo",    "Port Moresby", 
            "Suva", "Honiara", "Apia", "Ciudad de México", "Guadalajara", "Monterrey", "Puebla", "Toluca", "Tijuana",
            "León", "Ciudad Juárez", "Querétaro", "Morelia", "Santo Domingo", "Santiago de los Caballeros", "San Cristóbal",
            "La Romana",  "San Pedro de Macorís", "Higüey",  "Puerto Plata", "Bajos de Haina", "Moca", "Azua", "Toronto",
            "Montreal",   "Calgary",  "Ottawa", "Edmonton", "Winnipeg", "Quebec", "Hamilton", "Vancouver", "Mississauga",
            "Córdoba", "Rosario", "Mendoza", "La Plata", "Mar del Plata", "Tucumán", "Salta", "Santa Fe", "San Carlos de Bariloche", 
            "Bahía Blanca", "Resistencia", "Corrientes", "Posadas", "Neuquén", "Comodoro Rivadavia", "Paraná", "Santiago del Estero", 
            "San Juan", "Catamarca", "La Rioja", "Río Gallegos", "Formosa", "Concordia", "San Luis", "General Roca", "Villa María", 
            "Gualeguaychú", "Olavarría", "Junín", "Rafaela", "Pergamino", "Necochea", "San Nicolás de los Arroyos", "Tres Arroyos", 
            "Tandil", "Azul", "General Pico", "Venado Tuerto", "Villa Mercedes", "Presidencia Roque Sáenz Peña", "Oberá", "Eldorado", 
            "Curuzú Cuatiá", "Paso de los Libres", "Monte Caseros", "Tartagal", "Orán", "San Ramón de la Nueva Orán", 
            "Libertador General San Martín", "Palpalá", "Perico", "Humahuaca", "Tilcara", "Purmamarca", "Cafayate", "Metán", 
            "Joaquín V. González", "Las Heras", "Malargüe", "San Rafael", "General Alvear", "Realicó", "Ingeniero Luiggi", "Victorica", 
            "25 de Mayo", "Santa Rosa", "General Acha", "Cutral Có", "Plaza Huincul", "Zapala", "Chos Malal", "Andacollo", 
            "Las Lajas", "Piedra del Águila", "El Calafate", "El Chaltén", "Ushuaia", "Río Grande", "Tolhuin", "Puerto Deseado", 
            "Puerto San Julián", "Puerto Santa Cruz", "Caleta Olivia", "Pico Truncado", "Puerto Madryn", "Trelew", "Rawson", 
            "Esquel", "Bariloche", "Cancun"
        ];
        ciudades.forEach(ciudad => {
            manager.addNamedEntityText('ciudad', ciudad, ['es'], [ciudad]); // Añade cada ciudad individualmente
        });
        const paises = [
            "Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita", "Argelia", "Argentina", "Armenia",
            "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bangladés", "Barbados", "Baréin", "Bélgica", "Belice", "Benín",
            "Bielorrusia", "Birmania", "Bolivia", "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi",
            "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China", "Chipre",
            "Colombia", "Comoras", "Congo", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba", "Dinamarca", "Dominica",
            "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", "España", "Estados Unidos", "EEUU", "Estonia",
            "Esuatini", "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón", "Gambia", "Georgia",
            "Ghana", "Granada", "Grecia", "Guatemala", "Guinea", "Guinea-Bisáu", "Guinea Ecuatorial", "Guyana", "Haití",
            "Honduras", "Hungría", "India", "Indonesia", "Irán", "Irak", "Irlanda", "Islandia", "Islas Marshall",
            "Islas Salomón", "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán",
            "Kiribati", "Kuwait", "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein",
            "Lituania", "Luxemburgo", "Macedonia del Norte", "Madagascar", "Malaui", "Maldivas", "Malí", "Malta", "Marruecos",
            "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montenegro", "Mozambique",
            "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda", "Omán",
            "Países Bajos", "Pakistán", "Palaos", "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú", "Polonia", "Portugal",
            "Ruanda", "Rumanía", "Rusia", "Samoa", "San Cristóbal y Nieves", "San Marino", "San Vicente y las Granadinas", "Santa Lucía", "Santo Tomé y Príncipe",
            "Senegal", "Serbia", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Sudáfrica",
            "Sudán del Sur", "Suecia", "Suiza", "Surinam", "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo",
            "Tonga", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay",
            "Uzbekistán", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbabue"
        ];
        paises.forEach(pais => {
            manager.addNamedEntityText('pais', pais, ['es'], [pais]); // Añade cada pais individualmente
        });

        await manager.train(); // Entrena el modelo
        
        
        // Realiza el análisis de la intención y las entidades
        //await manager.load('model.nlp');
        const respuesta = await manager.process('es', entradaUsuario);
        // Devuelve la intención y las entidades detectadas
        return respuesta;
    }

userIntent('Hola')

/*
// Ejemplo de uso
const entradaUsuario1 = 'Necesito viajar a EEUU';
//userIntent(entradaUsuario1).then(resultado => console.log(resultado));
console.log(await userIntent(entradaUsuario1));
*/

