import dotenv from "dotenv";

// Determina el entorno (por defecto 'development' si no está configurado)
const env = process.env.NODE_ENV || "development";

// Carga el archivo .env correspondiente al entorno
dotenv.config({ path: `.env.${env}` });

// Exporta las variables de entorno, asegurándose de que no sean undefined
const config = {
  port: process.env.PORT || "8080",
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  encrypt: process.env.ENCRYPT || "",
};

if (!config.databaseUrl) {
  throw new Error("Missing environment variables for database connection");
}

export default config;
