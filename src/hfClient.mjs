// Explicación para tu documentación:
// Este archivo, 'hfClient.mjs', es nuestro punto de conexión con la API de IA de Hugging Face.

// 1. Importar la librería 'dotenv' para cargar nuestras variables de entorno
import 'dotenv/config';

// 2. Importar la clase 'HfInference' de la librería
import { HfInference } from '@huggingface/inference';

// 3. Leer nuestro token secreto del archivo .env
const HF_TOKEN = process.env.HF_TOKEN || 'HF_TOKEN_NO_ENCONTRADO';

// 4. Validar que el token exista
if (HF_TOKEN === 'HF_TOKEN_NO_ENCONTRADO') {
  console.error('Error: Variable de entorno HF_TOKEN no está definida.');
  console.log('Asegúrate de tener HF_TOKEN en tu archivo .env');
}

// 5. Crear y exportar una instancia del cliente de Inferencia
// Este 'hf' es el objeto que usaremos para hacerle preguntas a la IA.
export const hf = new HfInference(HF_TOKEN);