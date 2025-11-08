// Explicación para tu documentación:
// Este script es el "motor" completo del RAG. Es llamado por n8n.
// 1. Recibe dos argumentos: el 'source' (nombre del archivo) y el 'content' (texto completo).
// 2. Carga el modelo de IA local (@xenova/transformers).
// 3. Importa nuestro cliente de Supabase para conectarse a la BD.
// 4. Divide el texto en "chunks" (párrafos).
// 5. Genera un embedding (vector) para CADA chunk.
// 6. Inserta CADA chunk + vector en Supabase.

import { pipeline, env } from '@xenova/transformers';
import { supabase } from './supabaseClient.js'; // ¡IMPORTANTE! Importamos Supabase

// Configuración de la librería
env.allowLocalModels = true;
env.allowRemoteModels = true; // Para descargar el modelo la 1ra vez

const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2';

// Función para cargar el modelo (se cachea después de la 1ra vez)
const extractor = await pipeline('feature-extraction', MODEL_NAME);

// Función principal
async function processAndEmbed(source, content) {
  console.log(`--- Procesando archivo: ${source} ---`);

  try {
    // 4. Dividir el texto en "Chunks" (párrafos)
    const chunks = content.split(/\n\s*\n/).filter(Boolean); // Divide por párrafos vacíos

    if (chunks.length === 0) {
      console.log('El archivo estaba vacío o no tenía párrafos válidos.');
      return;
    }

    // 5. Mapear CADA chunk a un objeto para Supabase
    const rowsToInsert = [];
    for (const chunk of chunks) {
      if (chunk.trim().length === 0) continue;

      console.log(`Generando embedding para chunk: "${chunk.substring(0, 40)}..."`);

      // 5a. Convertir chunk en vector (embedding)
      const output = await extractor(chunk, {
        pooling: 'mean',
        normalize: true,
      });
      const embedding = Array.from(output.data);

      // 5b. Preparar la fila
      rowsToInsert.push({
        source: source,
        content: chunk,
        embedding: embedding,
      });
    }

    // 6. Insertar TODAS las filas en Supabase de un solo golpe
    console.log(`Insertando ${rowsToInsert.length} chunks en Supabase...`);
    const { error } = await supabase.from('documentos').insert(rowsToInsert);

    if (error) {
      console.error('Error insertando en Supabase:', error.message);
    } else {
      console.log('¡Chunks guardados en Supabase exitosamente!');
    }

  } catch (error) {
    console.error('Error en el script de embedding:', error.message);
  }
}

// 3. Leemos los argumentos de la línea de comando
const sourceArg = process.argv[2]; // El nombre del archivo (ej. "historia.md")
const contentArg = process.argv[3]; // El texto completo ("Quezada es...")

if (!sourceArg || !contentArg) {
  console.error('Error: No se proporcionó el source o el content.');
} else {
  processAndEmbed(sourceArg, contentArg);
}