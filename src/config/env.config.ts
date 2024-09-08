import dotenv from "dotenv";

// Determina el entorno (por defecto 'development' si no está configurado)
const env = process.env.NODE_ENV || "development";

// Carga el archivo .env correspondiente al entorno
dotenv.config({ path: `.env.${env}` });

// Exporta las variables de entorno, asegurándose de que no sean undefined
const config = {
  port: process.env.PORT || "8080",
  dbName: process.env.DATABASE_NAME || "",
  dbUser: process.env.DATABASE_USER || "",
  dbPass: process.env.DATABASE_PASS || "",
  jwtSecret: process.env.JWT_SECRET || "",
  encrypt: process.env.ENCRYPT || "",
};

if (!config.dbName && !config.dbUser && !config.dbPass) {
  throw new Error("Missing environment variables for database connection");
}

export default config;
