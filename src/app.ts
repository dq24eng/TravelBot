import { Agent1 } from './agents/agent1';
import { Agent2 } from './agents/agent2';
import { getWeather } from './agents/weatherService';
import { START, StateGraph, MessagesAnnotation, END } from '@langchain/langgraph';

let inputUsr = "";
const stateAnottation = MessagesAnnotation;
const stateGraph = new StateGraph(MessagesAnnotation);

const agenteEquipaje = async (state: typeof stateAnottation.State) => {
    // Se recomiendan 3 elementos para llevar de Equipaje
    const {messages}  = state;
    const agenteEquipaje = new Agent2().equipajeSugerido();
    return {messages: agenteEquipaje};
}

const agenteDestino = async (state: typeof stateAnottation.State) => {
    const destinosSugeridos = new Agent1().destinosSugeridos();
    const {messages}  = state;
    return {messages: destinosSugeridos};
}

const climaDestino = async (state: typeof stateAnottation.State) => {
    const {messages}  = state;
    const parts = inputUsr.split(" el ");
    const location:string = parts[0].replace("clima en ", "");
    const fecha:string = parts[1];
    const weather = await getWeather(location, fecha);
    return {messages: weather};
}


const shouldContinue = async (state: typeof stateAnottation.State) => {
    const {messages}  = state;

    if (inputUsr.includes("equipaje")) return "equipaje" // Asumiendo que el input es "Equipaje para viajar a..."
    if (inputUsr.includes("clima")) return "clima"   // Asumiendo que el input es "Clima en <ubicación>"

    return "_end_"
}

stateGraph
    .addNode("destinos", agenteDestino)
    .addNode("equipaje", agenteEquipaje)
    .addNode("clima", climaDestino)
    .addEdge(START, "destinos")
    .addConditionalEdges("destinos", shouldContinue)
    .addEdge("equipaje", END)
    .addEdge("clima", END)

const workflow = stateGraph.compile();

export class TravelBot {

    public async handleUserInput(input: string) {

        inputUsr = input;
        const systemResponse: string[] = [];
        const response = await workflow.invoke({messages:input})
        for (const message of response.messages) {
            if (typeof message.content === 'string') {
                systemResponse.push(message.content);
            } 
        }
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
            ...systemResponse.slice(1)
        ];
    }
}