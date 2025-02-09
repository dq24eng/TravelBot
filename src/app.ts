import { Agent1 } from './agents/agent1';
import { Agent2 } from './agents/agent2';
import { getWeather } from './agents/weatherService';
import { START, StateGraph, MessagesAnnotation, END } from '@langchain/langgraph';
import { NlpManager } from 'node-nlp';

let inputUsr: string = ""; // Variable global para almacenar la entrada del usuario
//let intentionUsr: string = "";  // Variable global para almacenar la intención del usuario
//let nlpResponse: object = {}; // Variable global para almacenar la intención del usuario

let usrIntent: string = ""; 
let usrEntities: string[] = [];
const stateAnottation = MessagesAnnotation; // Define el tipo de anotación de estado
const stateGraph = new StateGraph(MessagesAnnotation); // Crea una instancia del grafo de estados

//Función que utiliar un modelo NLP entrenado para detectar la intención de la entrada del usuario
async function userIntent(entradaUsuario: string) {
    const manager = new NlpManager({ languages: ['es'], forceNER: true, caseSensitive: false });
    // Realiza el análisis de la intención y las entidades
    await manager.load('model.nlp')
    const respuesta: any = await manager.process('es', entradaUsuario);
    // Devuelve la intención y las entidades detectadas
    return respuesta;
}

const saludo = async (state: typeof stateAnottation.State) => {
    const {messages}  = state; // Obtiene los mensajes del estado actual
    return {messages: "Hola! Gracias por comunicarte con Travel Assitant Bot, estoy aquí para ayudarte a planificar tu próximo viaje!"}; // Retorna el saludo
}

//Función que define el agente para sugerir equipo de viaje.
const agenteEquipaje = async (state: typeof stateAnottation.State) => {
    // Se recomiendan 3 elementos para llevar de Equipaje
    const {messages}  = state; // Obtiene los mensajes del estado actual
    const agenteEquipaje = new Agent2().equipajeSugerido();
    return {messages: agenteEquipaje}; // Retorna la sugerencia de equipaje 
}

//Función que define el agente para sugerir destinos.
const agenteDestino = async (state: typeof stateAnottation.State) => {
    const destinosSugeridos = new Agent1().destinosSugeridos();
    const {messages}  = state; // Obtiene los mensajes del estado actual
    return {messages: destinosSugeridos};  // Retorna la sugerencia de destinos 
}

//Función que define el agente para obtener el clima de un destino.
const climaDestino = async (state: typeof stateAnottation.State) => {
    const {messages}  = state; // Obtiene los mensajes del estado actual
    const location: any = usrEntities.find((entity:any) => entity.entity === 'pais' || entity.entity === 'ciudad') ?? undefined;
    const loc = location == undefined ? undefined : location.utteranceText;
    const fecha: any = usrEntities.find((entity:any) => entity.entity === 'date') ?? undefined;
    const date = fecha == undefined ? undefined : fecha.utteranceText;
    // Llama a la función getWeather para obtener el clima
    const weather = await getWeather(loc, date); 
    return {messages: weather}; // Retorna la información del clima
}

//Función que decide qué agente ejecutar a continuación.
const shouldContinue = async () => {
    console.log(usrIntent)
    if (usrIntent == "saludo") return "_end"; // Si el usuario solamente saluda devuelve un saludo inicial
    if (usrIntent == "viajes.solicitar_destino") return "destinos"; // Si el usuario solicita recomendación de lugares, va al agente de destinos_sugeridos
    if (usrIntent == "equipaje.consultar_equipaje") return "equipaje" // Si el usuario pide equipaje, va al agente de equipaje
    if (usrIntent == "clima.consultar_clima") return "clima"   // Si el usuario pide clima, va al agente de clima
    return "_end_" 
}

stateGraph
    .addNode("destinos", agenteDestino) // Nodo para sugerir destinos
    .addNode("equipaje", agenteEquipaje) // Nodo para sugerir equipaje
    .addNode("clima", climaDestino) // Nodo para obtener clima
    .addNode("saludo", saludo) // Nodo inicial 
    .addEdge(START, "saludo") // Conexión inicial
    .addConditionalEdges("saludo", shouldContinue) // Conexión condicional basada en la entrada del usuario
    .addEdge("equipaje", END) // Conexión final para equipaje
    .addEdge("clima", END) // Conexión final para clima
    .addEdge("destinos", END) // Conexión final para recomendación de destinos


const workflow = stateGraph.compile(); // Compila el grafo en un flujo de trabajo ejecutable

export class TravelBot {

    //Función que maneja la entrada del usuario.
    public async handleUserInput(input: string) {

        const nlpResponse = await userIntent(input);
        usrIntent = nlpResponse.intent;
        usrEntities = nlpResponse.entities;//.map((entity: any) => entity.entity);
        const systemResponse: string[] = []; // Array para almacenar la respuesta del bot
        const recommStr = "A continuación, te proporcionaré un listado de los destinos sugeridos para vos: ";
        const response = await workflow.invoke({messages:input}) // Invoca el flujo de trabajo

        // Extrae los mensajes del flujo de trabajo
        for (const message of response.messages) {
            if (typeof message.content === 'string') {
                systemResponse.push(message.content);
            } 
        }
        // Construcción de la respuesta final
        if (usrIntent == "saludo") return systemResponse.slice(-1);
        if (usrIntent == "viajes.solicitar_destino") {
            if (input.includes("Hola")||input.includes("Buenas")||input.includes("Buen")) 
                return [systemResponse[1], recommStr, ...systemResponse.slice(2)]
            // Evita el primer elemento que podría ser la entrada del usuario y segundo saludo genérico
            return [recommStr, ...systemResponse.slice(2) ]; 
        }
        if (usrIntent == "equipaje.consultar_equipaje")
            return ["El equipaje que recomendamos es el siguiente: ", ...systemResponse.slice(-3)]
        if (usrIntent == "clima.consultar_clima")
            return ["El clima en lugar indicado es: ", ...systemResponse.slice(-1)]
    }
}