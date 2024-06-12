import dotenv from 'dotenv';

// Determina el entorno (por defecto 'development' si no está configurado)
const env = process.env.NODE_ENV || 'development';

// Carga el archivo .env correspondiente al entorno
dotenv.config({ path: `.env.${env}` });

// Exporta las variables de entorno, asegurándose de que no sean undefined
const config = {
  port: process.env.PORT || '3000',
  database: process.env.DATABASE || '',
  mySqlUser: process.env.MYSQLUSER || '',
  mySqlPass: process.env.MYSQLPASS || '',
  jwtSecret:process.env.JWT_SECRETE || ''
};

if (!config.database || !config.mySqlUser || !config.mySqlPass) {
  throw new Error('Missing environment variables for database connection');
}

export default config;