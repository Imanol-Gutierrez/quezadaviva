// Explicación para tu documentación:
// Este archivo, 'supabaseClient.js', es nuestro punto central de conexión a Supabase.

// 1. Importar la librería 'dotenv' para cargar variables de entorno
// Es CRUCIAL hacer esto ANTES que nada, para que process.env tenga nuestras llaves.
import 'dotenv/config';

// 2. Importar la función 'createClient' desde la librería de Supabase
import { createClient } from '@supabase/supabase-js';

// 3. Leer las variables de entorno de nuestro archivo .env
// process.env es un objeto global de Node.js que contiene las variables.
// Usamos '||' (OR) para poner un valor por defecto en caso de que
// olvidemos llenar el .env, y así el error sea más obvio.
const supabaseUrl = process.env.SUPABASE_URL || 'URL_NO_ENCONTRADA';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'KEY_NO_ENCONTRADA';

// 4. Validar que las llaves existan
if (supabaseUrl === 'URL_NO_ENCONTRADA' || supabaseKey === 'KEY_NO_ENCONTRADA') {
  console.error('Error: Variables de entorno de Supabase (URL o KEY) no están definidas.');
  console.log('Asegúrate de tener un archivo .env en la raíz del proyecto con SUPABASE_URL y SUPABASE_ANON_KEY.');
}

// 5. Crear y exportar el cliente de Supabase
// Este 'supabase' es el objeto que usaremos en toda nuestra aplicación
// para interactuar con la base de datos (leer, insertar, buscar, etc.).
export const supabase = createClient(supabaseUrl, supabaseKey);