const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { notFound } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Blog REST API',
    version: '1.0.0',
    description: 'A production-ready Blog REST API with CRUD operations, JWT auth, pagination, search, and JSON file storage.',
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: 'Local development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const swaggerSpec = swaggerJsdoc({
  definition: swaggerDefinition,
  apis: [path.join(__dirname, 'routes', '*.js')],
});

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Blog REST API is running',
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
