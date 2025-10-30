require("dotenv").config();
const express = require("express");
const { corsMiddleware } = require("./shared/middleware/cors");
const { testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(corsMiddleware);

// Inicializar base de datos
const initializeDatabase = async () => {
    await testConnection();
};

app.get('/', (req, res ) => {
    res.json({
        message: "!Hola Express funcionando con MySQL",
        timestamp: new Date(). toISOString(),
        status: 'succes'
    });
});

//login
app.use('/api/v1', require('./routes/auth'));

// inicializar el servidor 
const starServer = async () => {
    try {
        await initializeDatabase();
        app.listen(PORT, () => {
            console.log(`Servidor en http://localhost:${PORT}`);
        });
} catch (error) {
    console.error('Error al iniciar el servidor:', error);
}
};

starServer();