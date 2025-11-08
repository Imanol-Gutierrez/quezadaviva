// Explicación para tu documentación:
// Este script de diagnóstico resuelve el error 404 de Google.
// En lugar de adivinar nombres de modelos, llama directamente
// al "endpoint" de la API que lista los modelos
// a los que nuestra API Key tiene acceso.

import 'dotenv/config';

// 1. Cargar la API Key
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  console.error('Error: GOOGLE_API_KEY no encontrada. Revisa tu .env');
  process.exit(1); // Detiene el script si no hay key
}

// 2. Construir la URL del "endpoint" para listar modelos
// Usamos 'fetch', que ya viene en Node.js (no necesita 'npm install')
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${GOOGLE_API_KEY}`;

console.log('Consultando a Google la lista de modelos disponibles...');

// 3. Hacer la llamada a la API
fetch(url)
  .then(response => response.json())
  .then(data => {

    // 4. Si hay un error en la respuesta
    if (data.error) {
      console.error('¡Error al listar modelos!', data.error.message);
      return;
    }

    // 5. ¡ÉXITO! Imprimir los modelos
    console.log('--- ¡Modelos Disponibles para tu API Key! ---');

    data.models.forEach(model => {
      console.log(`\nModelo: ${model.name}`);
      console.log(`  - Nombre para mostrar: ${model.displayName}`);
      console.log(`  - ¿Soporta "generateContent" (Chat)? ${model.supportedGenerationMethods.includes('generateContent')}`);
    });

    console.log('\n--- Fin de la lista ---');
    console.log('\nCopia el nombre de un modelo (ej. "models/gemini-1.5-flash-latest") que soporte "generateContent" y pégalo en testGoogleAI.mjs');

  })
  .catch(err => {
    console.error('Error de conexión:', err);
  });