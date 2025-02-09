// Agente experto en destinos (sugerencias, lugares populares, etc.)

export class Agent1 {

    private destinos = [
        "Paris, Francia, la ciudad mágica del amor",
        "Tokio, Japón, una metrópoli vibrante",
        "Nueva York, EE.UU., la gran manzana",
        "Roma, Italia, la ciudad eterna",
        "Barcelona, España, la ciudad de la belleza",
        "Londres, Reino Unido, la ciudad del arte y la cultura",
        "Amsterdam, Países Bajos, la ciudad de los canales",
        "Praga, República Checa, la ciudad del mar y la historia",
        "Budapest, Hungary, la ciudad de la cultura y la moda",
        "Estambul, Turquía, la ciudad de los tesoros antiguos",
        "Atenas, Grecia, la ciudad de los dioses y la cultura",
        "Dublín, Irlanda, la ciudad de las playas y la cultura",
        "Sídney, Australia, la ciudad de la naturaleza y la cultura",
        "Lisboa, Portugal, la ciudad de la cultura y la moda",
        "Edimburgo, Escocia, la ciudad de la historia y la cultura",
        "Río de Janeiro, Brasil, la ciudad de la cultura y la moda",
        "Buenos Aires, Argentina, la ciudad de la cultura y la historia"
    ];

    public destinosSugeridos() {
        this.destinos = [...this.destinos].sort(() => Math.random() - 0.5).slice(0, 4)
        return this.destinos;
    }

}