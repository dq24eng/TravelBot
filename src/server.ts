import express from 'express';
import { TravelBot } from './app';

const app = express();
const port = 8080;
const travelBot = new TravelBot();

app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const userInput = req.body.input;
    const response = await travelBot.handleUserInput(userInput);
    res.json({ response });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});