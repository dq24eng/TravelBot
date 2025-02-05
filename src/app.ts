import { Agent1 } from './agents/agent1';
import { Agent2 } from './agents/agent2';
import { getWeather } from './agents/weatherService';
import { START, StateGraph, MessagesAnnotation, END } from '@langchain/langgraph';

let inputUsr: string = ""; // Variable global para almacenar la entrada del usuario
const stateAnottation = MessagesAnnotation; // Define el tipo de anotación de estado
const stateGraph = new StateGraph(MessagesAnnotation); // Crea una instancia del grafo de estados


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
    const parts = inputUsr.split(" el "); // Divide la entrada del usuario para obtener ubicación y fecha
    const location:string = parts[0].replace("clima en ", "");
    const fecha:string = parts[1];
    const weather = await getWeather(location, fecha); // Llama a la función getWeather para obtener el clima
    return {messages: weather}; // Retorna la información del clima
}

//Función que decide qué agente ejecutar a continuación.
const shouldContinue = async (state: typeof stateAnottation.State) => {
    const {messages}  = state;
    if (inputUsr.includes("equipaje")) return "equipaje" // Si el usuario pide equipaje, va al agente de equipaje
    if (inputUsr.includes("clima")) return "clima"   // Si el usuario pide clima, va al agente de clima
    return "_end_" // Si no pide ni equipaje ni clima, finaliza el flujo
}

stateGraph
    .addNode("destinos", agenteDestino) // Nodo para sugerir destinos
    .addNode("equipaje", agenteEquipaje) // Nodo para sugerir equipaje
    .addNode("clima", climaDestino) // Nodo para obtener clima
    .addEdge(START, "destinos") // Conexión inicial
    .addConditionalEdges("destinos", shouldContinue) // Conexión condicional basada en la entrada del usuario
    .addEdge("equipaje", END) // Conexión final para equipaje
    .addEdge("clima", END) // Conexión final para clima

const workflow = stateGraph.compile(); // Compila el grafo en un flujo de trabajo ejecutable

export class TravelBot {

    //Función que maneja la entrada del usuario.
    public async handleUserInput(input: string) {

        inputUsr = input;
        const systemResponse: string[] = []; // Array para almacenar la respuesta del bot
        const response = await workflow.invoke({messages:input}) // Invoca el flujo de trabajo
        // Extrae los mensajes del flujo de trabajo
        for (const message of response.messages) {
            if (typeof message.content === 'string') {
                systemResponse.push(message.content);
            } 
        }
        // Construcción de la respuesta final
        if (inputUsr.includes("equipaje")) {
            const messageRes = ["Excelente! El equipaje que recomendamos es el siguiente: ", ...systemResponse.slice(-3)]
            return messageRes;
        }
        if (inputUsr.includes("clima")) {
            const messageRes = ["Por supuesto! El clima en lugar indicado es: ", ...systemResponse.slice(-1)]
            return messageRes;
        }
        return [
            "Hola! Gracias por comunicarte con nuestro Bot Asistente de viajes ",
            "A continuación, te proporcionaré un listado de los destinos sugeridos para vos: ",
            ...systemResponse.slice(1) // Evita el primer elemento que podría ser la entrada del usuario
        ];
    }
}