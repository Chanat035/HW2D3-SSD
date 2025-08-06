const express = require('express');

const app = express();

const PORT = 3000;

const path = require('path');

const productRoutes = require("./routes/productRoutes")
const webRoutes = require("./routes/webRoutes")

const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use('/api', productRoutes);
app.use('/', webRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
// Start server

app.listen(PORT, () => {

          console.log(`🚀 Server is running at http://localhost:${PORT}`);

});