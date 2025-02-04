// Agente experto en equipaje 

export class Agent2 {
    public equipajeSugerido() {
        const items = ["Ropa", "Zapatos", "Artículos de tocador", "Toallas", "Mochila", "Cargadores", "Documentos"];
        const itemsSugeridos = [...items].sort(() => Math.random() - 0.5).slice(0, 3)
        return itemsSugeridos;
    }
}

