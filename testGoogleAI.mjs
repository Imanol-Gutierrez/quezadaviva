// Explicación para tu documentación:
// Este script prueba la API de chat de Google.
// (Versión 4: Usando el nombre de modelo EXACTO, "gemini-pro-latest",
// obtenido de la lista de modelos de la API).

import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  console.error('Error: GOOGLE_API_KEY no encontrada. Revisa tu .env');
}

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

const testChat = async () => {
  try {
    console.log('Probando modelo de CHAT (gemini-pro-latest)...');

    // CAMBIO CRÍTICO: Usamos el nombre EXACTO de la lista
    // (La librería @google/generative-ai sabe que debe añadir "models/")
    const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });

    const prompt = "Hola, ¿quién eres?";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('¡Conexión de Chat exitosa!');
    console.log(`Respuesta de Gemini: ${text}`);
  } catch (e) {
    console.error('¡Error en la prueba de Chat!', e.message);
  }
};

testChat();