# Travel Assistant Bot

Este proyecto implementa un bot de asistencia para la planificación de viajes, capaz de proporcionar información básica y funcionalidades esenciales, con la posibilidad de escalar a una herramienta más completa.

## Funcionalidades

*   **Búsqueda de destinos:** Permite al usuario explorar destinos con detalles básicos (nombre, ubicación y descripción breve).
*   **Sugerencias para empacar:** Genera una lista básica de cosas para llevar según el destino y la duración del viaje.
*   **Consulta de clima:** Obtiene información del clima para el destino y la fecha proporcionados utilizando una API pública gratuita (por ejemplo, OpenWeatherMap).
*   **Manejo de conversaciones:** Permite al usuario cambiar de tema y retomar hilos anteriores sin perder el contexto.

## Tecnologías

*   **TypeScript:** 
*   **LangGraph:** Librería para la lógica de agentes y flujos conversacionales utilizando LangChain.
*   **Express.js:** Framework para crear la API HTTP local.

## Arquitectura

El bot utiliza una arquitectura multi-agente con dos agentes principales:

*   **Agente 1:** Experto en destinos (sugerencias, lugares populares, etc.).
*   **Agente 2:** Especialista en equipaje y clima.

LangGraph se utiliza para definir el flujo de conversación entre los agentes y gestionar el estado de la conversación.

